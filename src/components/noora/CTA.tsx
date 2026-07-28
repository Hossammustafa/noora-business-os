import { useState } from "react";

export function CTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="cta" className="py-24 relative">
      <div className="container-noora">
        <div className="relative rounded-[2rem] overflow-hidden glass-card glow-border p-10 sm:p-16 text-center">
          <div className="absolute inset-0 opacity-40" style={{ background: "var(--gradient-hero)" }} />
          <div className="relative">
            <span className="section-eyebrow">ابدأ الآن</span>
            <h2 className="mt-5 text-3xl sm:text-5xl font-black tracking-tight leading-tight max-w-2xl mx-auto">
              دع الذكاء الاصطناعي <span className="gradient-text">يدير شركتك</span>
              <br />
              بينما تركز أنت على النمو.
            </h2>
            <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
              14 يوم تجربة مجانية. بدون بطاقة ائتمان. الإعداد يستغرق أقل من 5 دقائق.
            </p>

            {submitted ? (
              <div className="mt-8 inline-flex items-center gap-3 px-6 py-4 rounded-2xl glass-card">
                <div className="w-8 h-8 rounded-full grid place-items-center" style={{ background: "var(--gradient-gold)" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div className="text-right">
                  <div className="font-bold">تم! سنتواصل معك خلال دقائق.</div>
                  <div className="text-xs text-muted-foreground">تحقق من بريدك للحصول على رابط الوصول</div>
                </div>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true); }}
                className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="بريدك الإلكتروني للعمل"
                  className="flex-1 px-5 py-3.5 rounded-full bg-surface/80 border border-border focus:border-primary/60 outline-none text-sm placeholder:text-muted-foreground"
                />
                <button type="submit" className="btn-primary shrink-0">
                  ابدأ التجربة
                </button>
              </form>
            )}

            <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs text-muted-foreground">
              <span>✓ بدون بطاقة ائتمان</span>
              <span>✓ إلغاء في أي وقت</span>
              <span>✓ دعم عربي وإنجليزي</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
