import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SingletonForm } from "@/components/admin/managers";
import { seoFields } from "@/lib/admin-schema";

export const Route = createFileRoute("/admin/_panel/seo")({
  head: () => ({ meta: [{ title: "SEO — Portfolio Admin" }, { name: "robots", content: "noindex, nofollow" }] }),
  component: () => (
    <>
      <PageHeader title="SEO" sub="Meta tags, social cards and analytics." />
      <SingletonForm table="site_settings" title="SEO" fields={seoFields} />
    </>
  ),
});
