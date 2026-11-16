/*
Digital lessons for Community / Premium members.
Public can read title + summary teasers; full body requires can_use_community().
*/

CREATE TABLE IF NOT EXISTS public.lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  summary text NOT NULL DEFAULT '',
  body text NOT NULL DEFAULT '',
  topic_slug text,
  cover_image text,
  sort_order int NOT NULL DEFAULT 0,
  member_only boolean NOT NULL DEFAULT true,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

INSERT INTO public.lessons (slug, title, summary, body, topic_slug, cover_image, sort_order) VALUES
  (
    'what-is-queenerty',
    'What is Queenerty?',
    'A soft lesson on claiming the crown of yourself inside your cycle — not a medical lecture.',
    E'<h2>Start here</h2>\n<p>Queenerty is the name we give to that season of your cycle when your body asks you to stand a little taller — energy, clarity, and the quiet knowing that you do not need to shrink.</p>\n<p>This lesson is not a diagnosis. It is a map. Notice where you are in your cycle. Notice what softens when you stop fighting the wave.</p>\n<h2>Try this</h2>\n<p>For one week, write three words each evening: energy, mood, body. No judgement. Just data that belongs to you.</p>\n<p>When you are ready, bring what you noticed into the Queenerty room in the Circle.</p>',
    'hormones-cycle',
    '/media/queen-crown-magenta.jpg',
    1
  ),
  (
    'boundaries-without-apology',
    'Boundaries without apology',
    'A short practice for saying no in a Caribbean voice — soft, clear, and rooted.',
    E'<h2>The honest no</h2>\n<p>A boundary is not a wall against love. It is a door with a handle you choose to use.</p>\n<p>Practice one sentence this week: “I cannot take that on right now.” Say it once out loud when you are alone. Then use it when you need it.</p>\n<h2>After the no</h2>\n<p>Guilt is not proof you were wrong. Sit with it for ten minutes. Then return to your body — breath, water, a walk if you can.</p>',
    'mind-wellness',
    '/media/nature-serenity.jpg',
    2
  ),
  (
    'heat-sleep-and-you',
    'Heat, sleep, and you',
    'How Caribbean heat can change the story of your nights — and what to try gently.',
    E'<h2>The night shift</h2>\n<p>Heat is not a character flaw. In a warm climate, sleep and hormones talk to each other differently.</p>\n<p>Try one change for five nights: cooler sheets, a fan pointed away from your face, or a short cool rinse before bed. Track what shifts.</p>\n<h2>Bring it to the room</h2>\n<p>Share what worked (or did not) in Body Wisdom. Someone else in the Circle has been there too.</p>',
    'body-wisdom',
    '/media/caribbean-peace.jpg',
    3
  )
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  summary = EXCLUDED.summary,
  body = EXCLUDED.body,
  topic_slug = EXCLUDED.topic_slug,
  cover_image = EXCLUDED.cover_image,
  sort_order = EXCLUDED.sort_order,
  published = true;

CREATE INDEX IF NOT EXISTS lessons_sort_idx ON public.lessons (published DESC, sort_order ASC, created_at DESC);

ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;

-- Anyone can read published lessons (app hides body for non-members).
-- Client INSERT/UPDATE/DELETE denied by absence of write policies; service role seeds.
DROP POLICY IF EXISTS "public_read_published_lessons" ON public.lessons;
CREATE POLICY "public_read_published_lessons" ON public.lessons
  FOR SELECT
  USING (published = true);
