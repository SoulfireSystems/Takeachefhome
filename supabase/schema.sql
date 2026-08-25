-- TakeAChefHome V1 Marketplace Engine
-- Run in Supabase SQL editor.

create extension if not exists pgcrypto;

create table if not exists public.opportunities (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('private-chef','catering','meal-prep','food-truck','experience','class')),
  title text not null,
  description text not null,
  city text not null,
  state text,
  event_date date,
  guest_count integer,
  budget_min integer,
  budget_max integer,
  client_name text not null,
  client_email text not null,
  client_phone text,
  status text not null default 'open' check (status in ('open','responses-received','booked','closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.responses (
  id uuid primary key default gen_random_uuid(),
  opportunity_id uuid not null references public.opportunities(id) on delete cascade,
  provider_name text not null,
  provider_email text not null,
  provider_phone text,
  profile_url text,
  message text not null,
  quote_amount integer,
  created_at timestamptz not null default now()
);

create index if not exists opportunities_created_at_idx on public.opportunities(created_at desc);
create index if not exists opportunities_city_idx on public.opportunities(city);
create index if not exists opportunities_category_idx on public.opportunities(category);
create index if not exists responses_opportunity_id_idx on public.responses(opportunity_id);

alter table public.opportunities enable row level security;
alter table public.responses enable row level security;

-- Public can read open marketplace opportunities.
drop policy if exists "public read open opportunities" on public.opportunities;
create policy "public read open opportunities"
on public.opportunities for select
using (status in ('open','responses-received'));

-- Public can create opportunities through the server route using service role.
-- No public insert policy is intentionally provided.

-- Responses are server-write only and not publicly readable.
