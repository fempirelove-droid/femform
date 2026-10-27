import { useEffect, useState } from 'react';
import { ArrowRight, BookOpen, CalendarHeart, HeartHandshake, Sparkles } from 'lucide-react';
import type { NavigateFn } from '@/types';
import { fetchAllArticles, fetchCategories } from '@/lib/data';
import { mergeTopics } from '@/lib/catalog';
import { FREE_GUIDE_URL } from '@/lib/segments';
import { MEDIA } from '@/lib/media';
import { isSupabaseConfigured } from '@/lib/supabase';
import type { Article, Category } from '@/lib/types';
import { useSEO } from '@/hooks/useSEO';
import { Button, EyebrowChip, GlassPanel, SectionHeading } from '@/components/ui';
import { ArticleCover, TopicMotif } from '@/components/visuals';
import { useAnimeReveal } from '@/hooks/useAnimeReveal';

type Props = { navigate: NavigateFn };

const pathways = [
  {
    title: 'Read the Circle',
    text: 'Articles that answer the questions you Google at midnight.',
    cta: 'Latest reads',
    action: 'articles' as const,
    icon: BookOpen,
    scene: MEDIA.bougainvillea,
  },
  {
    title: 'Live webinars',
    text: 'Join live or buy a single ticket. Replays for members.',
    cta: 'Browse webinars',
    route: '/webinars',
    icon: CalendarHeart,
    scene: MEDIA.circleLight,
  },
  {
    title: 'Member community',
    text: 'The closed Circle on Fempire.Love. Ask, share, show up.',
    cta: 'Enter community',
    route: '/community',
    icon: HeartHandshake,
    scene: MEDIA.curacaoAerial,
  },
  {
    title: 'Free cycle diary',
    text: 'A printable guide to track mood, energy, sleep and symptoms.',
    cta: 'Open guide',
    href: FREE_GUIDE_URL,
    icon: Sparkles,
    scene: MEDIA.heroCoast,
  },
];

