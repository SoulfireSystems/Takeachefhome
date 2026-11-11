-- Additive account ownership and private inbox. Existing profiles remain intact.
begin;
alter table public.talent_profiles add column if not exists account_id uuid references auth.users(id);
alter table public.provider_profiles add column if not exists account_id uuid references auth.users(id);
alter table public.provider_profiles add column if not exists owner_paused boolean not null default false;
create index if not exists talent_account_idx on public.talent_profiles(account_id);
create index if not exists provider_account_idx on public.provider_profiles(account_id);

create table if not exists public.account_conversations (
 id uuid primary key default gen_random_uuid(),
 customer_id uuid not null references auth.users(id),
 provider_id uuid not null references public.provider_profiles(id),
 subject text not null check (length(subject) between 3 and 160),
 lane text not null default 'food-service' check (lane in ('food-service','jobs','prep')),
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now(),
 customer_read_at timestamptz not null default now(),
 provider_read_at timestamptz not null default 'epoch',
 customer_blocked boolean not null default false,
 provider_blocked boolean not null default false
);
create index if not exists inbox_customer_idx on public.account_conversations(customer_id,updated_at desc);
create index if not exists inbox_provider_idx on public.account_conversations(provider_id,updated_at desc);
create table if not exists public.account_messages (
 id uuid primary key default gen_random_uuid(),
 conversation_id uuid not null references public.account_conversations(id) on delete cascade,
 sender_id uuid not null references auth.users(id),
 body text not null check (length(body) between 1 and 4000),
 created_at timestamptz not null default now()
);
create index if not exists inbox_message_idx on public.account_messages(conversation_id,created_at);
create table if not exists public.account_message_reports (
 id uuid primary key default gen_random_uuid(),
 conversation_id uuid not null references public.account_conversations(id),
 reporter_id uuid not null references auth.users(id),
 reason text not null check (length(reason) between 3 and 1000),
 status text not null default 'pending',
 created_at timestamptz not null default now()
);
create table if not exists public.account_rate_limits (
 key text primary key, window_start timestamptz not null default now(), attempts integer not null default 1
);

alter table public.account_conversations enable row level security;
alter table public.account_messages enable row level security;
alter table public.account_message_reports enable row level security;
alter table public.account_rate_limits enable row level security;
revoke all on public.account_conversations,public.account_messages,public.account_message_reports,public.account_rate_limits from anon,authenticated;
grant all on public.account_conversations,public.account_messages,public.account_message_reports,public.account_rate_limits to service_role;
-- Inbox is served only through authorized server routes. No direct client grants.

create table if not exists public.account_identities (
 identity_id uuid primary key references auth.users(id),
 account_id uuid not null references auth.users(id),
 verified_at timestamptz not null default now()
);
alter table public.account_identities enable row level security;
revoke all on public.account_identities from anon,authenticated;
grant all on public.account_identities to service_role;
create index if not exists account_identity_owner_idx on public.account_identities(account_id);
create or replace function public.account_bind_identity(p_identity uuid,p_account uuid)
returns void language plpgsql security invoker set search_path = '' as $$
declare existing_account uuid;
begin
 if (select count(*) from auth.users where id in (p_identity,p_account) and email_confirmed_at is not null) <> (case when p_identity=p_account then 1 else 2 end) then raise exception 'Both emails must be verified'; end if;
 select account_id into existing_account from public.account_identities where identity_id=p_identity;
 if existing_account is not null and existing_account<>p_account then raise exception 'Email already belongs to another account';end if;
 if p_identity<>p_account and (
 exists(select 1 from public.talent_profiles where account_id=p_identity) or
 exists(select 1 from public.provider_profiles where account_id=p_identity) or
 exists(select 1 from public.account_conversations where customer_id=p_identity)
 ) then raise exception 'Existing account needs support-assisted merge'; end if;
 insert into public.account_identities(identity_id,account_id) values(p_identity,p_account) on conflict(identity_id) do nothing;
 if not exists(select 1 from public.account_identities where identity_id=p_identity and account_id=p_account) then raise exception 'Account conflict';end if;
