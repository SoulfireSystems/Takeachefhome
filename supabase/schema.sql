-- TakeAChefHome V1 Marketplace Engine
-- Server-only marketplace data access through Supabase service role.

create extension if not exists pgcrypto;

create table if not exists public.opportunities (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('private-chef','catering','meal-prep','food-truck','experience','class')),
  title text not null,
  description text not null,
  city text not null,
  state text,
  event_date date,
  guest_count integer check (guest_count is null or guest_count > 0),
  budget_min integer check (budget_min is null or budget_min >= 0),
  budget_max integer check (budget_max is null or budget_max >= 0),
  client_name text not null,
  client_email text not null,
  client_phone text,
  status text not null default 'open' check (status in ('open','responses-received','booked','closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (budget_min is null or budget_max is null or budget_max >= budget_min)
);

create table if not exists public.responses (
  id uuid primary key default gen_random_uuid(),
  opportunity_id uuid not null references public.opportunities(id) on delete cascade,
  provider_name text not null,
  provider_email text not null,
  provider_phone text,
  profile_url text,
  message text not null,
  quote_amount integer check (quote_amount is null or quote_amount >= 0),
  created_at timestamptz not null default now()
);

create index if not exists opportunities_created_at_idx on public.opportunities(created_at desc);
create index if not exists opportunities_city_idx on public.opportunities(city);
create index if not exists opportunities_category_idx on public.opportunities(category);
create index if not exists opportunities_status_idx on public.opportunities(status);
create index if not exists responses_opportunity_id_idx on public.responses(opportunity_id);

alter table public.opportunities enable row level security;
alter table public.responses enable row level security;

-- Do not expose marketplace records directly to anonymous browser clients.
-- All public reads/writes flow through our Next.js server routes.
revoke all on table public.opportunities from anon, authenticated;
revoke all on table public.responses from anon, authenticated;

-- Supabase changed Data API defaults in 2026, so explicitly grant the
-- server-side service role the privileges our marketplace engine requires.
grant select, insert, update, delete on table public.opportunities to service_role;
grant select, insert, update, delete on table public.responses to service_role;

-- Defense in depth: if these tables are ever granted to browser roles later,
-- only open marketplace opportunities may be selected.
drop policy if exists "public read open opportunities" on public.opportunities;
create policy "public read open opportunities"
on public.opportunities
for select
to anon, authenticated
using (status in ('open','responses-received'));

-- No browser insert/update/delete policies are intentionally provided.
-- Responses remain server-write only and are never publicly readable.
