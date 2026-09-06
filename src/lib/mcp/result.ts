import type { ToolContext } from "@lovable.dev/mcp-js";

export function unauthenticated() {
  return {
    content: [{ type: "text" as const, text: "Not authenticated. Sign in to this portfolio to use these tools." }],
    isError: true,
  };
}

export function requireAuth(ctx: ToolContext) {
  return ctx.isAuthenticated() ? null : unauthenticated();
}

export function fail(message: string) {
  return { content: [{ type: "text" as const, text: message }], isError: true };
}

export function ok(data: unknown) {
  return {
    content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
    structuredContent: { result: data } as Record<string, unknown>,
  };
}
