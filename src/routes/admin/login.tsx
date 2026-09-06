import { useEffect, useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/login")({
  ssr: false,
  validateSearch: (s: Record<string, unknown>) => ({
    next: typeof s.next === "string" ? s.next : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Admin Login — Nabil Hasan Evan" },
      { name: "description", content: "Secure sign-in for the portfolio content management dashboard." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Admin Login — Nabil Hasan Evan" },
      { property: "og:description", content: "Secure sign-in for the portfolio content management dashboard." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LoginPage,
});

const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-primary";

function LoginPage() {
  const navigate = useNavigate();
  const { next } = Route.useSearch();
  // Only same-origin relative paths are allowed as a post-login destination.
  const safeNext = next && next.startsWith("/") && !next.startsWith("//") ? next : null;
  const goAfterAuth = () => {
    if (safeNext) window.location.href = safeNext;
    else navigate({ to: "/admin", replace: true });
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"login" | "forgot">("login");
  const [notice, setNotice] = useState<string | null>(null);

  // Already signed in → straight to the dashboard (or back to the pending consent screen).
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        if (safeNext) window.location.href = safeNext;
        else navigate({ to: "/admin", replace: true });
      }
    });
    const saved = localStorage.getItem("admin_remembered_email");
    if (saved) setEmail(saved);
  }, [navigate, safeNext]);


  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setNotice(null);
    setLoading(true);
    const { error: err } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setLoading(false);
    if (err) {
      setError(
        /invalid login/i.test(err.message)
          ? "Invalid email or password. Please try again."
          : err.message,
      );
      return;
    }
    if (remember) localStorage.setItem("admin_remembered_email", email.trim());
    else localStorage.removeItem("admin_remembered_email");
    goAfterAuth();
  }

  async function handleForgot(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setNotice(null);
    if (!email.trim()) {
      setError("Enter your email address first.");
      return;
    }
    setLoading(true);
    const { error: err } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (err) setError(err.message);
    else setNotice("If that email exists, a reset link is on its way. Check your inbox.");
  }

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-background px-6 py-16 text-white">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />

      <div className="relative w-full max-w-md">
        <Link to="/" className="mb-6 inline-block text-xs text-white/50 hover:text-primary">
          ← Back to portfolio
        </Link>

        <div className="glass-strong rounded-3xl p-8">
          <h1 className="font-display text-2xl font-bold text-gradient">
            {mode === "login" ? "Admin Login" : "Reset Password"}
          </h1>
          <p className="mt-2 text-sm text-white/50">
            {mode === "login"
              ? "Sign in to manage your portfolio content."
              : "We'll email you a secure link to set a new password."}
          </p>

          <form onSubmit={mode === "login" ? handleLogin : handleForgot} className="mt-7 space-y-5">
            <div>
              <label htmlFor="email" className="mb-2 block text-xs font-semibold uppercase tracking-widest text-white/40">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={inputCls}
              />
            </div>

            {mode === "login" && (
              <div>
                <label htmlFor="password" className="mb-2 block text-xs font-semibold uppercase tracking-widest text-white/40">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPw ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`${inputCls} pr-16`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/40 hover:text-primary"
                  >
                    {showPw ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
            )}

            {mode === "login" && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex cursor-pointer items-center gap-2 text-white/60">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="h-4 w-4 rounded border-white/20 bg-white/5 accent-primary"
                  />
                  Remember me
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setMode("forgot");
                    setError(null);
                    setNotice(null);
                  }}
                  className="text-white/50 hover:text-primary"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {error && (
              <p role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </p>
            )}
            {notice && (
              <p className="rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary">
                {notice}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl btn-glow btn-glow-hover px-6 py-3 text-sm font-semibold disabled:opacity-60"
            >
              {loading && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              )}
              {loading
                ? mode === "login"
                  ? "Signing in…"
                  : "Sending link…"
                : mode === "login"
                  ? "Sign in"
                  : "Send reset link"}
            </button>

            {mode === "forgot" && (
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setError(null);
                  setNotice(null);
                }}
                className="w-full text-center text-sm text-white/50 hover:text-primary"
              >
                ← Back to sign in
              </button>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}
