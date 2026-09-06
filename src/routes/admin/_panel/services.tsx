import { createFileRoute } from "@tanstack/react-router";
import { CollectionManager, PageHeader } from "@/components/admin/managers";
import { serviceFields } from "@/lib/admin-schema";

export const Route = createFileRoute("/admin/_panel/services")({
  head: () => ({ meta: [{ title: "Services — Portfolio Admin" }, { name: "robots", content: "noindex, nofollow" }] }),
  component: () => (
    <>
      <PageHeader title="Services" sub="What you offer." />
      <CollectionManager table="services" title="Services" fields={serviceFields} labelKey="title" />
    </>
  ),
});
