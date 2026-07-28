import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { AppShell } from "@/components/app/AppShell";
import { useOrg } from "@/modules/org/OrgContext";

export const Route = createFileRoute("/_authenticated/app")({
  component: AppLayout,
});

function AppLayout() {
  const { loading, memberships } = useOrg();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && memberships.length === 0) navigate({ to: "/onboarding" });
  }, [loading, memberships, navigate]);

  if (loading) {
    return <div className="min-h-screen grid place-items-center text-sm text-muted-foreground">جاري التحميل...</div>;
  }
  if (memberships.length === 0) return null;

  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
