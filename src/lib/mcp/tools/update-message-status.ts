import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";
import { fail, ok, requireAuth } from "../result";

export default defineTool({
  name: "update_message_status",
  title: "Update message status",
  description: "Mark a contact message as read, replied, or archived. Admin only.",
  inputSchema: {
    id: z.string().describe("Message id (uuid)."),
    status: z.enum(["unread", "read", "replied", "archived"]).describe("New status."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async ({ id, status }, ctx) => {
    const denied = requireAuth(ctx);
    if (denied) return denied;

    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("messages")
      .update({ status })
      .eq("id", id)
      .select()
      .single();
    return error ? fail(error.message) : ok(data);
  },
});
