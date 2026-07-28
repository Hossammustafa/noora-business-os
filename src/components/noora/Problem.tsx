const problems = [
  { icon: "👥", title: "ضياع العملاء", desc: "لا أحد يتابع من ينوي المغادرة" },
  { icon: "📉", title: "انخفاض المبيعات", desc: "دون معرفة السبب الحقيقي" },
  { icon: "💰", title: "تأخر التحصيل", desc: "فواتير معلقة وسيولة تتآكل" },
  { icon: "📦", title: "نفاد المخزون", desc: "طلبات تُلغى في اللحظة الأخيرة" },
  { icon: "🧩", title: "برامج متفرقة", desc: "CRM + ERP + محاسبة + واتساب…" },
  { icon: "⏰", title: "مواعيد منسية", desc: "فرص تضيع لأن أحداً لم يذكرك" },
];

export function Problem() {
  return (
    <section className="py-24 relative">
      <div className="container-noora">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="section-eyebrow">المشكلة</span>
          <h2 className="mt-5 text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            كل يوم تخسر مالاً <span className="gradient-text">لا تراه</span>.
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            أصحاب الشركات يديرون أعمالهم بعشرات الأدوات المنفصلة. كل أداة تحل جزءاً، ولا شيء يرى الصورة كاملة.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {problems.map((p) => (
            <div key={p.title} className="glass-card rounded-2xl p-6 hover:-translate-y-1 transition-transform duration-500">
              <div className="text-3xl mb-3">{p.icon}</div>
              <div className="font-bold text-lg">{p.title}</div>
              <div className="text-sm text-muted-foreground mt-1.5">{p.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
