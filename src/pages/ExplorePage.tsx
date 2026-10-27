import { useEffect, useState } from 'react';
import { ArrowRight, BookOpen, CalendarHeart, Gift, HeartHandshake } from 'lucide-react';
import type { NavigateFn } from '@/types';
import { fetchAllArticles, fetchCategories } from '@/lib/data';
import { mergeTopics } from '@/lib/catalog';
import { FREE_GUIDE_URL } from '@/lib/segments';
import { MEDIA } from '@/lib/media';
import { isSupabaseConfigured } from '@/lib/supabase';
import type { Article, Category } from '@/lib/types';
import { useSEO } from '@/hooks/useSEO';
import { Button, GlassPanel, SectionHeading, VoiceCard } from '@/components/ui';
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
];

const careKit = [
  {
    title: 'Free cycle diary',
    text: 'A printable guide to track mood, energy, sleep and symptoms. Yours to keep, no signup wall.',
    cta: 'Get the diary',
    href: FREE_GUIDE_URL,
    icon: Gift,
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
      'Explore topics, articles, webinars, community and free care-kit gifts for women across Curaçao, the Caribbean and the diaspora.',
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

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main ref={ref} className="reveal-ready">
      <section className="relative overflow-hidden pt-[64px] pb-16">
        <div className="page-hero-wash" aria-hidden />
        <div className="relative z-[1] max-w-site mx-auto px-[22px]">
          <div data-reveal className="relative mx-auto w-full max-w-[560px]">
            <VoiceCard
              className="voice-bloom relative z-[2] !max-w-none w-full p-8 sm:p-10 [&_p.font-display]:text-[clamp(22px,4vw,30px)] [&_p.font-display]:leading-[1.25]"
              tilt={-2.5}
              float={false}
              quote={
                <>
                  More than topics.{' '}
                  <span className="grad-text">A whole way in.</span>
                </>
              }
              caption="Start wherever your body is asking."
            >
              <p className="text-soft text-[15px] leading-[1.8] m-0 mt-4">
                <button
                  type="button"
                  className="explore-jump"
                  style={{ animationDelay: '0s' }}
                  onClick={() => scrollTo('latest-reads')}
                >
                  Articles
                </button>
                {', '}
                <button
                  type="button"
                  className="explore-jump"
                  style={{ animationDelay: '0.45s' }}
                  onClick={() => scrollTo('doors')}
                >
                  live rooms
                </button>
                {', the '}
                <button
                  type="button"
                  className="explore-jump"
                  style={{ animationDelay: '0.9s' }}
                  onClick={() => scrollTo('circle-cta')}
                >
                  member Circle
                </button>
                {', a '}
                <button
                  type="button"
                  className="explore-jump"
                  style={{ animationDelay: '1.35s' }}
                  onClick={() => scrollTo('care-kit')}
                >
                  free care kit
                </button>
                {', or a '}
                <button
                  type="button"
                  className="explore-jump"
                  style={{ animationDelay: '1.8s' }}
                  onClick={() => scrollTo('themes')}
                >
                  topic
                </button>
                {' that fits tonight.'}
              </p>
            </VoiceCard>
            <GlassPanel
              className="absolute -bottom-3 right-2 sm:right-6 z-[1] max-w-[200px] p-4 animate-float"
              style={{ transform: 'rotate(4deg)', animationDelay: '1s' }}
            >
              <p className="font-display text-[13px] font-semibold m-0">Pick a door. Go.</p>
            </GlassPanel>
          </div>
        </div>
      </section>

      <section id="doors" className="max-w-site mx-auto px-[22px] pb-16 scroll-mt-28">
        <div data-reveal>
          <SectionHeading
            eyebrow="Start here"
            title="Three doors, one home."
            description="Pick the format that fits this moment."
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
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
                  <Button
                    size="small"
                    variant="glass"
                    className="inline-flex items-center gap-2 w-fit"
                    onClick={() => {
                      if (item.action === 'articles') scrollTo('latest-reads');
                      else if (item.route) navigate(item.route);
                    }}
                  >
                    {item.cta} <ArrowRight size={14} />
                  </Button>
                </div>
              </GlassPanel>
            );
          })}
        </div>
      </section>

      <section id="care-kit" className="max-w-site mx-auto px-[22px] pb-16 scroll-mt-28">
        <div data-reveal>
          <SectionHeading
            eyebrow="Care kit"
            title="Free gifts that stay with you."
            description="Soft tools for real life. Take one home, no pressure."
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-3.5 items-stretch">
          {careKit.map((item) => {
            const Icon = item.icon;
            return (
              <GlassPanel key={item.title} data-reveal className="p-0 overflow-hidden flex flex-col sm:flex-row">
                <div className="relative h-[140px] sm:h-auto sm:w-[42%] sm:min-h-[180px] shrink-0">
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
                        'linear-gradient(180deg, rgba(36,16,25,0.05), rgba(36,16,25,0.4))',
                    }}
                  />
                  <span
                    className="absolute bottom-3 left-4 w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      background: 'rgba(227,181,100,0.28)',
                      border: '1px solid rgba(227,181,100,0.5)',
                    }}
                  >
                    <Icon size={18} className="text-mustard-hi" />
                  </span>
                </div>
                <div className="p-6 sm:p-7 flex flex-col gap-3 flex-1 justify-center">
                  <h3 className="font-display font-bold text-lg m-0">{item.title}</h3>
                  <p className="text-soft text-sm leading-[1.65] m-0 flex-1">{item.text}</p>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-glass small inline-flex items-center gap-2 no-underline w-fit"
                  >
                    {item.cta} <ArrowRight size={14} />
                  </a>
                </div>
              </GlassPanel>
            );
          })}
          <div data-reveal className="flex items-center justify-center lg:justify-start p-2">
            <VoiceCard
              quote="Keep this close. A small ritual for the nights you need an honest map."
              caption="From the Care kit, with love."
              tilt={2}
            />
          </div>
        </div>
      </section>

      <section id="themes" className="max-w-site mx-auto px-[22px] pb-16 scroll-mt-28">
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
          <p className="text-soft text-sm">Loading topics?</p>
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
            <Button size="small" variant="glass" onClick={() => navigate('/community#join')}>
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

      <section id="circle-cta" className="max-w-site mx-auto px-[22px] pb-20 scroll-mt-28">
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
            <Button onClick={() => navigate('/community#join')}>Join the Circle</Button>
            <Button variant="glass" onClick={() => navigate('/coach')}>
              Meet the coach
            </Button>
          </div>
        </GlassPanel>
      </section>
    </main>
  );
}
