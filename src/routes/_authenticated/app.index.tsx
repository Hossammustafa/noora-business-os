import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/AppShell";
import { useOrg } from "@/modules/org/OrgContext";

export const Route = createFileRoute("/_authenticated/app/")({
  head: () => ({
    meta: [
      { title: "AI CEO — لوحتك اليومية | NOORA" },
      { name: "description", content: "تقرير الذكاء الاصطناعي اليومي لمؤسستك: تنبيهات، توصيات، ومؤشرات الأداء." },
      { property: "og:title", content: "AI CEO — NOORA" },
      { property: "og:description", content: "لوحة إدارية ذكية لكل شركة." },
    ],
  }),
  component: AiCeoPage,
});

const kpis = [
  { label: "إيرادات الشهر", value: "—", hint: "أضف أول فاتورة" },
  { label: "عملاء جدد", value: "0", hint: "أضف أول عميل" },
  { label: "طلبات مفتوحة", value: "0", hint: "أضف أول طلب" },
  { label: "فواتير معلقة", value: "—", hint: "أضف أول فاتورة" },
];

function AiCeoPage() {
  const { currentOrg, user } = useOrg();
  return (
    <>
      <PageHeader
        title={`صباح الخير، ${user?.email?.split("@")[0]} 👋`}
        subtitle={`تقرير AI CEO لـ ${currentOrg?.name ?? ""}`}
      />
      <div className="p-6 sm:p-10 space-y-6">
        <div className="glass-card glow-border rounded-3xl p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full opacity-30 blur-3xl" style={{ background: "var(--gradient-gold)" }} />
          <div className="relative">
            <div className="text-xs text-muted-foreground">مرحباً في NOORA</div>
            <h2 className="text-2xl sm:text-3xl font-black mt-1">
              مؤسستك <span className="gradient-text">جاهزة</span> — لنبدأ الإعداد
            </h2>
            <p className="text-sm text-muted-foreground mt-3 max-w-xl">
              أضف عملاءك ومنتجاتك وفواتيرك الأولى، وسيبدأ AI CEO في تحليل بياناتك وإعطائك تنبيهات وتوصيات يومية.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((k) => (
            <div key={k.label} className="glass-card rounded-2xl p-5">
              <div className="text-xs text-muted-foreground">{k.label}</div>
              <div className="text-3xl font-black mt-2">{k.value}</div>
              <div className="text-[11px] text-muted-foreground mt-2">{k.hint}</div>
            </div>
          ))}
        </div>

        <div className="glass-card rounded-3xl p-6 sm:p-8">
          <h3 className="text-lg font-black mb-4">خطوات البدء السريع</h3>
          <ul className="space-y-3 text-sm">
            {[
              "أضف أول عميل من قسم العملاء",
              "أنشئ منتجاً أو خدمة من قسم المنتجات",
              "أصدر فاتورتك الأولى",
              "ادعُ فريقك من الإعدادات → الأعضاء",
            ].map((s, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full grid place-items-center text-[11px] font-black shrink-0 mt-0.5 bg-primary/15 text-primary">{i + 1}</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
