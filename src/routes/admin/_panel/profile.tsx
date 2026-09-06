import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SingletonForm } from "@/components/admin/managers";
import { profileFields } from "@/lib/admin-schema";

export const Route = createFileRoute("/admin/_panel/profile")({
  head: () => ({ meta: [{ title: "Profile — Portfolio Admin" }, { name: "robots", content: "noindex, nofollow" }] }),
  component: () => (
    <>
      <PageHeader title="Profile" sub="Your identity across the hero, about and contact sections." />
      <SingletonForm table="profile" title="Profile" fields={profileFields} />
    </>
  ),
});
