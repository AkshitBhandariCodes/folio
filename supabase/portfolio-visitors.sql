begin;

create table if not exists public.portfolio_visitors (
  browser_id uuid primary key,
  first_seen_at timestamptz not null default now()
);

alter table public.portfolio_visitors enable row level security;
revoke all on public.portfolio_visitors from anon, authenticated;

create or replace function public.register_portfolio_visit(visitor_id uuid)
returns bigint
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.portfolio_visitors (browser_id)
  values (visitor_id)
  on conflict (browser_id) do nothing;

  return (select count(*) from public.portfolio_visitors);
end;
$$;

revoke all on function public.register_portfolio_visit(uuid) from public;
grant execute on function public.register_portfolio_visit(uuid) to anon, authenticated;

alter table public.portfolio_visitors
  add column if not exists last_seen_at timestamptz;

create index if not exists portfolio_visitors_last_seen_idx
  on public.portfolio_visitors (last_seen_at)
  where last_seen_at is not null;

create or replace function public.register_portfolio_presence(visitor_id uuid)
returns table (total bigint, live bigint)
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.portfolio_visitors (browser_id, last_seen_at)
  values (visitor_id, now())
  on conflict (browser_id) do update
    set last_seen_at = greatest(public.portfolio_visitors.last_seen_at, excluded.last_seen_at);

  return query select
    (select count(*) from public.portfolio_visitors),
    (select count(*) from public.portfolio_visitors where last_seen_at > now() - interval '90 seconds');
end;
$$;

revoke all on function public.register_portfolio_presence(uuid) from public;
grant execute on function public.register_portfolio_presence(uuid) to anon, authenticated;

commit;
