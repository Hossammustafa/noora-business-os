const groups = [
  {
    title: "قوة المؤسسات",
    items: ["Multi Company", "Multi Branch", "Multi Currency", "Multi Language", "White Label", "Audit Logs"],
  },
  {
    title: "منصة قابلة للتوسع",
    items: ["Plugin Marketplace", "Automation Marketplace", "API Builder", "Form Builder", "Dashboard Builder", "Report Builder"],
  },
  {
    title: "ذكاء اصطناعي عميق",
    items: ["AI Forecasting", "AI Fraud Detection", "AI Risk Analysis", "AI Pricing", "AI Proposal Generator", "AI Contract Generator"],
  },
  {
    title: "أدوات جاهزة",
    items: ["OCR & Barcode", "Voice Commands", "Face Recognition", "Digital Signature", "GPS Tracking", "Offline Mode"],
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 relative">
      <div className="container-noora">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="section-eyebrow">المميزات الاحترافية</span>
          <h2 className="mt-5 text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            مبنية <span className="gradient-text">لتنمو معك</span>.
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            من متجر واحد إلى ألف فرع، من عملة واحدة إلى تجارة عالمية — كل شيء جاهز من اليوم الأول.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {groups.map((g) => (
            <div key={g.title} className="glass-card rounded-3xl p-8 relative overflow-hidden">
              <h3 className="font-black text-xl mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                {g.title}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {g.items.map((it) => (
                  <div key={it} className="flex items-center gap-2 text-sm">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-primary shrink-0">
                      <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-muted-foreground">{it}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
