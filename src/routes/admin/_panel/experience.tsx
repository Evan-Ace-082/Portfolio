import { createFileRoute } from "@tanstack/react-router";
import { CollectionManager, PageHeader } from "@/components/admin/managers";
import { experienceFields } from "@/lib/admin-schema";

export const Route = createFileRoute("/admin/_panel/experience")({
  head: () => ({ meta: [{ title: "Experience — Portfolio Admin" }, { name: "robots", content: "noindex, nofollow" }] }),
  component: () => (
    <>
      <PageHeader title="Experience" sub="Roles, internships and work history." />
      <CollectionManager table="experience" title="Experience" fields={experienceFields} labelKey="company" imageKey="logo_url" />
    </>
  ),
});
