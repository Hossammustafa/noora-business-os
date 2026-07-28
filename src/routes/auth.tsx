import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "تسجيل الدخول — NOORA Business OS" },
      { name: "description", content: "سجّل دخولك إلى منصة NOORA لإدارة أعمالك بالذكاء الاصطناعي." },
      { property: "og:title", content: "تسجيل الدخول — NOORA" },
      { property: "og:description", content: "دخول آمن إلى NOORA Business OS." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/app" });
    });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { display_name: displayName || email.split("@")[0] },
            emailRedirectTo: `${window.location.origin}/app`,
          },
        });
        if (error) throw error;
        navigate({ to: "/app" });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/app" });
      }
    } catch (e: any) {
      setErr(e.message || "حدث خطأ");
    } finally {
      setLoading(false);
    }
  };

  const signInGoogle = async () => {
    setErr(null);
    const res = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin + "/app",
    });
    if (res.error) setErr(res.error.message || "تعذّر الدخول عبر Google");
  };

  return (
    <div className="min-h-screen grid place-items-center px-4 py-12">
      <div className="w-full max-w-md glass-card glow-border rounded-3xl p-8 sm:p-10">
        <Link to="/" className="flex items-center gap-2.5 mb-6">
          <div className="w-10 h-10 rounded-xl grid place-items-center" style={{ background: "var(--gradient-gold)" }}>
            <span className="text-lg font-black text-primary-foreground">N</span>
          </div>
          <div className="leading-tight">
            <div className="font-black">NOORA</div>
            <div className="text-[10px] text-muted-foreground tracking-widest">BUSINESS OS</div>
          </div>
        </Link>

        <h1 className="text-2xl font-black">{mode === "signin" ? "مرحباً بعودتك" : "أنشئ حسابك"}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {mode === "signin" ? "سجّل دخولك للمتابعة إلى لوحتك." : "دقيقة واحدة، وتبدأ بإدارة شركتك بالذكاء الاصطناعي."}
        </p>

        <button
          type="button"
          onClick={signInGoogle}
          className="mt-6 w-full flex items-center justify-center gap-3 px-4 py-3 rounded-full border border-border hover:bg-surface transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.4-1.7 4.1-5.5 4.1-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.5 14.6 2.5 12 2.5 6.8 2.5 2.5 6.8 2.5 12S6.8 21.5 12 21.5c6.9 0 9.5-4.8 9.5-9.3 0-.6-.1-1.1-.2-1.6H12z"/></svg>
          <span className="text-sm font-semibold">المتابعة عبر Google</span>
        </button>

        <div className="flex items-center gap-3 my-5 text-[10px] text-muted-foreground uppercase tracking-widest">
          <div className="flex-1 h-px bg-border" /> أو <div className="flex-1 h-px bg-border" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === "signup" && (
            <input
              type="text"
              placeholder="الاسم الكامل"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-surface/70 border border-border focus:border-primary/60 outline-none text-sm"
            />
          )}
          <input
            type="email"
            required
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-surface/70 border border-border focus:border-primary/60 outline-none text-sm"
          />
          <input
            type="password"
            required
            minLength={6}
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-surface/70 border border-border focus:border-primary/60 outline-none text-sm"
          />
          {err && <div className="text-xs text-destructive">{err}</div>}
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? "..." : mode === "signin" ? "تسجيل الدخول" : "إنشاء الحساب"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-5 text-xs text-muted-foreground hover:text-foreground w-full text-center"
        >
          {mode === "signin" ? "ليس لديك حساب؟ أنشئ واحداً" : "لديك حساب؟ سجّل دخولك"}
        </button>
      </div>
    </div>
  );
}
