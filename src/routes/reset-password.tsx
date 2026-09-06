import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Set a New Password — Nabil Hasan Evan" },
      { name: "description", content: "Choose a new password for your portfolio admin account." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Set a New Password — Nabil Hasan Evan" },
      { property: "og:description", content: "Choose a new password for your portfolio admin account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ResetPasswordPage,
});

const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-primary";

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const isRecovery = window.location.hash.includes("type=recovery");
    supabase.auth.getSession().then(({ data }) => {
      setReady(Boolean(isRecovery || data.session));
    });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (password.length < 8) return setError("Password must be at least 8 characters.");
    if (password !== confirm) return setError("Passwords do not match.");
    setLoading(true);
    const { error: err } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (err) return setError(err.message);
    navigate({ to: "/admin", replace: true });
  }

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-background px-6 py-16 text-white">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />
      <div className="relative w-full max-w-md glass-strong rounded-3xl p-8">
        <h1 className="font-display text-2xl font-bold text-gradient">Set a new password</h1>
        {!ready ? (
          <p className="mt-4 text-sm text-white/50">
            This page needs a valid reset link. Request a new one from the admin login page.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <div>
              <label htmlFor="pw" className="mb-2 block text-xs font-semibold uppercase tracking-widest text-white/40">
                New password
              </label>
              <input id="pw" type="password" autoComplete="new-password" required value={password}
                onChange={(e) => setPassword(e.target.value)} className={inputCls} placeholder="••••••••" />
            </div>
            <div>
              <label htmlFor="pw2" className="mb-2 block text-xs font-semibold uppercase tracking-widest text-white/40">
                Confirm password
              </label>
              <input id="pw2" type="password" autoComplete="new-password" required value={confirm}
                onChange={(e) => setConfirm(e.target.value)} className={inputCls} placeholder="••••••••" />
            </div>
            {error && (
              <p role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </p>
            )}
            <button type="submit" disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl btn-glow btn-glow-hover px-6 py-3 text-sm font-semibold disabled:opacity-60">
              {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />}
              {loading ? "Updating…" : "Update password"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
