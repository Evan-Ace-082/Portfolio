import { useEffect, useState } from "react";
import { createFileRoute, redirect, Outlet, Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useCollection } from "@/lib/cms";

export const Route = createFileRoute("/admin/_panel")({
  ssr: false,
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/admin/login", search: { next: undefined } });
    return { user: data.user };
  },
  component: AdminLayout,
});

export const NAV_GROUPS: { label: string; items: { to: string; label: string; icon: string }[] }[] = [
  {
    label: "Overview",
    items: [{ to: "/admin", label: "Dashboard", icon: "▦" }],
  },
  {
    label: "Content",
    items: [
      { to: "/admin/profile", label: "Profile", icon: "◉" },
      { to: "/admin/about", label: "About", icon: "✦" },
      { to: "/admin/education", label: "Education", icon: "🎓" },
      { to: "/admin/experience", label: "Experience", icon: "💼" },
      { to: "/admin/projects", label: "Projects", icon: "🗂" },
      { to: "/admin/skills", label: "Skills", icon: "⚡" },
      { to: "/admin/services", label: "Services", icon: "🛠" },
      { to: "/admin/certificates", label: "Certificates", icon: "🏅" },
      { to: "/admin/achievements", label: "Achievements", icon: "🏆" },
      { to: "/admin/hobbies", label: "Hobbies", icon: "🎮" },
      { to: "/admin/resume", label: "Resume", icon: "📄" },
      { to: "/admin/gallery", label: "Gallery", icon: "🖼" },
      { to: "/admin/blog", label: "Blog", icon: "✍️" },
      { to: "/admin/testimonials", label: "Testimonials", icon: "💬" },
    ],
  },
  {
    label: "Inbox",
    items: [{ to: "/admin/messages", label: "Messages", icon: "✉️" }],
  },
  {
    label: "System",
    items: [
      { to: "/admin/seo", label: "SEO", icon: "🔍" },
      { to: "/admin/settings", label: "Website Settings", icon: "⚙️" },
      { to: "/admin/security", label: "Security", icon: "🔐" },
    ],
  },
];

function AdminLayout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const messages = useCollection("messages", { orderBy: "created_at", ascending: false });
  const unread = (messages.data ?? []).filter((m) => m.status === "unread").length;

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
  }, []);

  useEffect(() => {
    setOpen(false);
    setMenu(false);
  }, [pathname]);

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/admin/login", search: { next: undefined }, replace: true });
  }

  const sidebar = (
    <div className="flex h-full flex-col gap-6 overflow-y-auto p-5">
      <Link to="/admin" className="flex items-center gap-2 font-display text-lg font-bold">
        <span className="grid h-9 w-9 place-items-center rounded-lg btn-glow text-sm">NHE</span>
        <span className="text-gradient">Admin CMS</span>
      </Link>
      {NAV_GROUPS.map((g) => (
        <div key={g.label}>
          <div className="mb-2 px-2 text-[10px] uppercase tracking-widest text-muted-foreground">{g.label}</div>
          <nav className="space-y-1">
            {g.items.map((it) => {
              const active = pathname === it.to;
              return (
                <Link
                  key={it.to}
                  to={it.to}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${
                    active ? "border border-primary/40 bg-primary/10 font-semibold text-accent" : "border border-transparent text-muted-foreground hover:border-border hover:bg-card hover:text-foreground"
                  }`}
                >
                  <span className="w-5 text-center text-xs">{it.icon}</span>
                  <span className="flex-1">{it.label}</span>
                  {it.to === "/admin/messages" && unread > 0 && (
                    <span className="rounded-full bg-red-500/80 px-2 text-[10px] font-bold">{unread}</span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      ))}
      <button
        onClick={signOut}
        className="mt-auto rounded-xl glass px-3 py-2.5 text-left text-sm font-semibold text-red-300 hover:bg-red-500/10"
      >
        ⎋ Logout
      </button>
    </div>
  );

  return (
    <div className="relative flex min-h-screen w-full bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 bg-grid opacity-[0.07]" />

      <aside className="sticky top-0 z-30 hidden h-screen w-64 shrink-0 border-r border-border bg-secondary/70 backdrop-blur lg:block">
        {sidebar}
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-background/80" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-72 border-r border-border bg-background">{sidebar}</aside>
        </div>
      )}

      <div className="relative z-10 flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-border bg-background/90 px-4 py-3 backdrop-blur sm:px-6">
          <button onClick={() => setOpen(true)} aria-label="Open menu" className="rounded-lg glass p-2 lg:hidden">
            <div className="flex flex-col gap-1">
              <span className="block h-0.5 w-5 bg-foreground" />
              <span className="block h-0.5 w-5 bg-foreground" />
              <span className="block h-0.5 w-5 bg-foreground" />
            </div>
          </button>
          <div className="truncate font-display text-sm font-semibold text-foreground/80">
            {NAV_GROUPS.flatMap((g) => g.items).find((i) => i.to === pathname)?.label ?? "Dashboard"}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Link to="/admin/messages" className="relative rounded-lg glass px-3 py-2 text-sm hover:bg-white/10" aria-label="Notifications">
              🔔
              {unread > 0 && (
                <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-red-500 px-1 text-[10px] font-bold">
                  {unread}
                </span>
              )}
            </Link>
            <a href="/" target="_blank" rel="noopener" className="hidden rounded-lg glass px-3 py-2 text-sm hover:bg-white/10 sm:block">
              View site
            </a>
            <div className="relative">
              <button onClick={() => setMenu((v) => !v)} className="flex items-center gap-2 rounded-lg glass px-3 py-2 text-sm hover:bg-white/10">
                <span className="grid h-6 w-6 place-items-center rounded-full btn-glow text-[10px]">
                  {(email ?? "A").slice(0, 1).toUpperCase()}
                </span>
                <span className="hidden max-w-[160px] truncate sm:inline">{email ?? "…"}</span>
              </button>
              {menu && (
                <div className="absolute right-0 top-12 w-52 rounded-2xl glass-strong p-2 text-sm">
                  <Link to="/admin/profile" className="block rounded-lg px-3 py-2 hover:bg-white/10">
                    Edit profile
                  </Link>
                  <Link to="/admin/security" className="block rounded-lg px-3 py-2 hover:bg-white/10">
                    Security
                  </Link>
                  <button onClick={signOut} className="block w-full rounded-lg px-3 py-2 text-left text-red-300 hover:bg-red-500/10">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
