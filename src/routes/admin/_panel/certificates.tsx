import { createFileRoute } from "@tanstack/react-router";
import { CollectionManager, PageHeader } from "@/components/admin/managers";
import { certificateFields } from "@/lib/admin-schema";

export const Route = createFileRoute("/admin/_panel/certificates")({
  head: () => ({ meta: [{ title: "Certificates — Portfolio Admin" }, { name: "robots", content: "noindex, nofollow" }] }),
  component: () => (
    <>
      <PageHeader title="Certificates" sub="Upload certificate images or PDFs with credentials." />
      <CollectionManager table="certificates" title="Certificates" fields={certificateFields} labelKey="name" imageKey="image_url" />
    </>
  ),
});
