import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";
import { fail, ok, requireAuth } from "../result";

export default defineTool({
  name: "create_project",
  title: "Create project",
  description: "Add a new project to the portfolio. Requires an admin account.",
  inputSchema: {
    title: z.string().trim().min(1).describe("Project title."),
    short_description: z.string().optional().describe("One-line summary shown on the project card."),
    long_description: z.string().optional().describe("Full project description."),
    category: z.string().optional().describe("Project category, e.g. 'Web App'."),
    tech_stack: z.array(z.string()).optional().describe("Technologies used."),
    tags: z.array(z.string()).optional(),
    github_url: z.string().optional(),
    live_url: z.string().optional(),
    thumbnail_url: z.string().optional(),
    is_featured: z.boolean().optional(),
    status: z.string().optional().describe("Publication status, e.g. 'published' or 'draft'."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async (input, ctx) => {
    const denied = requireAuth(ctx);
    if (denied) return denied;

    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase.from("projects").insert(input).select().single();
    return error ? fail(error.message) : ok(data);
  },
});
