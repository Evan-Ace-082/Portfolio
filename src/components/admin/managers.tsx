import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Field, FieldInput, Media, useDraft } from "./fields";
import { useCollection, useDeleteRow, useSaveRow, useSingleton, type Row } from "@/lib/cms";

export function PageHeader({ title, sub, children }: { title: string; sub?: string; children?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-4">
      <div className="min-w-0">
        <h1 className="font-display text-2xl font-bold text-gradient sm:text-3xl">{title}</h1>
        {sub && <p className="mt-1 text-sm text-white/50">{sub}</p>}
      </div>
      <div className="ml-auto flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

const btnPrimary = "rounded-xl btn-glow btn-glow-hover px-5 py-2.5 text-sm font-semibold disabled:opacity-60";
const btnGhost = "rounded-xl glass px-5 py-2.5 text-sm font-semibold hover:bg-white/10";

export function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto p-4 sm:p-8">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative mx-auto w-full max-w-3xl rounded-3xl glass-strong p-6 sm:p-8">
        <div className="mb-6 flex items-center gap-4">
          <h3 className="font-display text-xl font-bold">{title}</h3>
          <button onClick={onClose} aria-label="Close" className="ml-auto rounded-lg glass px-3 py-1.5 text-sm hover:bg-white/10">
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function SingletonForm({
  table,
  title,
  fields,
  onSaved,
}: {
  table: string;
  title: string;
  fields: Field[];
  onSaved?: (row: Row) => void;
}) {
  const { data, isLoading } = useSingleton(table);
  const save = useSaveRow(table);
  const { draft, set, setDraft } = useDraft(data);

  if (isLoading) return <Skeleton />;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        save.mutate(draft, {
          onSuccess: (row) => {
            toast.success(`${title} saved — live site updated`);
            onSaved?.(row);
          },
          onError: (err) => toast.error(err instanceof Error ? err.message : "Save failed"),
        });
      }}
      className="glass rounded-3xl p-6 sm:p-8"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {fields.map((f) => (
          <FieldInput key={f.key} field={f} value={draft[f.key]} onChange={(v) => set(f.key, v)} />
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <button type="submit" disabled={save.isPending} className={btnPrimary}>
          {save.isPending ? "Saving…" : "Save Changes"}
        </button>
        <button type="button" onClick={() => setDraft(data ?? {})} className={btnGhost}>
          Cancel
        </button>
        <a href="/" target="_blank" rel="noopener" className={btnGhost}>
          Preview
        </a>
      </div>
    </form>
  );
}

export function CollectionManager({
  table,
  title,
  fields,
  labelKey = "title",
  orderBy = "display_order",
  readOnly = false,
  imageKey,
  extra,
}: {
  table: string;
  title: string;
  fields: Field[];
  labelKey?: string;
  orderBy?: string;
  readOnly?: boolean;
  imageKey?: string;
  extra?: (row: Row) => React.ReactNode;
}) {
  const { data, isLoading } = useCollection(table, { orderBy, ascending: orderBy !== "created_at" });
  const save = useSaveRow(table);
  const remove = useDeleteRow(table);
  const [editing, setEditing] = useState<Row | null>(null);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("default");

  const hasStatus = (data ?? []).some((r) => r.status !== undefined);
  const hasFeatured = (data ?? []).some((r) => r.is_featured !== undefined);

  const rows = useMemo(() => {
    let out = (data ?? []).filter((r) => (q ? JSON.stringify(r).toLowerCase().includes(q.toLowerCase()) : true));
    if (filter !== "all") {
      out = filter === "featured" ? out.filter((r) => r.is_featured) : out.filter((r) => r.status === filter);
    }
    if (sort === "az") out = [...out].sort((a, b) => String(a[labelKey] ?? "").localeCompare(String(b[labelKey] ?? "")));
    if (sort === "newest") out = [...out].sort((a, b) => String(b.created_at ?? "").localeCompare(String(a.created_at ?? "")));
    return out;
  }, [data, q, filter, sort, labelKey]);

  function patch(row: Row, changes: Row, msg: string) {
    save.mutate({ ...row, ...changes }, { onSuccess: () => toast.success(msg) });
  }

  if (isLoading) return <Skeleton />;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={`Search ${title.toLowerCase()}…`}
          className="w-full max-w-xs rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm outline-none focus:border-primary sm:w-auto"
        />
        {(hasStatus || hasFeatured) && (
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm outline-none focus:border-primary"
          >
            <option value="all" className="bg-[#111827]">All</option>
            {hasFeatured && <option value="featured" className="bg-[#111827]">Featured</option>}
            {hasStatus && <option value="published" className="bg-[#111827]">Published</option>}
            {hasStatus && <option value="draft" className="bg-[#111827]">Draft</option>}
            {hasStatus && <option value="archived" className="bg-[#111827]">Archived</option>}
          </select>
        )}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm outline-none focus:border-primary"
        >
          <option value="default" className="bg-[#111827]">Default order</option>
          <option value="az" className="bg-[#111827]">A → Z</option>
          <option value="newest" className="bg-[#111827]">Newest</option>
        </select>
        <span className="text-xs text-white/40">{rows.length} item(s)</span>
        {!readOnly && (
          <button onClick={() => setEditing({})} className={`ml-auto ${btnPrimary}`}>
            + Add {title.replace(/s$/, "")}
          </button>
        )}
      </div>

      {editing && (
        <Modal title={`${editing.id ? "Edit" : "New"} ${title.replace(/s$/, "").toLowerCase()}`} onClose={() => setEditing(null)}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              save.mutate(editing, {
                onSuccess: () => {
                  toast.success("Saved — live site updated");
                  setEditing(null);
                },
                onError: (err) => toast.error(err instanceof Error ? err.message : "Save failed"),
              });
            }}
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {fields.map((f) => (
                <FieldInput key={f.key} field={f} value={editing[f.key]} onChange={(v) => setEditing({ ...editing, [f.key]: v })} />
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <button type="submit" disabled={save.isPending} className={btnPrimary}>
                {save.isPending ? "Saving…" : "Save"}
              </button>
              <button type="button" onClick={() => setEditing(null)} className={btnGhost}>
                Cancel
              </button>
              <a href="/" target="_blank" rel="noopener" className={btnGhost}>
                Preview
              </a>
              {editing.id && !readOnly && (
                <button
                  type="button"
                  onClick={() => {
                    if (!confirm("Delete this item?")) return;
                    remove.mutate(editing.id, {
                      onSuccess: () => {
                        toast.success("Deleted");
                        setEditing(null);
                      },
                    });
                  }}
                  className="ml-auto rounded-xl glass px-5 py-2.5 text-sm font-semibold text-red-300 hover:bg-red-500/10"
                >
                  Delete
                </button>
              )}
            </div>
          </form>
        </Modal>
      )}

      <div className="grid grid-cols-1 gap-3">
        {rows.map((r) => (
          <div key={r.id} className="flex flex-wrap items-center gap-4 rounded-2xl glass p-4">
            {imageKey && r[imageKey] ? (
              <Media src={r[imageKey]} alt="" className="h-12 w-12 shrink-0 rounded-xl object-cover" />
            ) : null}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 truncate text-sm font-semibold text-white/90">
                {String(r[labelKey] ?? r.name ?? r.title ?? "Untitled")}
                {r.is_featured ? <span className="rounded-full bg-amber-400/15 px-2 py-0.5 text-[10px] text-amber-300">★ Featured</span> : null}
              </div>
              <div className="truncate text-xs text-white/40">
                {String(
                  r.short_description ?? r.description ?? r.review ?? r.subject ?? r.organization ?? r.company ?? r.institution ?? r.excerpt ?? "",
                )}
              </div>
            </div>
            {extra?.(r)}
            {r.status ? <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-primary">{String(r.status)}</span> : null}
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setEditing(r)} className="rounded-lg glass px-4 py-2 text-xs hover:bg-white/10">
                Edit
              </button>
              {hasFeatured && (
                <button
                  onClick={() => patch(r, { is_featured: !r.is_featured }, r.is_featured ? "Unfeatured" : "Featured")}
                  className="rounded-lg glass px-4 py-2 text-xs hover:bg-white/10"
                >
                  {r.is_featured ? "Unfeature" : "Feature"}
                </button>
              )}
              {hasStatus && (
                <>
                  <button
                    onClick={() =>
                      patch(r, { status: r.status === "published" ? "draft" : "published" }, r.status === "published" ? "Hidden" : "Published")
                    }
                    className="rounded-lg glass px-4 py-2 text-xs hover:bg-white/10"
                  >
                    {r.status === "published" ? "Hide" : "Publish"}
                  </button>
                  <button onClick={() => patch(r, { status: "archived" }, "Archived")} className="rounded-lg glass px-4 py-2 text-xs hover:bg-white/10">
                    Archive
                  </button>
                </>
              )}
              {!readOnly && (
                <button
                  onClick={() =>
                    save.mutate(
                      {
                        ...r,
                        id: undefined,
                        created_at: undefined,
                        slug: r.slug ? `${r.slug}-copy` : undefined,
                        title: r.title ? `${r.title} (copy)` : undefined,
                        name: r.name ? `${r.name} (copy)` : undefined,
                      },
                      { onSuccess: () => toast.success("Duplicated") },
                    )
                  }
                  className="rounded-lg glass px-4 py-2 text-xs hover:bg-white/10"
                >
                  Duplicate
                </button>
              )}
              <a href="/" target="_blank" rel="noopener" className="rounded-lg glass px-4 py-2 text-xs hover:bg-white/10">
                View
              </a>
              <button
                onClick={() => {
                  if (confirm("Delete this item?")) remove.mutate(r.id, { onSuccess: () => toast.success("Deleted") });
                }}
                className="rounded-lg glass px-4 py-2 text-xs text-red-300 hover:bg-red-500/10"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {rows.length === 0 && <p className="rounded-2xl glass p-8 text-center text-sm text-white/40">Nothing here yet.</p>}
      </div>
    </div>
  );
}

export function Skeleton() {
  return (
    <div className="space-y-3">
      {[0, 1, 2].map((i) => (
        <div key={i} className="h-20 animate-pulse rounded-2xl bg-white/5" />
      ))}
    </div>
  );
}

export { btnPrimary, btnGhost };
