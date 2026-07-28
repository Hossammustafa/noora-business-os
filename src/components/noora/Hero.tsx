import heroImg from "@/assets/hero-noora.jpg";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      <div className="container-noora relative">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
          <div>
            <span className="section-eyebrow">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
              مدعوم بـ 10 وكلاء ذكاء اصطناعي
            </span>
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight">
              العقل المركزي
              <br />
              الذي <span className="gradient-text">يدير شركتك</span>
              <br />
              بالكامل.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              منصة NOORA تجمع المبيعات، المالية، المخزون، خدمة العملاء، والتسويق تحت سقف ذكاء اصطناعي واحد يكتشف المشكلات قبل أن تكلفك المال، ويقترح الحلول قبل أن تسأل.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#cta" className="btn-primary">
                جرّب مجاناً 14 يوم
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <a href="/dashboard" className="btn-ghost">
                شاهد اللوحة الحية
              </a>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 max-w-lg">
              {[
                { v: "10+", l: "وكيل ذكي" },
                { v: "40+", l: "تكامل" },
                { v: "99.9%", l: "وقت التشغيل" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-2xl sm:text-3xl font-black gradient-text">{s.v}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 rounded-[2rem] opacity-60 blur-3xl" style={{ background: "var(--gradient-gold)" }} />
            <div className="relative rounded-3xl overflow-hidden glass-card glow-border animate-float">
              <img
                src={heroImg}
                alt="NOORA AI Business Intelligence"
                width={1600}
                height={1200}
                className="w-full h-auto"
              />
              <div className="absolute bottom-4 right-4 left-4 glass-card rounded-2xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl grid place-items-center" style={{ background: "var(--gradient-gold)" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" className="text-primary-foreground"/></svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground">تنبيه AI CEO — الآن</div>
                  <div className="text-sm font-semibold truncate">3 عملاء VIP معرضون للفقد خلال 48 ساعة</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
