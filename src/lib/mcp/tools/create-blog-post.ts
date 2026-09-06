import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";
import { fail, ok, requireAuth } from "../result";

export default defineTool({
  name: "create_blog_post",
  title: "Create blog post",
  description: "Create a blog post on the portfolio. Requires an admin account.",
  inputSchema: {
    title: z.string().trim().min(1).describe("Post title."),
    slug: z.string().optional().describe("URL slug."),
    excerpt: z.string().optional(),
    content: z.string().optional().describe("Post body in markdown."),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    status: z.string().optional().describe("'draft' or 'published'."),
    is_featured: z.boolean().optional(),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async (input, ctx) => {
    const denied = requireAuth(ctx);
    if (denied) return denied;

    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase.from("blog_posts").insert(input).select().single();
    return error ? fail(error.message) : ok(data);
  },
});
