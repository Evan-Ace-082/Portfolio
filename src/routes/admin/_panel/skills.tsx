import { createFileRoute } from "@tanstack/react-router";
import { CollectionManager, PageHeader } from "@/components/admin/managers";
import { skillCategoryFields, skillFields } from "@/lib/admin-schema";
import { useCollection } from "@/lib/cms";
import type { Field } from "@/components/admin/fields";

export const Route = createFileRoute("/admin/_panel/skills")({
  head: () => ({ meta: [{ title: "Skills — Portfolio Admin" }, { name: "robots", content: "noindex, nofollow" }] }),
  component: SkillsPage,
});

function SkillsPage() {
  const cats = useCollection("skill_categories");
  const fields: Field[] = [
    ...skillFields,
    {
      key: "category_id",
      label: "Category",
      type: "select",
      options: [{ value: "", label: "— none —" }, ...(cats.data ?? []).map((c) => ({ value: String(c.id), label: String(c.name) }))],
    },
  ];
  return (
    <>
      <PageHeader title="Skills" sub="Skill groups and animated proficiency bars." />
      <div className="space-y-10">
        <section>
          <h2 className="mb-4 font-display text-lg font-bold text-white/80">Categories</h2>
          <CollectionManager table="skill_categories" title="Categories" fields={skillCategoryFields} labelKey="name" />
        </section>
        <section>
          <h2 className="mb-4 font-display text-lg font-bold text-white/80">Skills</h2>
          <CollectionManager table="skills" title="Skills" fields={fields} labelKey="name" />
        </section>
      </div>
    </>
  );
}
