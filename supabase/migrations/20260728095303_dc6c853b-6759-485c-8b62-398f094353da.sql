
-- ============ Enums ============
create type public.app_role as enum ('super_admin');
create type public.org_role as enum ('owner', 'admin', 'manager', 'member');
create type public.org_plan as enum ('trial', 'starter', 'growth', 'enterprise', 'selfhosted');

-- ============ Utility: updated_at trigger fn ============
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;

-- ============ Profiles ============
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  email text,
  locale text default 'ar',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;

create policy "profiles_select_own" on public.profiles
  for select to authenticated using (auth.uid() = id);
create policy "profiles_update_own" on public.profiles
  for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);
create policy "profiles_insert_self" on public.profiles
  for insert to authenticated with check (auth.uid() = id);

create trigger profiles_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, display_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end $$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============ Organizations ============
create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  logo_url text,
  primary_color text default '#D4A34A',
  locale text not null default 'ar',
  currency text not null default 'SAR',
  plan public.org_plan not null default 'trial',
  brand_json jsonb not null default '{}'::jsonb,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update, delete on public.organizations to authenticated;
grant all on public.organizations to service_role;
alter table public.organizations enable row level security;

create trigger organizations_updated_at before update on public.organizations
  for each row execute function public.set_updated_at();

-- ============ Memberships ============
create table public.memberships (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.org_role not null default 'member',
  created_at timestamptz not null default now(),
  unique (org_id, user_id)
);
create index memberships_user_idx on public.memberships(user_id);
create index memberships_org_idx on public.memberships(org_id);
grant select, insert, update, delete on public.memberships to authenticated;
grant all on public.memberships to service_role;
alter table public.memberships enable row level security;

-- ============ Security-definer helpers ============
create or replace function public.is_org_member(_org_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.memberships
    where org_id = _org_id and user_id = auth.uid()
  )
$$;

create or replace function public.get_org_role(_org_id uuid)
returns public.org_role language sql stable security definer set search_path = public as $$
  select role from public.memberships
  where org_id = _org_id and user_id = auth.uid()
  limit 1
$$;

create or replace function public.is_org_admin(_org_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.memberships
    where org_id = _org_id and user_id = auth.uid()
      and role in ('owner', 'admin')
  )
$$;

-- ============ Organizations policies ============
create policy "orgs_select_member" on public.organizations
  for select to authenticated
  using (public.is_org_member(id));

create policy "orgs_insert_authenticated" on public.organizations
  for insert to authenticated
  with check (auth.uid() = created_by);

create policy "orgs_update_admin" on public.organizations
  for update to authenticated
  using (public.is_org_admin(id))
  with check (public.is_org_admin(id));

create policy "orgs_delete_owner" on public.organizations
  for delete to authenticated
  using (public.get_org_role(id) = 'owner');

-- ============ Memberships policies ============
create policy "memberships_select_same_org" on public.memberships
  for select to authenticated
  using (user_id = auth.uid() or public.is_org_member(org_id));

create policy "memberships_insert_self_or_admin" on public.memberships
  for insert to authenticated
  with check (
    -- Allow user creating their own first membership after creating an org
    (user_id = auth.uid())
    or public.is_org_admin(org_id)
  );

create policy "memberships_update_admin" on public.memberships
  for update to authenticated
  using (public.is_org_admin(org_id))
  with check (public.is_org_admin(org_id));

create policy "memberships_delete_admin_or_self" on public.memberships
  for delete to authenticated
  using (public.is_org_admin(org_id) or user_id = auth.uid());

-- ============ User Roles (platform-level) ============
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "user_roles_select_own" on public.user_roles
  for select to authenticated using (user_id = auth.uid());

-- ============ Activity Logs ============
create table public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete cascade,
  actor_id uuid references auth.users(id) on delete set null,
  entity_type text not null,
  entity_id uuid,
  action text not null,
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index activity_logs_org_created_idx on public.activity_logs(org_id, created_at desc);
grant select, insert on public.activity_logs to authenticated;
grant all on public.activity_logs to service_role;
alter table public.activity_logs enable row level security;

create policy "activity_logs_select_org_member" on public.activity_logs
  for select to authenticated using (public.is_org_member(org_id));

create policy "activity_logs_insert_org_member" on public.activity_logs
  for insert to authenticated with check (public.is_org_member(org_id));

-- ============ Invitations ============
create table public.invitations (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete cascade,
  email text not null,
  role public.org_role not null default 'member',
  token text not null unique default encode(gen_random_bytes(24), 'hex'),
  invited_by uuid references auth.users(id) on delete set null,
  accepted_at timestamptz,
  expires_at timestamptz not null default (now() + interval '14 days'),
  created_at timestamptz not null default now()
);
create index invitations_org_idx on public.invitations(org_id);
create index invitations_email_idx on public.invitations(lower(email));
grant select, insert, update, delete on public.invitations to authenticated;
grant all on public.invitations to service_role;
alter table public.invitations enable row level security;

create policy "invitations_select_org_admin_or_invitee" on public.invitations
  for select to authenticated
  using (
    public.is_org_admin(org_id)
    or lower(email) = lower(coalesce((auth.jwt() ->> 'email'), ''))
  );

create policy "invitations_insert_admin" on public.invitations
  for insert to authenticated with check (public.is_org_admin(org_id));

create policy "invitations_update_admin_or_invitee" on public.invitations
  for update to authenticated
  using (
    public.is_org_admin(org_id)
    or lower(email) = lower(coalesce((auth.jwt() ->> 'email'), ''))
  );

create policy "invitations_delete_admin" on public.invitations
  for delete to authenticated using (public.is_org_admin(org_id));
