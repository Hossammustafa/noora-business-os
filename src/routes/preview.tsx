import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/preview")({
  head: () => ({
    meta: [
      { title: "لوحة AI CEO — NOORA Business OS" },
      { name: "description", content: "تقرير الذكاء الاصطناعي اليومي: أخطر المشاكل، توقعات الأسبوع، وتوصيات عملية لإدارة شركتك." },
      { property: "og:title", content: "لوحة AI CEO — NOORA" },
      { property: "og:description", content: "شاهد كيف يدير AI CEO شركتك: تنبيهات، توقعات، وتوصيات آلية." },
    ],
  }),
  component: Dashboard,
});

const alerts = [
  { level: "critical", title: "3 عملاء VIP معرضون للفقد", detail: "لم يتواصلوا منذ 21 يوم — قيمة إجمالية $47,500", action: "تواصل الآن" },
  { level: "warning", title: "المخزون: منتج A سينفد خلال 6 أيام", detail: "بناءً على معدل البيع الحالي — يوصى بطلب 200 وحدة", action: "أنشئ طلب شراء" },
  { level: "warning", title: "تدفق نقدي: تحذير خلال 45 يوم", detail: "5 فواتير كبيرة متأخرة بقيمة $32,100", action: "أرسل تذكيرات" },
  { level: "info", title: "فرصة تسويقية: منتج B", detail: "الطلب ارتفع 34% هذا الأسبوع — أطلق حملة", action: "أنشئ حملة" },
];

const kpis = [
  { label: "إيرادات الشهر", value: "$284,120", change: "+18.4%", positive: true },
  { label: "عملاء جدد", value: "127", change: "+22%", positive: true },
  { label: "معدل التحويل", value: "4.8%", change: "-0.6%", positive: false },
  { label: "الفواتير المعلقة", value: "$32,100", change: "+3 فواتير", positive: false },
];

const recommendations = [
  "أطلق حملة إعادة استهداف للعملاء الباردين — متوقع استرداد $18k",
  "ارفع سعر منتج C بنسبة 8% — الطلب مرن ولن يتأثر",
  "احذف حملة Meta #4 — تستنزف الميزانية دون تحويل",
  "دفعة تحفيزية للموظف أحمد م. — أعلى إنتاجية هذا الأسبوع",
];

export default function Dashboard() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-border/60 backdrop-blur-xl bg-background/70 sticky top-0 z-40">
        <div className="container-noora h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl grid place-items-center" style={{ background: "var(--gradient-gold)" }}>
              <span className="text-lg font-black text-primary-foreground">N</span>
            </div>
            <div className="leading-tight">
              <div className="font-black text-sm">NOORA</div>
              <div className="text-[10px] text-muted-foreground tracking-widest">AI CEO</div>
            </div>
          </Link>
          <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-glow" />
            متصل — آخر تحديث الآن
          </div>
          <Link to="/" className="btn-ghost text-sm">العودة للموقع</Link>
        </div>
      </header>

      <main className="container-noora py-8 space-y-6">
        {/* Greeting */}
        <div className="glass-card glow-border rounded-3xl p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full opacity-30 blur-3xl" style={{ background: "var(--gradient-gold)" }} />
          <div className="relative flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-sm text-muted-foreground">صباح الخير 👋</div>
              <h1 className="text-2xl sm:text-4xl font-black mt-1">
                تقرير <span className="gradient-text">AI CEO</span> اليومي
              </h1>
              <p className="text-sm text-muted-foreground mt-2">4 تنبيهات، 4 توصيات، وتحسن عام في الأداء بنسبة 12.3%</p>
            </div>
            <button className="btn-primary text-sm">
              تصدير التقرير PDF
            </button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((k) => (
            <div key={k.label} className="glass-card rounded-2xl p-5">
              <div className="text-xs text-muted-foreground">{k.label}</div>
              <div className="text-2xl sm:text-3xl font-black mt-2">{k.value}</div>
              <div className={`text-xs mt-2 font-semibold ${k.positive ? "text-success" : "text-destructive"}`}>
                {k.change}
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-6">
          {/* Alerts */}
          <div className="glass-card rounded-3xl p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-black">تنبيهات ذكية</h2>
              <span className="text-xs text-muted-foreground">أعلى أولوية أولاً</span>
            </div>
            <div className="space-y-3">
              {alerts.map((a) => {
                const color =
                  a.level === "critical" ? "oklch(0.65 0.22 25)" :
                  a.level === "warning" ? "oklch(0.80 0.16 65)" :
                  "oklch(0.75 0.13 190)";
                return (
                  <div key={a.title} className="rounded-2xl p-4 border border-border/60 bg-surface/50 hover:bg-surface transition-colors">
                    <div className="flex items-start gap-3">
                      <span className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0" style={{ background: color, boxShadow: `0 0 12px ${color}` }} />
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-sm">{a.title}</div>
                        <div className="text-xs text-muted-foreground mt-1">{a.detail}</div>
                      </div>
                      <button className="text-xs font-bold text-primary hover:underline shrink-0">{a.action}</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recommendations */}
          <div className="glass-card rounded-3xl p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-8 h-8 rounded-xl grid place-items-center text-primary-foreground" style={{ background: "var(--gradient-gold)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor"/></svg>
              </span>
              <h2 className="text-lg font-black">توصيات عملية</h2>
            </div>
            <div className="space-y-3">
              {recommendations.map((r, i) => (
                <div key={i} className="flex gap-3 items-start p-3 rounded-xl hover:bg-surface/60 transition-colors">
                  <div className="w-6 h-6 rounded-full grid place-items-center text-[11px] font-black shrink-0 mt-0.5"
                       style={{ background: "oklch(0.82 0.14 82 / 0.15)", color: "oklch(0.88 0.14 85)" }}>
                    {i + 1}
                  </div>
                  <div className="text-sm text-foreground/90 leading-relaxed">{r}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Forecast */}
        <div className="glass-card rounded-3xl p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div>
              <h2 className="text-lg font-black">توقعات الأسبوع القادم</h2>
              <p className="text-xs text-muted-foreground mt-1">مبني على 6 أشهر من البيانات</p>
            </div>
            <div className="flex gap-2">
              <button className="btn-ghost text-xs">يوم</button>
              <button className="btn-ghost text-xs" style={{ borderColor: "oklch(0.82 0.14 82 / 0.6)", color: "oklch(0.88 0.14 85)" }}>أسبوع</button>
              <button className="btn-ghost text-xs">شهر</button>
            </div>
          </div>

          <div className="h-56 flex items-end gap-2">
            {[45, 62, 58, 78, 72, 88, 95, 82, 91, 105, 98, 118, 124, 132].map((h, i) => (
              <div key={i} className="flex-1 rounded-t-lg relative group" style={{
                height: `${h}%`,
                background: `linear-gradient(180deg, oklch(0.82 0.14 82 / ${0.4 + (i / 20)}), oklch(0.75 0.13 190 / 0.15))`,
                border: "1px solid oklch(0.82 0.14 82 / 0.2)",
              }}>
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  ${h}k
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between text-[10px] text-muted-foreground">
            <span>الأحد</span><span>الاثنين</span><span>الثلاثاء</span><span>الأربعاء</span>
            <span>الخميس</span><span>الجمعة</span><span>السبت</span>
          </div>
        </div>
      </main>
    </div>
  );
}
