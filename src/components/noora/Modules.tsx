const modules = [
  { n: "01", name: "AI CEO", tag: "مدير تنفيذي", desc: "تقرير يومي بأخطر 10 مشاكل، توقعات الأسبوع، وتوصيات عملية.", color: "82" },
  { n: "02", name: "AI Sales Manager", tag: "مبيعات", desc: "يميز العملاء الساخنين من الباردين ويقترح الرسالة المناسبة.", color: "190" },
  { n: "03", name: "AI Customer Support", tag: "خدمة عملاء", desc: "رد فوري على واتساب، تيليجرام، إنستقرام، ورسائل البريد.", color: "155" },
  { n: "04", name: "AI Finance Manager", tag: "مالية", desc: "يتنبأ بأزمات السيولة قبل 45 يوماً ويتابع الفواتير والديون.", color: "82" },
  { n: "05", name: "AI Inventory", tag: "مخزون", desc: "توقع النفاد، رصد الراكد، اقتراح الشراء الذكي.", color: "190" },
  { n: "06", name: "AI Marketing", tag: "تسويق", desc: "يقترح حملات، خصومات، ومحتوى — ثم ينشره.", color: "65" },
  { n: "07", name: "AI Employees", tag: "موارد بشرية", desc: "متابعة الإنتاجية والحضور وتصنيف الأداء تلقائياً.", color: "82" },
  { n: "08", name: "AI Meetings", tag: "اجتماعات", desc: "تسجيل، تلخيص، واستخراج القرارات والمهام والمواعيد.", color: "190" },
  { n: "09", name: "AI Documents", tag: "مستندات", desc: "يقرأ PDF، Excel، عقود وفواتير ويفهم محتواها.", color: "155" },
  { n: "10", name: "AI Workflow Builder", tag: "أتمتة", desc: "مثل Zapier — لكن بالذكاء الاصطناعي. اسحب وأفلت.", color: "65" },
];

export function Modules() {
  return (
    <section id="modules" className="py-24 relative">
      <div className="container-noora">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
          <div className="max-w-xl">
            <span className="section-eyebrow">الوحدات الأساسية</span>
            <h2 className="mt-5 text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              10 وكلاء ذكاء اصطناعي.
              <br />
              <span className="gradient-text">شركة واحدة تعمل ذاتياً.</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md">
            كل وكيل مصمم لحل مجموعة مشاكل حقيقية في قسم معين. مجتمعين، يشكلون فريق إدارة كاملاً يعمل 24/7.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {modules.map((m) => (
            <div
              key={m.n}
              className="glass-card glow-border rounded-2xl p-5 relative group hover:-translate-y-1 transition-all duration-500 overflow-hidden"
            >
              <div
                className="absolute -top-16 -left-16 w-40 h-40 rounded-full opacity-20 group-hover:opacity-40 transition-opacity blur-2xl"
                style={{ background: `oklch(0.82 0.14 ${m.color})` }}
              />
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-xs font-mono text-muted-foreground">{m.n}</span>
                  <span
                    className="text-[10px] font-bold px-2 py-1 rounded-full border"
                    style={{
                      color: `oklch(0.82 0.14 ${m.color})`,
                      borderColor: `oklch(0.82 0.14 ${m.color} / 0.4)`,
                      background: `oklch(0.82 0.14 ${m.color} / 0.08)`,
                    }}
                  >
                    {m.tag}
                  </span>
                </div>
                <div className="font-bold text-base mb-2">{m.name}</div>
                <div className="text-xs text-muted-foreground leading-relaxed">{m.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
