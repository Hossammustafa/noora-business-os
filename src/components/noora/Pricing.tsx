const plans = [
  {
    name: "Starter",
    price: "49",
    tag: "للشركات الصغيرة",
    features: ["3 وكلاء AI", "مستخدم واحد", "1000 عملية شهرياً", "دعم عبر البريد"],
    highlight: false,
  },
  {
    name: "Business",
    price: "199",
    tag: "الأكثر طلباً",
    features: ["كل الوكلاء العشرة", "حتى 20 مستخدم", "عمليات غير محدودة", "دعم أولوية 24/7", "White Label"],
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "مخصص",
    tag: "متعدد الشركات",
    features: ["كل ما في Business", "شركات وفروع لا نهائية", "مدير حساب مخصص", "SLA و SSO", "تطوير مخصص"],
    highlight: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 relative">
      <div className="container-noora">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="section-eyebrow">الأسعار</span>
          <h2 className="mt-5 text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            أقل من راتب موظف واحد.
            <br />
            <span className="gradient-text">بديل عن فريق كامل.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-3xl p-8 ${
                p.highlight ? "glass-card glow-border" : "glass-card"
              }`}
              style={p.highlight ? { boxShadow: "var(--shadow-glow)" } : undefined}
            >
              {p.highlight && (
                <div className="absolute -top-3 right-6 px-3 py-1 rounded-full text-xs font-bold text-primary-foreground" style={{ background: "var(--gradient-gold)" }}>
                  الأكثر طلباً
                </div>
              )}
              <div className="text-sm text-muted-foreground">{p.tag}</div>
              <div className="text-2xl font-black mt-1">{p.name}</div>
              <div className="mt-4 flex items-baseline gap-1">
                {p.price === "مخصص" ? (
                  <span className="text-4xl font-black gradient-text">مخصص</span>
                ) : (
                  <>
                    <span className="text-5xl font-black">${p.price}</span>
                    <span className="text-muted-foreground">/شهر</span>
                  </>
                )}
              </div>
              <div className="my-6 h-px bg-border" />
              <ul className="space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-primary shrink-0">
                      <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#cta"
                className={`mt-8 w-full ${p.highlight ? "btn-primary" : "btn-ghost"}`}
              >
                {p.price === "مخصص" ? "تواصل معنا" : "ابدأ الآن"}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
