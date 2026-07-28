import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useOrg } from "@/modules/org/OrgContext";

export const Route = createFileRoute("/_authenticated/onboarding")({
  head: () => ({
    meta: [
      { title: "أنشئ مؤسستك — NOORA" },
      { name: "description", content: "أنشئ مؤسستك الأولى على NOORA Business OS خلال دقيقة." },
      { property: "og:title", content: "إنشاء مؤسسة — NOORA" },
      { property: "og:description", content: "ابدأ بإدارة أعمالك بالذكاء الاصطناعي." },
    ],
  }),
  component: Onboarding,
});

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9\u0600-\u06FF]+/g, "-").replace(/^-|-$/g, "") + "-" + Math.random().toString(36).slice(2, 7);
}

function Onboarding() {
  const navigate = useNavigate();
  const { user, memberships, refresh, loading } = useOrg();
  const [name, setName] = useState("");
  const [currency, setCurrency] = useState("SAR");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && memberships.length > 0) navigate({ to: "/app" });
  }, [loading, memberships, navigate]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setBusy(true);
    setErr(null);
    try {
      const { data: org, error } = await supabase
        .from("organizations")
        .insert({ name, slug: slugify(name), currency, created_by: user.id, locale: "ar" })
        .select()
        .single();
      if (error) throw error;
      const { error: memErr } = await supabase
        .from("memberships")
        .insert({ org_id: org.id, user_id: user.id, role: "owner" });
      if (memErr) throw memErr;
      await refresh();
      navigate({ to: "/app" });
    } catch (e: any) {
      setErr(e.message || "تعذّر إنشاء المؤسسة");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center px-4 py-12">
      <div className="w-full max-w-lg glass-card glow-border rounded-3xl p-8 sm:p-10">
        <div className="text-4xl mb-3">🏢</div>
        <h1 className="text-2xl sm:text-3xl font-black">أنشئ مؤسستك الأولى</h1>
        <p className="text-sm text-muted-foreground mt-2">
          كل شيء على NOORA يعمل داخل مؤسسة. يمكنك إضافة فروع وموظفين وشركات أخرى لاحقاً.
        </p>

        <form onSubmit={handleCreate} className="mt-6 space-y-3">
          <div>
            <label className="text-xs font-bold text-muted-foreground">اسم الشركة</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثال: شركة نور للتجارة"
              className="mt-1 w-full px-4 py-3 rounded-xl bg-surface/70 border border-border focus:border-primary/60 outline-none text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-muted-foreground">العملة الافتراضية</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="mt-1 w-full px-4 py-3 rounded-xl bg-surface/70 border border-border outline-none text-sm"
            >
              <option value="SAR">ريال سعودي (SAR)</option>
              <option value="AED">درهم إماراتي (AED)</option>
              <option value="EGP">جنيه مصري (EGP)</option>
              <option value="USD">دولار أمريكي (USD)</option>
              <option value="EUR">يورو (EUR)</option>
            </select>
          </div>
          {err && <div className="text-xs text-destructive">{err}</div>}
          <button type="submit" disabled={busy || !name} className="btn-primary w-full mt-2">
            {busy ? "..." : "إنشاء وبدء الإدارة"}
          </button>
        </form>
      </div>
    </div>
  );
}
