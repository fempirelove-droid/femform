import { useEffect, useState } from 'react';
import type { NavigateFn } from '@/types';
import { fetchCategories } from '@/lib/data';
import type { Category } from '@/lib/types';
import { useSEO } from '@/hooks/useSEO';
import { EyebrowChip, GlassPanel, SectionHeading } from '@/components/ui';
import { useAnimeReveal } from '@/hooks/useAnimeReveal';

type Props = { navigate: NavigateFn };

export function ExplorePage({ navigate }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const ref = useAnimeReveal<HTMLElement>({ staggerMs: 55 });

  useSEO({
    title: 'Explore topics · Fempire.Love',
    description:
      'Browse hormones, the change, motherhood, mind & wellness, body wisdom and more: honest topics for women of the Caribbean and beyond.',
    canonical: '/explore',
  });

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .finally(() => setLoading(false));
  }, []);

  return (
    <main ref={ref} className="reveal-ready">
      <section className="max-w-site mx-auto px-[22px] pt-[60px] pb-10">
        <EyebrowChip className="mb-5" data-reveal>
          The Circle
        </EyebrowChip>
        <h1
          data-reveal
          className="font-display font-bold text-[clamp(34px,6vw,56px)] leading-[1.05] tracking-tight max-w-[700px] mb-4"
        >
          Explore every topic.
        </h1>
        <p data-reveal className="text-soft text-[16.5px] leading-[1.75] max-w-[540px]">
          One honest conversation, many doors in. Pick a theme and read at your own pace.
        </p>
      </section>

      <section className="max-w-site mx-auto px-[22px] pb-20">
        {loading ? (
          <p className="text-soft text-sm">Loading topics…</p>
        ) : categories.length === 0 ? (
          <GlassPanel data-reveal className="p-8 text-center">
            <SectionHeading
              align="center"
              className="mb-4"
              title="Topics are on their way"
              description="Categories will appear here once content is published in Supabase."
            />
          </GlassPanel>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
            {categories.map((theme) => (
              <GlassPanel
                key={theme.id}
                as="article"
                data-reveal
                className="p-6 transition-transform duration-250 hover:-translate-y-1 cursor-pointer"
                onClick={() => navigate(`/${theme.slug}`)}
              >
                <div
                  className="w-11 h-11 rounded-full mb-4"
                  style={{
                    background: theme.orb_gradient,
                    filter: 'blur(0.3px)',
                    boxShadow: `0 0 24px 2px ${theme.glow_color}`,
                  }}
                />
                <h2 className="font-display font-bold text-[17px] mb-2">{theme.name}</h2>
                <p className="text-[13px] text-soft leading-[1.6] m-0">{theme.description}</p>
              </GlassPanel>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
