import { useEffect, useState } from 'react';
import { ArrowLeft, Lock } from 'lucide-react';
import type { NavigateFn } from '@/types';
import { useSEO } from '@/hooks/useSEO';
import { useAuth } from '@/hooks/useAuth';
import { Button, EyebrowChip, GlassPanel } from '@/components/ui';
import { fetchLessonBySlug, type Lesson } from '@/lib/lessons';
import { MEDIA } from '@/lib/media';

type Props = { navigate: NavigateFn; slug: string };

export function LessonDetailPage({ navigate, slug }: Props) {
  const { canUseCommunity, loading: authLoading } = useAuth();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);

  useSEO({
    title: lesson ? `${lesson.title} · Lessons · Fempire.Love` : 'Lesson · Fempire.Love',
    description: lesson?.summary,
    canonical: `/lessons/${slug}`,
    image: lesson?.cover_image
      ? `https://fempire.love${lesson.cover_image}`
      : `https://fempire.love${MEDIA.queenCrownMagenta}`,
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const row = await fetchLessonBySlug(slug);
      if (!cancelled) {
        setLesson(row);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading || authLoading) {
    return (
      <main className="min-h-[50vh] flex items-center justify-center">
        <p className="text-soft text-sm">Loading…</p>
      </main>
    );
  }

  if (!lesson) {
    return (
      <main className="min-h-[50vh] flex flex-col items-center justify-center gap-4 px-[22px]">
        <h1 className="font-display font-bold text-2xl">Lesson not found</h1>
        <Button variant="glass" size="small" onClick={() => navigate('/lessons')}>
          Back to lessons
        </Button>
      </main>
    );
  }

  const locked = lesson.member_only && !canUseCommunity;

  return (
    <main className="pb-20">
      <section className="max-w-[760px] mx-auto px-[22px] pt-[50px]">
        <button
          type="button"
          className="inline-flex items-center gap-2 text-soft text-sm mb-6 hover:text-cream bg-transparent border-0 p-0 cursor-pointer"
          onClick={() => navigate('/lessons')}
        >
          <ArrowLeft size={16} /> All lessons
        </button>

        <div
          className="relative overflow-hidden rounded-[22px] mb-8"
          style={{ border: '1px solid var(--glass-b)' }}
        >
          <div className="relative h-[180px] sm:h-[220px]">
            <img
              src={lesson.cover_image || MEDIA.queenCrownMagenta}
              alt=""
              aria-hidden
              className="absolute inset-0 w-full h-full object-cover scene-ken"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(36,16,25,0.15) 0%, rgba(96,23,51,0.7) 100%)',
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <EyebrowChip className="mb-3">Digital lesson</EyebrowChip>
              <h1 className="font-display font-bold text-[clamp(26px,4.5vw,40px)] leading-[1.1] m-0">
                {lesson.title}
              </h1>
            </div>
          </div>
        </div>

        <p className="text-soft text-[16.5px] leading-[1.75] mb-8">{lesson.summary}</p>

        {locked ? (
          <GlassPanel className="p-8 text-center">
            <Lock className="mx-auto mb-3 text-bougain" size={28} />
            <h2 className="font-display font-bold text-xl mb-2">This lesson is for members</h2>
            <p className="text-soft text-sm leading-[1.7] max-w-[420px] mx-auto mb-5">
              Join Community or Premium to read the full lesson and enter the member rooms.
            </p>
            <div className="flex flex-wrap gap-2.5 justify-center">
              <Button onClick={() => navigate('/community#join')}>Join the Circle</Button>
              <Button variant="glass" onClick={() => navigate('/account?next=/lessons/' + slug)}>
                Sign in
              </Button>
            </div>
          </GlassPanel>
        ) : (
          <GlassPanel className="p-7 sm:p-9">
            <div
              className="text-soft text-[16px] leading-[1.85] article-body"
              dangerouslySetInnerHTML={{ __html: lesson.body }}
            />
            <div className="mt-8 pt-6 flex flex-wrap gap-2.5" style={{ borderTop: '1px solid var(--glass-b)' }}>
              <Button variant="glass" size="small" onClick={() => navigate('/community')}>
                Talk in the rooms
              </Button>
              {lesson.topic_slug && (
                <Button
                  variant="glass"
                  size="small"
                  onClick={() => navigate(`/community?room=${lesson.topic_slug}`)}
                >
                  Open related room
                </Button>
              )}
            </div>
          </GlassPanel>
        )}
      </section>
    </main>
  );
}
