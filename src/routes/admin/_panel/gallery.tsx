import { createFileRoute } from "@tanstack/react-router";
import { CollectionManager, PageHeader } from "@/components/admin/managers";
import { galleryFields } from "@/lib/admin-schema";

export const Route = createFileRoute("/admin/_panel/gallery")({
  head: () => ({ meta: [{ title: "Gallery — Portfolio Admin" }, { name: "robots", content: "noindex, nofollow" }] }),
  component: () => (
    <>
      <PageHeader title="Gallery" sub="Images grouped by album and category. Use Display Order to reorder." />
      <CollectionManager table="gallery" title="Gallery images" fields={galleryFields} labelKey="title" imageKey="image_url" />
    </>
  ),
});
