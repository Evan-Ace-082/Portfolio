import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SingletonForm } from "@/components/admin/managers";
import { settingsFields } from "@/lib/admin-schema";

export const Route = createFileRoute("/admin/_panel/settings")({
  head: () => ({ meta: [{ title: "Website Settings — Portfolio Admin" }, { name: "robots", content: "noindex, nofollow" }] }),
  component: () => (
    <>
      <PageHeader title="Website Settings" sub="Branding, footer and contact details." />
      <SingletonForm table="site_settings" title="Settings" fields={settingsFields} />
    </>
  ),
});
