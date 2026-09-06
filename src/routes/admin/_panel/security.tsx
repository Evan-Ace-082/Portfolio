import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { PageHeader, btnGhost, btnPrimary } from "@/components/admin/managers";
import { supabase } from "@/integrations/supabase/client";
import { useCollection } from "@/lib/cms";

export const Route = createFileRoute("/admin/_panel/security")({
  head: () => ({ meta: [{ title: "Security — Portfolio Admin" }, { name: "robots", content: "noindex, nofollow" }] }),
  component: SecurityPage,
});

const inputCls = "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm outline-none focus:border-primary";

function SecurityPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const activity = useCollection("activity_log", { orderBy: "created_at", ascending: false });
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [busy, setBusy] = useState(false);
  const [session, setSession] = useState<{ email?: string; lastSignIn?: string } | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) =>
      setSession({ email: data.user?.email ?? undefined, lastSignIn: data.user?.last_sign_in_at ?? undefined }),
    );
  }, []);

  async function changePassword(e: React.FormEvent) {
    e.preventDefault();
    if (pwd.length < 8) return toast.error("Password must be at least 8 characters");
    if (pwd !== confirmPwd) return toast.error("Passwords do not match");
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password: pwd });
    setBusy(false);
    if (error) return toast.error(error.message);
    setPwd("");
    setConfirmPwd("");
    toast.success("Password updated");
  }

  async function logoutAll() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut({ scope: "global" });
    navigate({ to: "/admin/login", search: { next: undefined }, replace: true });
  }

  return (
    <>
      <PageHeader title="Security" sub="Password, sessions and account activity." />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <form onSubmit={changePassword} className="glass rounded-3xl p-6 sm:p-8">
          <h2 className="font-display text-lg font-bold">Change Password</h2>
          <div className="mt-5 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs uppercase tracking-widest text-white/40">New password</label>
              <input type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} className={inputCls} autoComplete="new-password" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs uppercase tracking-widest text-white/40">Confirm password</label>
              <input type="password" value={confirmPwd} onChange={(e) => setConfirmPwd(e.target.value)} className={inputCls} autoComplete="new-password" />
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="submit" disabled={busy} className={btnPrimary}>
              {busy ? "Saving…" : "Save Password"}
            </button>
            <button
              type="button"
              onClick={() => {
                setPwd("");
                setConfirmPwd("");
              }}
              className={btnGhost}
            >
              Cancel
            </button>
          </div>
        </form>

        <div className="glass rounded-3xl p-6 sm:p-8">
          <h2 className="font-display text-lg font-bold">Active Session</h2>
          <p className="mt-4 text-sm text-white/60">Signed in as {session?.email ?? "…"}</p>
          <p className="mt-1 text-sm text-white/40">
            Last sign-in: {session?.lastSignIn ? new Date(session.lastSignIn).toLocaleString() : "—"}
          </p>
          <button onClick={logoutAll} className={`mt-6 ${btnPrimary}`}>
            Logout from all devices
          </button>
        </div>

        <div className="glass rounded-3xl p-6 sm:p-8 lg:col-span-2">
          <h2 className="font-display text-lg font-bold">Activity History</h2>
          <div className="mt-4 space-y-2 text-sm">
            {(activity.data ?? []).slice(0, 25).map((a) => (
              <div key={a.id} className="flex flex-wrap gap-3 rounded-xl bg-white/5 px-4 py-3">
                <span className="font-semibold text-white/85">{String(a.action)}</span>
                <span className="text-primary">{String(a.entity ?? "")}</span>
                <span className="text-white/50">{String(a.detail ?? "")}</span>
                <span className="ml-auto text-white/30">{new Date(String(a.created_at)).toLocaleString()}</span>
              </div>
            ))}
            {(activity.data ?? []).length === 0 && <p className="text-white/40">No activity recorded yet.</p>}
          </div>
        </div>
      </div>
    </>
  );
}
