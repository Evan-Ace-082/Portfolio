import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SingletonForm } from "@/components/admin/managers";
import { aboutFields } from "@/lib/admin-schema";

export const Route = createFileRoute("/admin/_panel/about")({
  head: () => ({ meta: [{ title: "About — Portfolio Admin" }, { name: "robots", content: "noindex, nofollow" }] }),
  component: () => (
    <>
      <PageHeader title="About" sub="Heading, description, counters and CV button." />
      <SingletonForm table="about" title="About" fields={aboutFields} />
    </>
  ),
});
