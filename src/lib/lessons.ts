import { MEDIA } from './media';
import { isSupabaseConfigured, supabase } from './supabase';

export type Lesson = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  body: string;
  topic_slug: string | null;
  cover_image: string | null;
  sort_order: number;
  member_only: boolean;
};

/** Local stubs when Supabase lessons are offline. */
export const LESSON_CATALOG: Lesson[] = [
  {
    id: 'local-queenerty',
    slug: 'what-is-queenerty',
    title: 'What is Queenerty?',
    summary:
      'A soft lesson on claiming the crown of yourself inside your cycle — not a medical lecture.',
    body: `<h2>Start here</h2>
<p>Queenerty is the name we give to that season of your cycle when your body asks you to stand a little taller — energy, clarity, and the quiet knowing that you do not need to shrink.</p>
<p>This lesson is not a diagnosis. It is a map. Notice where you are in your cycle. Notice what softens when you stop fighting the wave.</p>
<h2>Try this</h2>
<p>For one week, write three words each evening: energy, mood, body. No judgement. Just data that belongs to you.</p>
<p>When you are ready, bring what you noticed into the Queenerty room in the Circle.</p>`,
    topic_slug: 'hormones-cycle',
    cover_image: MEDIA.queenCrownMagenta,
    sort_order: 1,
    member_only: true,
  },
  {
    id: 'local-boundaries',
    slug: 'boundaries-without-apology',
    title: 'Boundaries without apology',
    summary:
      'A short practice for saying no in a Caribbean voice — soft, clear, and rooted.',
    body: `<h2>The honest no</h2>
<p>A boundary is not a wall against love. It is a door with a handle you choose to use.</p>
<p>Practice one sentence this week: “I cannot take that on right now.” Say it once out loud when you are alone. Then use it when you need it.</p>
<h2>After the no</h2>
<p>Guilt is not proof you were wrong. Sit with it for ten minutes. Then return to your body — breath, water, a walk if you can.</p>`,
    topic_slug: 'mind-wellness',
    cover_image: MEDIA.natureSerenity,
    sort_order: 2,
    member_only: true,
  },
  {
    id: 'local-heat-sleep',
    slug: 'heat-sleep-and-you',
    title: 'Heat, sleep, and you',
    summary: 'How Caribbean heat can change the story of your nights — and what to try gently.',
    body: `<h2>The night shift</h2>
<p>Heat is not a character flaw. In a warm climate, sleep and hormones talk to each other differently.</p>
<p>Try one change for five nights: cooler sheets, a fan pointed away from your face, or a short cool rinse before bed. Track what shifts.</p>
<h2>Bring it to the room</h2>
<p>Share what worked (or did not) in Body Wisdom. Someone else in the Circle has been there too.</p>`,
    topic_slug: 'body-wisdom',
    cover_image: MEDIA.caribbeanPeace,
    sort_order: 3,
    member_only: true,
  },
];

export async function fetchLessons(): Promise<Lesson[]> {
  if (!isSupabaseConfigured) return LESSON_CATALOG;

  const { data, error } = await supabase
    .from('lessons')
    .select('id, slug, title, summary, body, topic_slug, cover_image, sort_order, member_only')
    .eq('published', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('fetchLessons', error);
    return LESSON_CATALOG;
  }
  if (!data?.length) return LESSON_CATALOG;
  return data as Lesson[];
}

export async function fetchLessonBySlug(slug: string): Promise<Lesson | null> {
  if (!isSupabaseConfigured) {
    return LESSON_CATALOG.find((l) => l.slug === slug) || null;
  }

  const { data, error } = await supabase
    .from('lessons')
    .select('id, slug, title, summary, body, topic_slug, cover_image, sort_order, member_only')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle();

  if (error) {
    console.error('fetchLessonBySlug', error);
    return LESSON_CATALOG.find((l) => l.slug === slug) || null;
  }
  return (data as Lesson) || LESSON_CATALOG.find((l) => l.slug === slug) || null;
}