end; $$;
revoke all on function public.account_bind_identity(uuid,uuid) from public,anon,authenticated;
grant execute on function public.account_bind_identity(uuid,uuid) to service_role;

create or replace function public.account_claim_profiles(p_user uuid)
returns void language plpgsql security invoker set search_path = '' as $$
declare verified_email text;
begin
 select lower(trim(email)) into verified_email from auth.users where id=p_user and email_confirmed_at is not null;
 if verified_email is null then raise exception 'Verified email required'; end if;
 update public.talent_profiles set account_id=p_user where account_id is null and (lower(trim(email))=verified_email or lower(trim(email)) in (
 select lower(trim(u.email)) from public.account_identities i join auth.users u on u.id=i.identity_id where i.account_id=p_user and u.email_confirmed_at is not null));
 update public.provider_profiles set account_id=p_user where account_id is null and (lower(trim(contact_email))=verified_email or lower(trim(contact_email)) in (
 select lower(trim(u.email)) from public.account_identities i join auth.users u on u.id=i.identity_id where i.account_id=p_user and u.email_confirmed_at is not null));
end; $$;
revoke all on function public.account_claim_profiles(uuid) from public,anon,authenticated;
grant execute on function public.account_claim_profiles(uuid) to service_role;

create or replace function public.account_rate_limit(p_key text,p_seconds integer,p_limit integer)
returns boolean language plpgsql security invoker set search_path = '' as $$
declare n integer;
begin
 insert into public.account_rate_limits as r(key) values(p_key)
 on conflict(key) do update set
 attempts=case when r.window_start < now()-make_interval(secs=>p_seconds) then 1 else r.attempts+1 end,
 window_start=case when r.window_start < now()-make_interval(secs=>p_seconds) then now() else r.window_start end
 returning attempts into n;
 return n<=p_limit;
end; $$;
revoke all on function public.account_rate_limit(text,integer,integer) from public,anon,authenticated;
grant execute on function public.account_rate_limit(text,integer,integer) to service_role;

-- Send atomically with membership and block checks, including the initial message.
create or replace function public.account_send_message(p_user uuid,p_body text,p_conversation uuid default null,p_provider uuid default null,p_subject text default null)
returns uuid language plpgsql security invoker set search_path = '' as $$
declare c public.account_conversations; provider_owner uuid; provider_state text; is_paused boolean;
begin
 if not exists(select 1 from auth.users where id=p_user and email_confirmed_at is not null) then raise exception 'Unauthorized'; end if;
 if length(trim(p_body)) not between 1 and 4000 then raise exception 'Message must be 1–4000 characters'; end if;
 if p_conversation is null then
  select account_id,status,owner_paused into provider_owner,provider_state,is_paused from public.provider_profiles where id=p_provider;
  if provider_state is distinct from 'active' or is_paused then raise exception 'Provider unavailable'; end if;
  if provider_owner=p_user then raise exception 'Use another account to send an inquiry'; end if;
  insert into public.account_conversations(customer_id,provider_id,subject) values(p_user,p_provider,p_subject) returning * into c;
 else
  select * into c from public.account_conversations where id=p_conversation for update;
  if c.id is null then raise exception 'Conversation unavailable'; end if;
  select account_id into provider_owner from public.provider_profiles where id=c.provider_id;
  if c.customer_id<>p_user and provider_owner is distinct from p_user then raise exception 'Conversation unavailable'; end if;
  if c.customer_blocked or c.provider_blocked then raise exception 'This conversation is blocked'; end if;
 end if;
 insert into public.account_messages(conversation_id,sender_id,body) values(c.id,p_user,trim(p_body));
 update public.account_conversations set updated_at=clock_timestamp(),
 customer_read_at=case when c.customer_id=p_user then clock_timestamp() else customer_read_at end,
 provider_read_at=case when provider_owner=p_user then clock_timestamp() else provider_read_at end
 where id=c.id;
 return c.id;
end; $$;
revoke all on function public.account_send_message(uuid,text,uuid,uuid,text) from public,anon,authenticated;
grant execute on function public.account_send_message(uuid,text,uuid,uuid,text) to service_role;
commit;
