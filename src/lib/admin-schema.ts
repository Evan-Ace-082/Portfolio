import type { Field } from "@/components/admin/fields";

export const profileFields: Field[] = [
  { key: "avatar_url", label: "Profile Picture", type: "image", folder: "profile" },
  { key: "cover_url", label: "Cover Image", type: "image", folder: "profile" },
  { key: "full_name", label: "Full Name" },
  { key: "title", label: "Professional Title" },
  { key: "typing_texts", label: "Typing Texts", type: "array", full: true, help: "Comma separated — used by the hero typewriter." },
  { key: "short_bio", label: "Short Bio", type: "textarea", full: true },
  { key: "long_bio", label: "Long Bio", type: "textarea", full: true },
  { key: "career_objective", label: "Career Objective", type: "textarea", full: true },
  { key: "birthday", label: "Birthday" },
  { key: "nationality", label: "Nationality" },
  { key: "location", label: "Location" },
  { key: "phone", label: "Phone" },
  { key: "email", label: "Email" },
  { key: "linkedin", label: "LinkedIn" },
  { key: "github", label: "GitHub" },
  { key: "facebook", label: "Facebook" },
  { key: "instagram", label: "Instagram" },
  { key: "twitter", label: "Twitter" },
  { key: "portfolio_url", label: "Website" },
];

export const aboutFields: Field[] = [
  { key: "heading", label: "Heading" },
  { key: "resume_button_label", label: "Resume Button Label" },
  { key: "description", label: "Description", type: "textarea", full: true },
  { key: "stat1_value", label: "Counter 1 Value" },
  { key: "stat1_label", label: "Counter 1 Label" },
  { key: "stat2_value", label: "Counter 2 Value" },
  { key: "stat2_label", label: "Counter 2 Label" },
  { key: "stat3_value", label: "Counter 3 Value" },
  { key: "stat3_label", label: "Counter 3 Label" },
  { key: "stat4_value", label: "Counter 4 Value" },
  { key: "stat4_label", label: "Counter 4 Label" },
  { key: "resume_url", label: "Resume / CV file", type: "file", folder: "resume", full: true },
];

export const educationFields: Field[] = [
  { key: "institution", label: "University / Institution" },
  { key: "department", label: "Department" },
  { key: "degree", label: "Degree" },
  { key: "program", label: "Program" },
  { key: "cgpa", label: "CGPA" },
  { key: "current_semester", label: "Current Semester" },
  { key: "start_year", label: "Start Date" },
  { key: "end_year", label: "End Date" },
  { key: "is_current", label: "Currently studying here", type: "boolean" },
  { key: "display_order", label: "Display Order", type: "number" },
  { key: "description", label: "Description", type: "textarea", full: true },
  { key: "logo_url", label: "University Logo", type: "image", folder: "education", full: true },
];

export const experienceFields: Field[] = [
  { key: "company", label: "Company" },
  { key: "position", label: "Position" },
  { key: "employment_type", label: "Employment Type" },
  { key: "location", label: "Location" },
  { key: "start_date", label: "Start Date" },
  { key: "end_date", label: "End Date" },
  { key: "is_current", label: "Currently working here", type: "boolean" },
  { key: "display_order", label: "Display Order", type: "number" },
  { key: "description", label: "Description", type: "textarea", full: true },
  { key: "logo_url", label: "Company Logo", type: "image", folder: "experience", full: true },
];

export const projectFields: Field[] = [
  { key: "thumbnail_url", label: "Project Thumbnail", type: "image", folder: "projects" },
  { key: "images", label: "Additional Images", type: "array", help: "Comma separated paths or URLs" },
  { key: "title", label: "Project Title" },
  { key: "slug", label: "Slug" },
  { key: "short_description", label: "Short Description", type: "textarea", full: true },
  { key: "long_description", label: "Long Description", type: "richtext", full: true },
  { key: "tech_stack", label: "Technology Stack", type: "array", full: true },
  { key: "github_url", label: "GitHub URL" },
  { key: "live_url", label: "Live Demo URL" },
  { key: "video_url", label: "Video Demo URL" },
  {
    key: "status",
    label: "Project Status",
    type: "select",
    options: [
      { value: "published", label: "Published" },
      { value: "draft", label: "Draft (hidden)" },
      { value: "archived", label: "Archived" },
    ],
  },
  { key: "category", label: "Category" },
  { key: "tags", label: "Tags", type: "array" },
  { key: "completion_date", label: "Completion Date" },
  { key: "display_order", label: "Display Order", type: "number" },
  { key: "is_featured", label: "Featured project", type: "boolean" },
  { key: "challenges", label: "Challenges", type: "textarea", full: true },
  { key: "solutions", label: "Solutions", type: "textarea", full: true },
  { key: "features", label: "Key Features", type: "array", full: true },
  { key: "seo_title", label: "SEO Title" },
  { key: "seo_description", label: "SEO Description" },
];

export const skillFields: Field[] = [
  { key: "name", label: "Skill Name" },
  { key: "percentage", label: "Percentage", type: "number" },
  { key: "icon", label: "Icon" },
  { key: "color", label: "Color", type: "color" },
  { key: "display_order", label: "Display Order", type: "number" },
];

export const skillCategoryFields: Field[] = [
  { key: "name", label: "Category Name" },
  { key: "icon", label: "Icon" },
  { key: "display_order", label: "Display Order", type: "number" },
];

export const serviceFields: Field[] = [
  { key: "icon", label: "Icon (emoji)" },
  { key: "title", label: "Title" },
  { key: "display_order", label: "Display Order", type: "number" },
  { key: "description", label: "Description", type: "textarea", full: true },
];

