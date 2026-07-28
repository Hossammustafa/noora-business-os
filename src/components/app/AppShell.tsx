import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { type ReactNode } from "react";
import { useOrg } from "@/modules/org/OrgContext";

const modules = [
  { to: "/app", label: "AI CEO", icon: "🧠", exact: true },
  { to: "/app/customers", label: "العملاء", icon: "👥" },
  { to: "/app/leads", label: "العملاء المحتملون", icon: "🎯" },
  { to: "/app/products", label: "المنتجات", icon: "📦" },
  { to: "/app/orders", label: "الطلبات", icon: "🧾" },
  { to: "/app/invoices", label: "الفواتير", icon: "💳" },
  { to: "/app/inventory", label: "المخزون", icon: "🏬" },
  { to: "/app/documents", label: "المستندات", icon: "📄" },
  { to: "/app/automations", label: "الأتمتة", icon: "⚡" },
  { to: "/app/agents", label: "الوكلاء الذكيون", icon: "🤖" },
  { to: "/app/reports", label: "التقارير", icon: "📊" },
  { to: "/app/settings", label: "الإعدادات", icon: "⚙️" },
];

export function AppShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const { currentOrg, memberships, setCurrentOrgId, user, signOut } = useOrg();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate({ to: "/auth", replace: true });
  };

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 shrink-0 border-l border-border/60 bg-surface/40 backdrop-blur-xl flex flex-col sticky top-0 h-screen">
        <div className="p-5 border-b border-border/60">
          <Link to="/app" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl grid place-items-center" style={{ background: "var(--gradient-gold)" }}>
              <span className="text-lg font-black text-primary-foreground">N</span>
            </div>
            <div className="leading-tight">
              <div className="font-black text-sm">NOORA</div>
              <div className="text-[10px] text-muted-foreground tracking-widest">BUSINESS OS</div>
            </div>
          </Link>
        </div>

        <div className="p-4 border-b border-border/60">
          <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2">المؤسسة</div>
          {memberships.length > 1 ? (
            <select
              value={currentOrg?.id ?? ""}
              onChange={(e) => setCurrentOrgId(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-sm"
            >
              {memberships.map((m) => (
                <option key={m.org_id} value={m.org_id}>{m.organizations.name}</option>
              ))}
            </select>
          ) : (
            <div className="text-sm font-bold truncate">{currentOrg?.name ?? "—"}</div>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto p-2 space-y-0.5">
          {modules.map((m) => {
            const active = m.exact ? pathname === m.to : pathname.startsWith(m.to);
            return (
              <Link
                key={m.to}
                to={m.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                  active ? "bg-primary/15 text-foreground font-bold" : "text-muted-foreground hover:bg-surface hover:text-foreground"
                }`}
              >
                <span className="text-base">{m.icon}</span>
                <span>{m.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-border/60">
          <div className="flex items-center gap-2 p-2">
            <div className="w-8 h-8 rounded-full grid place-items-center bg-surface text-xs font-bold">
              {(user?.email ?? "?")[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold truncate">{user?.email}</div>
            </div>
            <button onClick={handleSignOut} title="خروج" className="text-xs text-muted-foreground hover:text-destructive">↩</button>
          </div>
        </div>
      </aside>

      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="border-b border-border/60 bg-background/70 backdrop-blur-xl sticky top-0 z-30">
      <div className="px-6 sm:px-10 py-5 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black">{title}</h1>
          {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
        </div>
        {action}
      </div>
    </div>
  );
}

export function EmptyModule({ title, description, emoji }: { title: string; description: string; emoji: string }) {
  return (
    <div className="p-6 sm:p-10">
      <div className="glass-card rounded-3xl p-10 sm:p-16 text-center max-w-2xl mx-auto">
        <div className="text-5xl mb-4">{emoji}</div>
        <h2 className="text-2xl font-black">{title}</h2>
        <p className="text-sm text-muted-foreground mt-3 max-w-md mx-auto">{description}</p>
        <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/15 text-xs font-bold text-primary">
          قيد التطوير — سيتم تفعيلها في المراحل القادمة
        </div>
      </div>
    </div>
  );
}
