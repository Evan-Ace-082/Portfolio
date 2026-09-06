REVOKE SELECT ON public.profile FROM anon;

GRANT SELECT (
  id, avatar_url, cover_url, full_name, title, typing_texts,
  short_bio, long_bio, career_objective, nationality, location,
  phone, email, linkedin, github, facebook, instagram, twitter,
  portfolio_url, created_at, updated_at
) ON public.profile TO anon;