export const certificateFields: Field[] = [
  { key: "name", label: "Title" },
  { key: "organization", label: "Organization" },
  { key: "issue_date", label: "Issue Date" },
  { key: "expiry_date", label: "Expiry Date" },
  { key: "credential_id", label: "Credential ID" },
  { key: "credential_url", label: "Credential URL" },
  { key: "display_order", label: "Display Order", type: "number" },
  { key: "image_url", label: "Certificate Image", type: "image", folder: "certificates" },
  { key: "pdf_url", label: "Certificate PDF", type: "file", folder: "certificates" },
];

export const achievementFields: Field[] = [
  { key: "title", label: "Title" },
  {
    key: "category",
    label: "Category",
    type: "select",
    options: [
      { value: "Leadership", label: "Leadership" },
      { value: "Leadership / Coordination", label: "Leadership / Coordination" },
      { value: "Organizational", label: "Organizational" },
      { value: "Technical Event", label: "Technical Event" },
      { value: "Programming / Competition", label: "Programming / Competition" },
      { value: "Extracurricular", label: "Extracurricular" },
    ],
  },
  { key: "organization", label: "Organization" },
  { key: "role", label: "Role" },
  { key: "event", label: "Event" },
  { key: "date", label: "Date" },
  { key: "credential_url", label: "Credential Link" },
  { key: "display_order", label: "Display Order", type: "number" },
  { key: "is_enabled", label: "Visible on portfolio", type: "boolean" },
  { key: "description", label: "Description", type: "textarea", full: true },
  { key: "image_url", label: "Image / Certificate", type: "image", folder: "achievements", full: true },
];

export const galleryFields: Field[] = [
  { key: "title", label: "Title" },
  { key: "album", label: "Album" },
  { key: "category", label: "Category" },
  { key: "display_order", label: "Display Order", type: "number" },
  { key: "image_url", label: "Image", type: "image", folder: "gallery", full: true },
];

export const blogFields: Field[] = [
  { key: "title", label: "Title" },
  { key: "slug", label: "Slug" },
  { key: "category", label: "Category" },
  { key: "author", label: "Author" },
  { key: "publish_date", label: "Publish Date" },
  {
    key: "status",
    label: "Status",
    type: "select",
    options: [
      { value: "draft", label: "Draft" },
      { value: "published", label: "Published" },
    ],
  },
  { key: "is_featured", label: "Featured post", type: "boolean" },
  { key: "tags", label: "Tags", type: "array" },
  { key: "featured_image", label: "Featured Image", type: "image", folder: "blog", full: true },
  { key: "excerpt", label: "Excerpt", type: "textarea", full: true },
  { key: "content", label: "Content", type: "richtext", full: true },
  { key: "seo_title", label: "SEO Title" },
  { key: "seo_description", label: "SEO Description" },
];

export const testimonialFields: Field[] = [
  { key: "name", label: "Name" },
  { key: "designation", label: "Position" },
  { key: "company", label: "Company" },
  { key: "rating", label: "Rating (1-5)", type: "number" },
  { key: "display_order", label: "Display Order", type: "number" },
  { key: "photo_url", label: "Photo", type: "image", folder: "testimonials" },
  { key: "review", label: "Review", type: "textarea", full: true },
];

export const seoFields: Field[] = [
  { key: "meta_title", label: "Meta Title" },
  { key: "meta_description", label: "Meta Description" },
  { key: "keywords", label: "Keywords", full: true },
  { key: "og_image", label: "Open Graph Image", type: "image", folder: "seo" },
  { key: "favicon_url", label: "Favicon", type: "image", folder: "seo" },
  {
    key: "twitter_card",
    label: "Twitter Card",
    type: "select",
    options: [
      { value: "summary_large_image", label: "summary_large_image" },
      { value: "summary", label: "summary" },
    ],
  },
  { key: "canonical_url", label: "Canonical URL" },
  { key: "google_analytics", label: "Google Analytics ID" },
  { key: "google_search_console", label: "Search Console Verification" },
  { key: "robots_txt", label: "robots.txt", type: "textarea", full: true },
  { key: "sitemap_url", label: "Sitemap URL", full: true },
];

export const settingsFields: Field[] = [
  { key: "website_name", label: "Website Name" },
  { key: "logo_url", label: "Website Logo", type: "image", folder: "settings" },
  { key: "accent_color", label: "Accent Color", type: "color" },
  {
    key: "theme",
    label: "Theme",
    type: "select",
    options: [
      { value: "dark", label: "Dark" },
      { value: "light", label: "Light" },
    ],
  },
  { key: "email", label: "Contact Email" },
  { key: "phone", label: "Phone" },
  { key: "address", label: "Address", full: true },
  { key: "footer_text", label: "Footer Text", type: "textarea", full: true },
  { key: "resume_url", label: "Resume PDF", type: "file", folder: "resume", full: true },
];

export const messageFields: Field[] = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "subject", label: "Subject" },
  {
    key: "status",
    label: "Status",
    type: "select",
    options: [
      { value: "unread", label: "Unread" },
      { value: "read", label: "Read" },
      { value: "replied", label: "Replied" },
    ],
  },
  { key: "message", label: "Message", type: "textarea", full: true },
];

export const hobbyFields: Field[] = [
  { key: "title", label: "Hobby" },
  { key: "icon", label: "Icon", help: "Use gamepad-2, compass, palette, camera, or an emoji." },
  { key: "display_order", label: "Display Order", type: "number" },
  { key: "is_enabled", label: "Visible on portfolio", type: "boolean" },
  { key: "description", label: "Description", type: "textarea", full: true },
  { key: "image_url", label: "Image", type: "image", folder: "hobbies", full: true },
];
