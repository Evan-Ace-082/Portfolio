import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listContent from "./tools/list-content";
import createProject from "./tools/create-project";
import updateProject from "./tools/update-project";
import listMessages from "./tools/list-messages";
import updateMessageStatus from "./tools/update-message-status";
import createBlogPost from "./tools/create-blog-post";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "evan-s-futurecraft",
  title: "Evan's FutureCraft",
  version: "0.1.0",
  instructions:
    "Tools for Nabil Hasan Evan's portfolio CMS. Read portfolio content with `list_content`, manage projects with `create_project` and `update_project`, publish writing with `create_blog_post`, and triage contact form submissions with `list_messages` and `update_message_status`. All actions run as the signed-in portfolio user.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listContent, createProject, updateProject, listMessages, updateMessageStatus, createBlogPost],
});
