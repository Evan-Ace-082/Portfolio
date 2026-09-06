import { createFileRoute } from "@tanstack/react-router";
import { CollectionManager, PageHeader } from "@/components/admin/managers";
import { educationFields } from "@/lib/admin-schema";

export const Route = createFileRoute("/admin/_panel/education")({
  head: () => ({ meta: [{ title: "Education — Portfolio Admin" }, { name: "robots", content: "noindex, nofollow" }] }),
  component: () => (
    <>
      <PageHeader title="Education" sub="Your academic timeline." />
      <CollectionManager table="education" title="Education" fields={educationFields} labelKey="institution" imageKey="logo_url" />
    </>
  ),
});
