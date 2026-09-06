/* Central CMS data layer: typed-ish helpers around the Lovable Cloud database.
   Used by both the public portfolio (read) and the admin dashboard (read/write). */
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Row = Record<string, any>;

/* eslint-disable @typescript-eslint/no-explicit-any */
const db = () => supabase as any;

export const MEDIA_BUCKET = "media";

/* ---------------- media ---------------- */

export async function uploadMedia(file: File, folder = "uploads"): Promise<string> {
  const ext = file.name.split(".").pop() ?? "bin";
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from(MEDIA_BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw error;
  return path;
}

export async function resolveMedia(value?: string | null): Promise<string | null> {
  if (!value) return null;
  if (/^(https?:)?\/\//.test(value) || value.startsWith("/") || value.startsWith("data:")) return value;
  const { data } = await supabase.storage.from(MEDIA_BUCKET).createSignedUrl(value, 60 * 60 * 24 * 7);
  return data?.signedUrl ?? null;
}

export function useMediaUrl(value?: string | null) {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    let alive = true;
    resolveMedia(value).then((u) => alive && setUrl(u));
    return () => {
      alive = false;
    };
  }, [value]);
  return url;
}

/* ---------------- reads ---------------- */

export function useCollection(
  table: string,
  opts: { orderBy?: string; ascending?: boolean; filter?: [string, string] } = {},
) {
  const { orderBy = "display_order", ascending = true, filter } = opts;
  const qc = useQueryClient();

  useEffect(() => {
    try {
      const channel = supabase
        .channel(`cms-${table}-${Math.random().toString(36).slice(2)}`)
        .on("postgres_changes", { event: "*", schema: "public", table }, () => {
          qc.invalidateQueries({ queryKey: ["cms", table] });
        })
        .subscribe();
      return () => {
        try {
          supabase.removeChannel(channel);
        } catch {}
      };
    } catch {
      return () => {};
    }
  }, [table, qc]);

  return useQuery({
    queryKey: ["cms", table, orderBy, filter?.join(":") ?? ""],
    queryFn: async (): Promise<Row[]> => {
      try {
        let q = db().from(table).select("*").order(orderBy, { ascending });
        if (filter) q = q.eq(filter[0], filter[1]);
        const { data, error } = await q;
        if (error) return [];
        return (data ?? []) as Row[];
      } catch {
        return [];
      }
    },
  });
}

export function useSingleton(table: string) {
  return useQuery({
    queryKey: ["cms", table, "singleton"],
    queryFn: async (): Promise<Row | null> => {
      try {
        const { data, error } = await db().from(table).select("*").limit(1).maybeSingle();
        if (error) return null;
        return (data ?? null) as Row | null;
      } catch {
        return null;
      }
    },
  });
}


/* ---------------- writes ---------------- */

export function useSaveRow(table: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (row: Row) => {
      const payload = { ...row };
      let res;
      if (payload.id) {
        delete payload.created_at;
        res = await db().from(table).update(payload).eq("id", payload.id).select().maybeSingle();
      } else {
        delete payload.id;
        res = await db().from(table).insert(payload).select().maybeSingle();
      }
      if (res.error) throw res.error;
      await logActivity(payload.id ? "Updated" : "Created", table, String(payload.title ?? payload.name ?? ""));
      return res.data as Row;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cms", table] }),
  });
}

export function useDeleteRow(table: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await db().from(table).delete().eq("id", id);
      if (error) throw error;
      await logActivity("Deleted", table, "");
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cms", table] }),
  });
}

export async function logActivity(action: string, entity: string, detail: string) {
  try {
    const { data } = await supabase.auth.getUser();
    if (!data.user) return;
    await db().from("activity_log").insert({ action, entity, detail, user_id: data.user.id });
  } catch {
    /* non-critical */
  }
}

/* ---------------- helpers ---------------- */

export const toArray = (v: unknown): string[] =>
  Array.isArray(v) ? (v as string[]) : String(v ?? "").split(",").map((s) => s.trim()).filter(Boolean);

export const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
