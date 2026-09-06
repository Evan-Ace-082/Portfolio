import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";
import { fail, ok, requireAuth } from "../result";

export default defineTool({
  name: "update_project",
  title: "Update project",
  description: "Update fields on an existing portfolio project by id. Requires an admin account.",
  inputSchema: {
    id: z.string().describe("Project id (uuid)."),
    title: z.string().optional(),
    short_description: z.string().optional(),
    long_description: z.string().optional(),
    category: z.string().optional(),
    tech_stack: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    github_url: z.string().optional(),
    live_url: z.string().optional(),
    thumbnail_url: z.string().optional(),
    is_featured: z.boolean().optional(),
    status: z.string().optional(),
  },
  annotations: { readOnlyHint: false, destructiveHint: true, openWorldHint: false },
  handler: async ({ id, ...patch }, ctx) => {
    const denied = requireAuth(ctx);
    if (denied) return denied;
    const fields = Object.fromEntries(Object.entries(patch).filter(([, v]) => v !== undefined));
    if (Object.keys(fields).length === 0) return fail("Provide at least one field to update.");

    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase.from("projects").update(fields).eq("id", id).select().single();
    return error ? fail(error.message) : ok(data);
  },
});
