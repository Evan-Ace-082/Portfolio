ALTER TABLE public.hobbies
  ADD COLUMN IF NOT EXISTS is_enabled boolean NOT NULL DEFAULT true;

ALTER TABLE public.achievements
  ADD COLUMN IF NOT EXISTS category text NOT NULL DEFAULT 'Leadership',
  ADD COLUMN IF NOT EXISTS role text,
  ADD COLUMN IF NOT EXISTS event text,
  ADD COLUMN IF NOT EXISTS is_enabled boolean NOT NULL DEFAULT true;