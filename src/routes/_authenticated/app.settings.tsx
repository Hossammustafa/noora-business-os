import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/app/AppShell";
import { useOrg } from "@/modules/org/OrgContext";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/app/settings")({
  head: () => ({
    meta: [
      { title: "الإعدادات — NOORA" },
      { name: "description", content: "إعدادات المؤسسة والعلامة التجارية والفريق." },
      { property: "og:title", content: "الإعدادات — NOORA" },
      { property: "og:description", content: "أدر مؤسستك على NOORA." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { currentOrg, currentRole, refresh } = useOrg();
  const canEdit = currentRole === "owner" || currentRole === "admin";
  const [name, setName] = useState(currentOrg?.name ?? "");
  const [color, setColor] = useState(currentOrg?.primary_color ?? "#D4A34A");
  const [currency, setCurrency] = useState(currentOrg?.currency ?? "SAR");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentOrg) return;
    setSaving(true);
    setMsg(null);
    const { error } = await supabase
      .from("organizations")
      .update({ name, primary_color: color, currency })
      .eq("id", currentOrg.id);
    setSaving(false);
    if (error) setMsg(error.message);
    else {
      setMsg("تم الحفظ ✓");
      await refresh();
    }
  };

  return (
    <>
      <PageHeader title="الإعدادات" subtitle="مؤسستك، علامتك التجارية، وفريقك" />
      <div className="p-6 sm:p-10 max-w-3xl space-y-6">
        <form onSubmit={save} className="glass-card rounded-2xl p-6 space-y-4">
          <h3 className="font-black text-lg">المؤسسة</h3>
          <div>
            <label className="text-xs font-bold text-muted-foreground">اسم الشركة</label>
            <input value={name} disabled={!canEdit} onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full px-4 py-3 rounded-xl bg-surface/70 border border-border outline-none text-sm disabled:opacity-60" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-muted-foreground">لون العلامة الأساسي</label>
              <input type="color" value={color} disabled={!canEdit} onChange={(e) => setColor(e.target.value)}
                className="mt-1 w-full h-11 rounded-xl bg-surface/70 border border-border" />
            </div>
            <div>
              <label className="text-xs font-bold text-muted-foreground">العملة</label>
              <select value={currency} disabled={!canEdit} onChange={(e) => setCurrency(e.target.value)}
                className="mt-1 w-full px-4 py-3 rounded-xl bg-surface/70 border border-border text-sm">
                <option value="SAR">SAR</option><option value="AED">AED</option>
                <option value="EGP">EGP</option><option value="USD">USD</option><option value="EUR">EUR</option>
              </select>
            </div>
          </div>
          {msg && <div className="text-xs">{msg}</div>}
          <button type="submit" disabled={!canEdit || saving} className="btn-primary text-sm">
            {saving ? "..." : "حفظ التغييرات"}
          </button>
          {!canEdit && <div className="text-xs text-muted-foreground">تحتاج صلاحية مدير أو مالك لتعديل هذه الإعدادات.</div>}
        </form>

        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-black text-lg">الفريق</h3>
          <p className="text-sm text-muted-foreground mt-2">إدارة الأعضاء والدعوات ستتوفر في المرحلة القادمة.</p>
        </div>

        <div className="glass-card rounded-2xl p-6">
          <h3 className="font-black text-lg">دورك في هذه المؤسسة</h3>
          <div className="mt-2 inline-flex px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-bold">
            {currentRole ?? "—"}
          </div>
        </div>
      </div>
    </>
  );
}
