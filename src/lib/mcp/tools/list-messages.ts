import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";
import { fail, ok, requireAuth } from "../result";

export default defineTool({
  name: "list_messages",
  title: "List contact messages",
  description: "Read contact-form messages sent through the portfolio. Admin only.",
  inputSchema: {
    limit: z.number().int().min(1).max(100).default(20).describe("Maximum messages to return."),
    status: z.string().optional().describe("Filter by status, e.g. 'unread'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ limit, status }, ctx) => {
    const denied = requireAuth(ctx);
    if (denied) return denied;

    const supabase = supabaseForUser(ctx);
    let query = supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit ?? 20);
    if (status) query = query.eq("status", status);
    const { data, error } = await query;
    return error ? fail(error.message) : ok(data ?? []);
  },
});
