import { useEffect, useState } from 'react';
import { ArrowRight, Lock } from 'lucide-react';
import type { NavigateFn } from '@/types';
import { useSEO } from '@/hooks/useSEO';
import { useAuth } from '@/hooks/useAuth';
import { useAnimeReveal } from '@/hooks/useAnimeReveal';
import { Button, EyebrowChip, GlassPanel } from '@/components/ui';
import { fetchLessons, type Lesson } from '@/lib/lessons';
import { MEDIA } from '@/lib/media';

type Props = { navigate: NavigateFn };

export function LessonsPage({ navigate }: Props) {
  const ref = useAnimeReveal<HTMLElement>({ staggerMs: 60 });
  const { canUseCommunity, loading: authLoading } = useAuth();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  useSEO({
    title: 'Digital lessons · Fempire.Love',
    description:
      'Short, warm digital lessons for women in the Circle — Queenerty, boundaries, body wisdom, and more.',
    canonical: '/lessons',
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const list = await fetchLessons();
      if (!cancelled) {
        setLessons(list);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main ref={ref} className="reveal-ready pb-20">
      <section className="relative overflow-hidden pt-[60px] pb-10 text-center">
        <div className="page-hero-wash" aria-hidden />
        <div className="relative z-[1] max-w-site mx-auto px-[22px]">
          <EyebrowChip className="mb-5" data-reveal>
            Digital lessons
          </EyebrowChip>
          <h1
            data-reveal
            className="font-display font-bold text-[clamp(34px,6vw,52px)] leading-[1.05] tracking-tight max-w-[700px] mx-auto mb-4"
          >
            Short lessons. Soft maps. Real life.
          </h1>
          <p data-reveal className="text-soft text-[16.5px] leading-[1.75] max-w-[520px] mx-auto m-0">
            Structured moments for the women’s realm — not a feed, not a lecture. Community and
            Premium unlock the full lesson.
          </p>
        </div>
      </section>

      <section className="max-w-site mx-auto px-[22px]">
        {loading || authLoading ? (
          <p className="text-soft text-sm">Loading lessons…</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {lessons.map((lesson) => {
              const locked = lesson.member_only && !canUseCommunity;
              return (
                <GlassPanel
                  key={lesson.id}
                  data-reveal
                  as="article"
                  className="p-0 overflow-hidden flex flex-col cursor-pointer transition-transform duration-250 hover:-translate-y-1"
                  onClick={() => navigate(`/lessons/${lesson.slug}`)}
                >
                  <div className="relative h-[140px]">
                    <img
                      src={lesson.cover_image || MEDIA.queenCrownMagenta}
                      alt=""
                      aria-hidden
                      className="absolute inset-0 w-full h-full object-cover scene-ken"
                      loading="lazy"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(36,16,25,0.05), rgba(36,16,25,0.45))',
                      }}
                    />
                    {locked && (
                      <span className="absolute top-3 right-3 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full"
                        style={{
                          background: 'rgba(96,23,51,0.75)',
                          border: '1px solid rgba(255,158,187,0.35)',
                          color: 'var(--blush)',
                        }}
                      >
                        <Lock size={12} /> Members
                      </span>
                    )}
                  </div>
                  <div className="p-6 flex flex-col gap-3 flex-1">
                    <h2 className="font-display font-bold text-[19px] m-0 leading-[1.25]">
                      {lesson.title}
                    </h2>
                    <p className="text-soft text-sm leading-[1.65] m-0 flex-1">{lesson.summary}</p>
                    <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-cream">
                      {locked ? 'Join to read' : 'Open lesson'} <ArrowRight size={14} />
                    </span>
                  </div>
                </GlassPanel>
              );
            })}
          </div>
        )}

        {!canUseCommunity && !authLoading && (
          <GlassPanel data-reveal className="p-8 sm:p-10 mt-10 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-xl mb-2">Want the full lessons?</h3>
              <p className="text-soft text-sm leading-[1.7] m-0 max-w-[440px]">
                Community and Premium unlock digital lessons, member rooms, and webinar replays.
              </p>
            </div>
            <Button onClick={() => navigate('/community#join')}>Join the Circle</Button>
          </GlassPanel>
        )}
      </section>
    </main>
  );
}
