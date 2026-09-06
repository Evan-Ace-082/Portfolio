import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/admin/managers";
import { useCollection } from "@/lib/cms";

export const Route = createFileRoute("/admin/_panel/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Portfolio Admin" },
      { name: "description", content: "Manage portfolio content: projects, skills, messages and more." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminHome,
});

function StatCard({ label, value, to, action }: { label: string; value: number | string; to: string; action: string }) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="text-xs uppercase tracking-widest text-white/40">{label}</div>
      <div className="mt-2 font-display text-3xl font-bold text-gradient">{value}</div>
      <Link to={to} className="mt-4 inline-flex rounded-lg btn-glow btn-glow-hover px-4 py-2 text-xs font-semibold">
        {action}
      </Link>
    </div>
  );
}

function AdminHome() {
  const projects = useCollection("projects");
  const skills = useCollection("skills");
  const certificates = useCollection("certificates");
  const messages = useCollection("messages", { orderBy: "created_at", ascending: false });
  const activity = useCollection("activity_log", { orderBy: "created_at", ascending: false });

  const unread = (messages.data ?? []).filter((m) => m.status === "unread").length;

  return (
    <>
      <PageHeader title="Dashboard" sub="Everything on your portfolio, at a glance.">
        <Link to="/admin/projects" className="rounded-xl btn-glow btn-glow-hover px-5 py-2.5 text-sm font-semibold">
          + New Project
        </Link>
        <Link to="/admin/blog" className="rounded-xl glass px-5 py-2.5 text-sm font-semibold hover:bg-white/10">
          + New Blog Post
        </Link>
      </PageHeader>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Projects" value={projects.data?.length ?? 0} to="/admin/projects" action="Manage Projects" />
        <StatCard label="Skills" value={skills.data?.length ?? 0} to="/admin/skills" action="Manage Skills" />
        <StatCard label="Certificates" value={certificates.data?.length ?? 0} to="/admin/certificates" action="Manage Certificates" />
        <StatCard label={`Messages${unread ? ` · ${unread} unread` : ""}`} value={messages.data?.length ?? 0} to="/admin/messages" action="Open Inbox" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="glass rounded-3xl p-6">
          <div className="flex items-center gap-3">
            <h2 className="font-display text-lg font-bold">Recent projects</h2>
            <Link to="/admin/projects" className="ml-auto text-xs text-primary hover:underline">
              Manage
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {(projects.data ?? []).slice(0, 5).map((p) => (
              <div key={p.id} className="flex items-center gap-3 rounded-2xl bg-white/5 p-4">
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-white/90">{String(p.title ?? "Untitled")}</div>
                  <div className="truncate text-xs text-white/40">{String(p.short_description ?? "")}</div>
                </div>
                <span className="shrink-0 rounded-full bg-white/5 px-3 py-1 text-xs text-primary">{String(p.status ?? "")}</span>
              </div>
            ))}
            {(projects.data ?? []).length === 0 && <p className="text-sm text-white/40">No projects yet.</p>}
          </div>
        </div>

        <div className="glass rounded-3xl p-6">
          <div className="flex items-center gap-3">
            <h2 className="font-display text-lg font-bold">Recent messages</h2>
            <Link to="/admin/messages" className="ml-auto text-xs text-primary hover:underline">
              Open inbox
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {(messages.data ?? []).slice(0, 5).map((m) => (
              <div key={m.id} className="rounded-2xl bg-white/5 p-4">
                <div className="text-sm font-semibold text-white/90">
                  {String(m.name ?? "Unknown")} · <span className="text-white/50">{String(m.email ?? "")}</span>
                </div>
                <div className="mt-1 line-clamp-2 text-sm text-white/60">{String(m.message ?? "")}</div>
              </div>
            ))}
            {(messages.data ?? []).length === 0 && <p className="text-sm text-white/40">No messages yet.</p>}
          </div>
        </div>

        <div className="glass rounded-3xl p-6 lg:col-span-2">
          <h2 className="font-display text-lg font-bold">Recent activity</h2>
          <div className="mt-4 space-y-2 text-sm">
            {(activity.data ?? []).slice(0, 8).map((a) => (
              <div key={a.id} className="flex flex-wrap gap-3 rounded-xl bg-white/5 px-4 py-3">
                <span className="font-semibold text-white/85">{String(a.action)}</span>
                <span className="text-primary">{String(a.entity ?? "")}</span>
                <span className="text-white/50">{String(a.detail ?? "")}</span>
                <span className="ml-auto text-white/30">{new Date(String(a.created_at)).toLocaleString()}</span>
              </div>
            ))}
            {(activity.data ?? []).length === 0 && <p className="text-white/40">No activity yet.</p>}
          </div>
        </div>

        <div className="glass rounded-3xl p-6 lg:col-span-2">
          <h2 className="font-display text-lg font-bold">Quick actions</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {[
              { to: "/admin/profile", label: "Manage Profile" },
              { to: "/admin/about", label: "Edit About" },
              { to: "/admin/education", label: "Manage Education" },
              { to: "/admin/experience", label: "Manage Experience" },
              { to: "/admin/services", label: "Manage Services" },
              { to: "/admin/gallery", label: "Manage Gallery" },
              { to: "/admin/resume", label: "Upload Resume" },
              { to: "/admin/settings", label: "Website Settings" },
            ].map((a) => (
              <Link key={a.to} to={a.to} className="rounded-xl glass px-5 py-2.5 text-sm font-semibold hover:bg-white/10">
                {a.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
