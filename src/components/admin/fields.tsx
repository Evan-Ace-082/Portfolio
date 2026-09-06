import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { uploadMedia, useMediaUrl, type Row } from "@/lib/cms";

export type FieldType =
  | "text"
  | "textarea"
  | "richtext"
  | "number"
  | "boolean"
  | "array"
  | "image"
  | "file"
  | "select"
  | "color";

export type Field = {
  key: string;
  label: string;
  type?: FieldType;
  options?: { value: string; label: string }[];
  placeholder?: string;
  help?: string;
  folder?: string;
  full?: boolean;
};

const inputCls =
  "w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15";

export function Media({ src, alt, className }: { src?: string | null; alt: string; className?: string }) {
  const url = useMediaUrl(src);
  if (!url) return null;
  return <img src={url} alt={alt} loading="lazy" className={className} />;
}

function FileField({ field, value, onChange }: { field: Field; value: string; onChange: (v: string) => void }) {
  const [busy, setBusy] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const preview = useMediaUrl(value);

  async function handle(file?: File | null) {
    if (!file) return;
    setBusy(true);
    try {
      const path = await uploadMedia(file, field.folder ?? "uploads");
      onChange(path);
      toast.success("File uploaded");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-3">
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          void handle(e.dataTransfer.files?.[0]);
        }}
        className="flex items-center gap-4 rounded-lg border border-dashed border-border bg-card p-4"
      >
        {field.type === "image" && preview ? (
          <img src={preview} alt="" className="h-16 w-16 rounded-lg object-cover" />
        ) : null}
        <div className="min-w-0 flex-1">
          <button
            type="button"
            onClick={() => ref.current?.click()}
            disabled={busy}
            className="rounded-lg btn-glow btn-glow-hover px-4 py-2 text-xs font-semibold disabled:opacity-60"
          >
            {busy ? "Uploading…" : "Choose file"}
          </button>
          <span className="ml-3 truncate text-xs text-muted-foreground">{value || "drag & drop supported"}</span>
        </div>
        {value ? (
          <button type="button" onClick={() => onChange("")} className="text-xs text-muted-foreground hover:text-destructive">
            Remove
          </button>
        ) : null}
      </div>
      <input
        ref={ref}
        type="file"
        hidden
        accept={field.type === "image" ? "image/*" : undefined}
        onChange={(e) => void handle(e.target.files?.[0])}
      />
      <input
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="…or paste a URL"
        className={inputCls}
      />
    </div>
  );
}

export function FieldInput({ field, value, onChange }: { field: Field; value: any; onChange: (v: any) => void }) {
  const type = field.type ?? "text";

  if (type === "boolean") {
    return (
      <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-card px-4 py-3">
        <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4 accent-primary" />
        <span className="text-sm text-foreground">{field.label}</span>
      </label>
    );
  }

  return (
    <div className={field.full ? "sm:col-span-2" : ""}>
      <label className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">{field.label}</label>
      {type === "image" || type === "file" ? (
        <FileField field={field} value={value ?? ""} onChange={onChange} />
      ) : type === "textarea" || type === "richtext" ? (
        <textarea
          rows={type === "richtext" ? 14 : 4}
          value={value ?? ""}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputCls} resize-y`}
        />
      ) : type === "select" ? (
        <select value={value ?? ""} onChange={(e) => onChange(e.target.value)} className={inputCls}>
          {(field.options ?? []).map((o) => (
            <option key={o.value} value={o.value} className="bg-card">
              {o.label}
            </option>
          ))}
        </select>
      ) : type === "array" ? (
        <input
          value={Array.isArray(value) ? value.join(", ") : (value ?? "")}
          placeholder={field.placeholder ?? "comma, separated, values"}
          onChange={(e) => onChange(e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
          className={inputCls}
        />
      ) : type === "color" ? (
        <div className="flex gap-3">
          <input type="color" value={value || "#C47A44"} onChange={(e) => onChange(e.target.value)} className="h-11 w-14 rounded-lg bg-transparent" />
          <input value={value ?? ""} onChange={(e) => onChange(e.target.value)} className={inputCls} />
        </div>
      ) : (
        <input
          type={type === "number" ? "number" : "text"}
          value={value ?? ""}
          placeholder={field.placeholder}
          onChange={(e) => onChange(type === "number" ? Number(e.target.value) : e.target.value)}
          className={inputCls}
        />
      )}
      {field.help ? <p className="mt-1 text-xs text-muted-foreground">{field.help}</p> : null}
    </div>
  );
}

export function useDraft(initial: Row | null | undefined) {
  const [draft, setDraft] = useState<Row>(initial ?? {});
  useEffect(() => {
    setDraft(initial ?? {});
  }, [initial]);
  const set = (k: string, v: any) => setDraft((d) => ({ ...d, [k]: v }));
  return { draft, set, setDraft };
}

export { inputCls };
