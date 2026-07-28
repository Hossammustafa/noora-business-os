import { createFileRoute } from "@tanstack/react-router";
import { EmptyModule, PageHeader } from "@/components/app/AppShell";

const mods = [
  { slug: "customers", title: "العملاء", emoji: "👥", desc: "قاعدة عملائك، بياناتهم، تاريخ تعاملهم، وذاكرة الذكاء الاصطناعي عن كل عميل." },
  { slug: "leads", title: "العملاء المحتملون", emoji: "🎯", desc: "قناة مبيعات كاملة: بارد، ساخن، متوقع الشراء — يديرها AI Sales Manager." },
  { slug: "products", title: "المنتجات والخدمات", emoji: "📦", desc: "كتالوج المنتجات والخدمات مع الأسعار والتكاليف والصور." },
  { slug: "orders", title: "الطلبات", emoji: "🧾", desc: "استقبل الطلبات، تابع حالتها، وحوّلها تلقائياً إلى فواتير." },
  { slug: "invoices", title: "الفواتير والمدفوعات", emoji: "💳", desc: "أصدر فواتير، تتبع المدفوعات، وذكّر العملاء المتأخرين تلقائياً." },
  { slug: "inventory", title: "المخزون", emoji: "🏬", desc: "تتبع الكميات والفروع، وتنبيهات نفاد المخزون قبل حدوثها." },
  { slug: "documents", title: "المستندات والمعرفة", emoji: "📄", desc: "ارفع PDF وExcel وWord — سيقرأها AI Document Center ويفهمها." },
  { slug: "automations", title: "الأتمتة", emoji: "⚡", desc: "منشئ سير عمل مثل Zapier مع الذكاء الاصطناعي — بدون كتابة كود." },
  { slug: "agents", title: "الوكلاء الذكيون", emoji: "🤖", desc: "عشرة وكلاء متخصصين: مبيعات، مالية، تسويق، موظفون، دعم، وأكثر." },
  { slug: "reports", title: "التقارير والتحليلات", emoji: "📊", desc: "لوحات معلومات ديناميكية، توقعات، وكشف الاحتيال والمخاطر." },
];

for (const m of mods) {
  // referenced only to keep TS happy in this generator file
  void m;
}

export const Route = createFileRoute("/_authenticated/app/$module")({
  head: () => ({
    meta: [
      { title: "الوحدة — NOORA" },
      { name: "description", content: "وحدة قيد التطوير على NOORA Business OS." },
      { property: "og:title", content: "وحدة NOORA" },
      { property: "og:description", content: "قيد التطوير." },
    ],
  }),
  component: ModulePage,
});

function ModulePage() {
  const { module } = Route.useParams();
  const m = mods.find((x) => x.slug === module);
  if (!m) {
    return (
      <>
        <PageHeader title="غير موجود" />
        <EmptyModule title="هذه الوحدة غير متاحة" description="تحقق من الرابط." emoji="❔" />
      </>
    );
  }
  return (
    <>
      <PageHeader title={m.title} subtitle="وحدة أساسية في NOORA Business OS" />
      <EmptyModule title={m.title} description={m.desc} emoji={m.emoji} />
    </>
  );
}
