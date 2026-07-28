
-- Set explicit search_path (linter WARN 1)
alter function public.set_updated_at() set search_path = public;
alter function public.handle_new_user() set search_path = public;
alter function public.is_org_member(uuid) set search_path = public;
alter function public.get_org_role(uuid) set search_path = public;
alter function public.is_org_admin(uuid) set search_path = public;
alter function public.has_role(uuid, public.app_role) set search_path = public;

-- Revoke PUBLIC execute and grant only to needed roles
revoke execute on function public.is_org_member(uuid) from public, anon;
revoke execute on function public.get_org_role(uuid) from public, anon;
revoke execute on function public.is_org_admin(uuid) from public, anon;
revoke execute on function public.has_role(uuid, public.app_role) from public, anon;
revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.set_updated_at() from public, anon, authenticated;

grant execute on function public.is_org_member(uuid) to authenticated, service_role;
grant execute on function public.get_org_role(uuid) to authenticated, service_role;
grant execute on function public.is_org_admin(uuid) to authenticated, service_role;
grant execute on function public.has_role(uuid, public.app_role) to authenticated, service_role;
