import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Modal, PageHeader, Skeleton, btnGhost, btnPrimary } from "@/components/admin/managers";
import { useCollection, useDeleteRow, useSaveRow, type Row } from "@/lib/cms";

export const Route = createFileRoute("/admin/_panel/messages")({
  head: () => ({ meta: [{ title: "Messages — Portfolio Admin" }, { name: "robots", content: "noindex, nofollow" }] }),
  component: MessagesPage,
});

function MessagesPage() {
  const { data, isLoading } = useCollection("messages", { orderBy: "created_at", ascending: false });
  const save = useSaveRow("messages");
  const remove = useDeleteRow("messages");
  const [open, setOpen] = useState<Row | null>(null);
  const [q, setQ] = useState("");

  const rows = (data ?? []).filter((r) => (q ? JSON.stringify(r).toLowerCase().includes(q.toLowerCase()) : true));

  function mark(row: Row, status: string) {
    save.mutate({ ...row, status }, { onSuccess: () => toast.success(`Marked as ${status}`) });
  }

  return (
    <>
      <PageHeader title="Messages" sub="Everything submitted through your contact form." />
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search messages…"
          className="w-full max-w-xs rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
        <span className="text-xs text-white/40">{rows.length} message(s)</span>
      </div>

      {isLoading ? (
        <Skeleton />
      ) : (
        <div className="overflow-x-auto rounded-2xl glass">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="text-xs uppercase tracking-widest text-white/40">
              <tr>
                {["Name", "Email", "Phone", "Subject", "Date", ""].map((h) => (
                  <th key={h} className="px-4 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((m) => (
                <tr key={m.id} className={`border-t border-white/5 ${m.status === "unread" ? "bg-primary/5" : ""}`}>
                  <td className="px-4 py-3 font-semibold text-white/90">{String(m.name ?? "")}</td>
                  <td className="px-4 py-3 text-white/60">{String(m.email ?? "")}</td>
                  <td className="px-4 py-3 text-white/60">{String(m.phone ?? "—")}</td>
                  <td className="max-w-[220px] truncate px-4 py-3 text-white/70">{String(m.subject ?? "")}</td>
                  <td className="px-4 py-3 text-white/40">{new Date(String(m.created_at)).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap justify-end gap-2">
                      <button
                        onClick={() => {
                          setOpen(m);
                          if (m.status === "unread") mark(m, "read");
                        }}
                        className="rounded-lg glass px-3 py-1.5 text-xs hover:bg-white/10"
                      >
                        Read
                      </button>
                      <a
                        href={`mailto:${String(m.email)}?subject=Re: ${encodeURIComponent(String(m.subject ?? ""))}`}
                        onClick={() => mark(m, "replied")}
                        className="rounded-lg glass px-3 py-1.5 text-xs hover:bg-white/10"
                      >
                        Reply
                      </a>
                      {m.status === "unread" && (
                        <button onClick={() => mark(m, "read")} className="rounded-lg glass px-3 py-1.5 text-xs hover:bg-white/10">
                          Mark as read
                        </button>
                      )}
                      <button
                        onClick={() => {
                          if (confirm("Delete this message?")) remove.mutate(m.id, { onSuccess: () => toast.success("Deleted") });
                        }}
                        className="rounded-lg glass px-3 py-1.5 text-xs text-red-300 hover:bg-red-500/10"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-white/40">No messages yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {open && (
        <Modal title={String(open.subject ?? "Message")} onClose={() => setOpen(null)}>
          <div className="space-y-2 text-sm text-white/70">
            <p><span className="text-white/40">From:</span> {String(open.name)} · {String(open.email)}</p>
            {open.phone ? <p><span className="text-white/40">Phone:</span> {String(open.phone)}</p> : null}
            <p className="text-white/40">{new Date(String(open.created_at)).toLocaleString()}</p>
          </div>
          <p className="mt-5 whitespace-pre-wrap rounded-2xl bg-white/5 p-5 text-sm leading-relaxed text-white/85">{String(open.message ?? "")}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`mailto:${String(open.email)}?subject=Re: ${encodeURIComponent(String(open.subject ?? ""))}`}
              onClick={() => mark(open, "replied")}
              className={btnPrimary}
            >
              Reply
            </a>
            <button onClick={() => setOpen(null)} className={btnGhost}>Close</button>
            <button
              onClick={() => {
                if (!confirm("Delete this message?")) return;
                remove.mutate(open.id, {
                  onSuccess: () => {
                    toast.success("Deleted");
                    setOpen(null);
                  },
                });
              }}
              className="rounded-xl glass px-5 py-2.5 text-sm font-semibold text-red-300 hover:bg-red-500/10"
            >
              Delete
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
