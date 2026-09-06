import { createFileRoute } from "@tanstack/react-router";
import { CollectionManager, PageHeader } from "@/components/admin/managers";
import { projectFields } from "@/lib/admin-schema";

export const Route = createFileRoute("/admin/_panel/projects")({
  head: () => ({ meta: [{ title: "Projects — Portfolio Admin" }, { name: "robots", content: "noindex, nofollow" }] }),
  component: () => (
    <>
      <PageHeader title="Projects" sub="Add, edit, feature, hide, archive or delete portfolio projects." />
      <CollectionManager table="projects" title="Projects" fields={projectFields} labelKey="title" imageKey="thumbnail_url" />
    </>
  ),
});
