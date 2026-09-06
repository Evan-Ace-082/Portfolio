import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";
import { fail, ok, requireAuth } from "../result";

const TABLES = [
  "about",
  "achievements",
  "blog_posts",
  "certificates",
  "education",
  "experience",
  "gallery",
  "profile",
  "projects",
  "services",
  "site_settings",
  "skill_categories",
  "skills",
  "testimonials",
] as const;

export default defineTool({
  name: "list_content",
  title: "List portfolio content",
  description:
    "Read rows from a portfolio content collection (projects, blog posts, skills, education, and more).",
  inputSchema: {
    table: z.enum(TABLES).describe("Content collection to read."),
    limit: z.number().int().min(1).max(100).default(20).describe("Maximum rows to return."),
    search: z.string().optional().describe("Optional text to match against the row's title or name."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ table, limit, search }, ctx) => {
    const denied = requireAuth(ctx);
    if (denied) return denied;

    const supabase = supabaseForUser(ctx);
    let query = supabase.from(table).select("*").limit(limit ?? 20);
    if (search) {
      const column = table === "projects" || table === "blog_posts" ? "title" : "*";
      if (column !== "*") query = query.ilike(column, `%${search}%`);
    }
    const { data, error } = await query;
    return error ? fail(error.message) : ok(data ?? []);
  },
});
