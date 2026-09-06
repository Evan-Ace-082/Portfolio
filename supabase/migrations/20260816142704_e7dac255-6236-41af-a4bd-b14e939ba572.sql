ALTER TABLE public.achievements
  ADD COLUMN IF NOT EXISTS organization TEXT,
  ADD COLUMN IF NOT EXISTS credential_url TEXT;

CREATE TABLE IF NOT EXISTS public.hobbies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  icon TEXT,
  description TEXT,
  image_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.hobbies TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.hobbies TO authenticated;
GRANT ALL ON public.hobbies TO service_role;

ALTER TABLE public.hobbies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Hobbies are publicly readable" ON public.hobbies FOR SELECT USING (true);
CREATE POLICY "Admins manage hobbies" ON public.hobbies FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

INSERT INTO public.hobbies (title, icon, description, display_order)
VALUES ('Gaming', '🎮', 'I enjoy playing games in my free time as a way to relax, have fun, and develop strategic thinking and problem-solving skills.', 1);