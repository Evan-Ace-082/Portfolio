import { createFileRoute } from "@tanstack/react-router";
import { CollectionManager, PageHeader } from "@/components/admin/managers";
import { blogFields } from "@/lib/admin-schema";

export const Route = createFileRoute("/admin/_panel/blog")({
  head: () => ({ meta: [{ title: "Blog — Portfolio Admin" }, { name: "robots", content: "noindex, nofollow" }] }),
  component: () => (
    <>
      <PageHeader title="Blog" sub="Write, draft, publish and feature posts." />
      <CollectionManager table="blog_posts" title="Posts" fields={blogFields} labelKey="title" orderBy="created_at" imageKey="featured_image" />
    </>
  ),
});