export function ExplorePage({ navigate }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const ref = useAnimeReveal<HTMLElement>({ staggerMs: 50 });

  useSEO({
    title: 'Explore · Fempire.Love',
    description:
      'Explore topics, articles, webinars, community and free guides for women across Curaçao, the Caribbean and the diaspora.',
    canonical: '/explore',
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setLoadError(null);
      try {
        if (!isSupabaseConfigured) {
          if (!cancelled) {
            setCategories(mergeTopics([]));
            setArticles([]);
            setLoadError('Live content feed is offline. Topics below are still open to browse.');
          }
          return;
        }
        const [cats, arts] = await Promise.all([fetchCategories(), fetchAllArticles()]);
        if (cancelled) return;
        setCategories(mergeTopics(cats));
        setArticles(arts.slice(0, 8));
        if (!cats.length) {
          setLoadError('Showing the topic map while the live catalog reconnects.');
        }
      } catch {
        if (!cancelled) {
          setCategories(mergeTopics([]));
          setLoadError('Could not reach the content library. Topic doors below still work.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const scrollToArticles = () => {
    document.getElementById('latest-reads')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main ref={ref} className="reveal-ready">
      <section className="max-w-site mx-auto px-[22px] pt-[60px] pb-10">
        <EyebrowChip className="mb-5" data-reveal>
          Explore
        </EyebrowChip>
        <h1
          data-reveal
          className="font-display font-bold text-[clamp(34px,6vw,56px)] leading-[1.05] tracking-tight max-w-[740px] mb-4"
        >
          More than topics. A whole way in.
        </h1>
        <p data-reveal className="text-soft text-[16.5px] leading-[1.75] max-w-[560px]">
          Articles, live rooms, the member Circle, free tools, and eight theme doors. Start wherever
          your body is asking.
        </p>
      </section>

      <section className="max-w-site mx-auto px-[22px] pb-16">
        <div data-reveal>
          <SectionHeading
            eyebrow="Start here"
            title="Four doors, one home."
            description="Pick the format that fits this moment."
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {pathways.map((item) => {
            const Icon = item.icon;
            return (
              <GlassPanel key={item.title} data-reveal className="p-0 overflow-hidden flex flex-col">
                <div className="relative h-[120px]">
                  <img
                    src={item.scene}
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
                  <span
                    className="absolute bottom-3 left-4 w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      background: 'rgba(255,92,138,0.28)',
                      border: '1px solid rgba(255,92,138,0.45)',
                    }}
                  >
                    <Icon size={18} className="text-bougain" />
                  </span>
                </div>
                <div className="p-6 sm:p-7 flex flex-col gap-3 flex-1">
                  <h3 className="font-display font-bold text-lg m-0">{item.title}</h3>
                  <p className="text-soft text-sm leading-[1.65] m-0 flex-1">{item.text}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-glass small inline-flex items-center gap-2 no-underline w-fit"
                    >
                      {item.cta} <ArrowRight size={14} />
                    </a>
                  ) : (
                    <Button
                      size="small"
                      variant="glass"
                      className="inline-flex items-center gap-2 w-fit"
                      onClick={() => {
                        if (item.action === 'articles') scrollToArticles();
                        else if (item.route) navigate(item.route);
                      }}
                    >
                      {item.cta} <ArrowRight size={14} />
                    </Button>
                  )}
                </div>
              </GlassPanel>
            );
          })}
        </div>
      </section>

      <section className="max-w-site mx-auto px-[22px] pb-16">
        <div data-reveal>
          <SectionHeading
            eyebrow="Themes"
            title="Eight topics, one honest conversation."
            description="Tap a theme to open its articles."
          />
        </div>
        {loadError && (
          <p data-reveal className="text-[13px] text-soft-2 mb-4">
            {loadError}
          </p>
        )}
        {loading && categories.length === 0 ? (
          <p className="text-soft text-sm">Loading topics…</p>
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
                  className="w-14 h-14 rounded-full mb-4 flex items-center justify-center"
                  style={{
                    background: theme.orb_gradient,
                    boxShadow: `0 0 24px 2px ${theme.glow_color}`,
                  }}
                >
                  <TopicMotif slug={theme.slug} size={40} />
                </div>
                <h2 className="font-display font-bold text-[17px] mb-2">{theme.name}</h2>
                <p className="text-[13px] text-soft leading-[1.6] m-0">{theme.description}</p>
              </GlassPanel>
            ))}
          </div>
        )}
      </section>

      <section id="latest-reads" className="max-w-site mx-auto px-[22px] pb-16 scroll-mt-28">
        <div data-reveal>
          <SectionHeading
            eyebrow="Fresh reads"
            title="Latest from the library."
            description="Question-led articles written for search, AI answers, and real life."
          />
        </div>
        {articles.length === 0 ? (
          <GlassPanel data-reveal className="p-7">
            <p className="text-soft text-sm m-0 mb-4">
              Articles will appear here as soon as the live library connects. Meanwhile open any
              theme above.
            </p>
            <Button size="small" variant="glass" onClick={() => navigate('/membership')}>
              Start free
            </Button>
          </GlassPanel>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {articles.map((article) => (
              <a
                key={article.id}
                data-reveal
                href={`/${article.category?.slug}/${article.slug}`}
                className="glass p-0 no-underline text-cream hover:-translate-y-1 transition-transform block overflow-hidden"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/${article.category?.slug}/${article.slug}`);
                }}
              >
                <ArticleCover
                  slug={article.category?.slug}
                  coverImage={article.cover_image}
                  title={article.title}
                  compact
                  className="rounded-none border-0"
                />
                <div className="p-6 pt-4">
                  <span
                    className="text-[11px] font-bold uppercase tracking-[0.06em]"
                    style={{ color: 'var(--bougain)' }}
                  >
                    {article.category?.name || 'Article'}
                  </span>
                  <h3 className="font-display font-bold text-[18px] mt-2.5 mb-2 leading-[1.3]">
                    {article.title}
                  </h3>
                  <p className="text-[13px] text-soft leading-[1.6] m-0 line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>

      <section className="max-w-site mx-auto px-[22px] pb-20">
        <GlassPanel
          data-reveal
          className="p-8 sm:p-10 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between"
        >
          <div>
            <h3 className="font-display font-bold text-xl mb-2">Want the full seat?</h3>
            <p className="text-soft text-sm leading-[1.7] m-0 max-w-[440px]">
              Community and Premium unlock the closed Circle, webinar replays, and coaching paths
              with With Love Academy.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <Button onClick={() => navigate('/membership')}>See membership</Button>
            <Button variant="glass" onClick={() => navigate('/coach')}>
              Meet the coach
            </Button>
          </div>
        </GlassPanel>
      </section>
    </main>
  );
}
