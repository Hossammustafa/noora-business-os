import { Link } from "@tanstack/react-router";

export function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border/50">
      <div className="container-noora flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="relative w-9 h-9 rounded-xl grid place-items-center" style={{ background: "var(--gradient-gold)" }}>
            <span className="text-lg font-black text-primary-foreground">N</span>
            <span className="absolute inset-0 rounded-xl animate-pulse-glow" style={{ boxShadow: "0 0 30px oklch(0.82 0.14 82 / 0.6)" }} />
          </div>
          <div className="leading-tight">
            <div className="font-black text-base tracking-tight">NOORA</div>
            <div className="text-[10px] text-muted-foreground tracking-widest">BUSINESS OS</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#modules" className="hover:text-foreground transition-colors">الوحدات</a>
          <a href="#features" className="hover:text-foreground transition-colors">المميزات</a>
          <a href="#integrations" className="hover:text-foreground transition-colors">التكاملات</a>
          <a href="#pricing" className="hover:text-foreground transition-colors">الأسعار</a>
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/preview" className="hidden sm:inline-flex btn-ghost text-sm">
            معاينة اللوحة
          </Link>
          <Link to="/auth" className="hidden sm:inline-flex btn-ghost text-sm">
            دخول
          </Link>
          <Link to="/auth" className="btn-primary text-sm">ابدأ مجاناً</Link>
        </div>
      </div>
    </header>
  );
}
