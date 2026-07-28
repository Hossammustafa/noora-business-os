export function Footer() {
  return (
    <footer className="border-t border-border/60 py-10">
      <div className="container-noora">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg grid place-items-center" style={{ background: "var(--gradient-gold)" }}>
              <span className="text-sm font-black text-primary-foreground">N</span>
            </div>
            <div className="text-sm">
              <span className="font-black">NOORA</span>{" "}
              <span className="text-muted-foreground">Business OS © {new Date().getFullYear()}</span>
            </div>
          </div>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground">الخصوصية</a>
            <a href="#" className="hover:text-foreground">الشروط</a>
            <a href="#" className="hover:text-foreground">الأمان</a>
            <a href="#" className="hover:text-foreground">تواصل</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
