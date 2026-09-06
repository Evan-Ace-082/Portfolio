import { createFileRoute } from "@tanstack/react-router";
import { CollectionManager, PageHeader } from "@/components/admin/managers";
import { achievementFields } from "@/lib/admin-schema";

export const Route = createFileRoute("/admin/_panel/achievements")({
  head: () => ({ meta: [{ title: "Achievements — Portfolio Admin" }, { name: "robots", content: "noindex, nofollow" }] }),
  component: () => (
    <>
      <PageHeader title="Achievements & Leadership" sub="Leadership roles, organizational experience, technical events and activities." />
      <CollectionManager table="achievements" title="Achievements" fields={achievementFields} labelKey="title" imageKey="image_url" />
    </>
  ),
});
