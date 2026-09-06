import { createFileRoute } from "@tanstack/react-router";
import { CollectionManager, PageHeader } from "@/components/admin/managers";
import { hobbyFields } from "@/lib/admin-schema";

export const Route = createFileRoute("/admin/_panel/hobbies")({
  head: () => ({ meta: [{ title: "Hobbies — Portfolio Admin" }, { name: "robots", content: "noindex, nofollow" }] }),
  component: () => (
    <>
      <PageHeader title="Hobbies & Interests" sub="Professional interests and activities shown on the portfolio." />
      <CollectionManager table="hobbies" title="Hobbies" fields={hobbyFields} labelKey="title" imageKey="image_url" />
    </>
  ),
});
