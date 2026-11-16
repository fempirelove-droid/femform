/*
Topic chatrooms for Community / Premium members.
Rooms hub + posts scoped by room_id.
*/

CREATE TABLE IF NOT EXISTS public.community_rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  scene text,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

INSERT INTO public.community_rooms (slug, name, description, scene, sort_order) VALUES
  (
    'open-circle',
    'Open Circle',
    'Anything in the women''s realm. Soft talk, big questions, no taboo.',
    '/media/queen-crown-street.jpg',
    1
  ),
  (
    'hormones-cycle',
    'Queenerty · Hormones & Cycle',
    'Cycles, energy, Queenerty — the crown of yourself in your body.',
    '/media/queen-crown-magenta.jpg',
    2
  ),
  (
    'the-change',
    'The Change',
    'Perimenopause, menopause, and the first signs no one warned you about.',
    '/media/queen-crown-yellow.jpg',
    3
  ),
  (
    'motherhood',
    'Motherhood',
    'From pregnancy to mothering at a distance, without judgement.',
    '/media/queen-crown-portrait.jpg',
    4
  ),
  (
    'mind-wellness',
    'Mind & Wellness',
    'Burnout, anxiety, boundaries, and pragmatic peace.',
    '/media/nature-serenity.jpg',
    5
  ),
  (
    'body-wisdom',
    'Body Wisdom',
    'Food, sleep, heat, and movement from a Caribbean women''s perspective.',
    '/media/caribbean-peace.jpg',
    6
  )
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  scene = EXCLUDED.scene,
  sort_order = EXCLUDED.sort_order;

ALTER TABLE public.community_posts
  ADD COLUMN IF NOT EXISTS room_id uuid REFERENCES public.community_rooms(id) ON DELETE SET NULL;

UPDATE public.community_posts p
SET room_id = r.id
FROM public.community_rooms r
WHERE r.slug = 'open-circle'
  AND p.room_id IS NULL;

CREATE INDEX IF NOT EXISTS community_posts_room_created_idx
  ON public.community_posts (room_id, pinned DESC, created_at DESC);

ALTER TABLE public.community_rooms ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "members_read_rooms" ON public.community_rooms;
CREATE POLICY "members_read_rooms" ON public.community_rooms
  FOR SELECT TO authenticated
  USING (public.can_use_community());
