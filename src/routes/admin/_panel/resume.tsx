import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { PageHeader, Skeleton, btnGhost, btnPrimary } from "@/components/admin/managers";
import { uploadMedia, useMediaUrl, useSaveRow, useSingleton } from "@/lib/cms";

export const Route = createFileRoute("/admin/_panel/resume")({
  head: () => ({ meta: [{ title: "Resume — Portfolio Admin" }, { name: "robots", content: "noindex, nofollow" }] }),
  component: ResumePage,
});

function ResumePage() {
  const about = useSingleton("about");
  const settings = useSingleton("site_settings");
  const saveAbout = useSaveRow("about");
  const saveSettings = useSaveRow("site_settings");
  const [value, setValue] = useState("");
  const [busy, setBusy] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const url = useMediaUrl(value);

  useEffect(() => {
    setValue(String(about.data?.resume_url ?? settings.data?.resume_url ?? ""));
  }, [about.data, settings.data]);

  function persist(next: string) {
    saveAbout.mutate({ ...(about.data ?? {}), resume_url: next || null });
    saveSettings.mutate({ ...(settings.data ?? {}), resume_url: next || null });
  }

  async function upload(file?: File | null) {
    if (!file) return;
    setBusy(true);
    try {
      const path = await uploadMedia(file, "resume");
      setValue(path);
      persist(path);
      toast.success("Resume uploaded — Download CV button updated");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  if (about.isLoading || settings.isLoading) return <Skeleton />;

  return (
    <>
      <PageHeader title="Resume" sub="The file behind your Download CV button." />
      <div className="glass rounded-3xl p-6 sm:p-8">
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            void upload(e.dataTransfer.files?.[0]);
          }}
          className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-8 text-center"
        >
          <div className="text-4xl">📄</div>
          <p className="mt-3 text-sm text-white/60">{value ? value : "No resume uploaded yet"}</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <button onClick={() => ref.current?.click()} disabled={busy} className={btnPrimary}>
              {busy ? "Uploading…" : value ? "Replace Resume" : "Upload Resume PDF"}
            </button>
            {url && (
              <a href={url} target="_blank" rel="noopener" className={btnGhost}>
                Preview Resume
              </a>
            )}
            {value && (
              <button
                onClick={() => {
                  if (!confirm("Remove the current resume?")) return;
                  setValue("");
                  persist("");
                  toast.success("Resume removed");
                }}
                className="rounded-xl glass px-5 py-2.5 text-sm font-semibold text-red-300 hover:bg-red-500/10"
              >
                Delete Resume
              </button>
            )}
          </div>
          <input ref={ref} type="file" hidden accept="application/pdf" onChange={(e) => void upload(e.target.files?.[0])} />
        </div>

        <div className="mt-6">
          <label className="mb-1.5 block text-xs uppercase tracking-widest text-white/40">…or paste an external URL</label>
          <div className="flex flex-wrap gap-3">
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="https://…"
              className="min-w-[240px] flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm outline-none focus:border-primary"
            />
            <button
              onClick={() => {
                persist(value);
                toast.success("Saved");
              }}
              className={btnPrimary}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
