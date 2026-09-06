import { createFileRoute } from "@tanstack/react-router";
import { CollectionManager, PageHeader } from "@/components/admin/managers";
import { testimonialFields } from "@/lib/admin-schema";

export const Route = createFileRoute("/admin/_panel/testimonials")({
  head: () => ({ meta: [{ title: "Testimonials — Portfolio Admin" }, { name: "robots", content: "noindex, nofollow" }] }),
  component: () => (
    <>
      <PageHeader title="Testimonials" sub="Client and peer reviews." />
      <CollectionManager table="testimonials" title="Testimonials" fields={testimonialFields} labelKey="name" imageKey="photo_url" />
    </>
  ),
});
