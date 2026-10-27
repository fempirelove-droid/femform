import { useEffect, useState } from 'react';
import { Bloom } from '@/components/Bloom';
import { Button, EyebrowChip, GlassPanel, SectionHeading } from '@/components/ui';
import { NewsletterForm } from '@/components/NewsletterForm';
import { ArticleCover, TopicMotif } from '@/components/visuals';
import { useAnimeReveal } from '@/hooks/useAnimeReveal';
import { Clock, Lock, ArrowRight } from 'lucide-react';
import type { NavigateFn } from '@/types';
import { fetchCategories, fetchAllArticles } from '@/lib/data';
import { mergeTopics } from '@/lib/catalog';
import { MEDIA } from '@/lib/media';
import { MEMBERSHIP_TIERS } from '@/lib/plans';
import type { Category, Article } from '@/lib/types';
import { useSEO } from '@/hooks/useSEO';

type Props = { navigate: NavigateFn };

const forYouCards = [
  "You've googled a hormone question at midnight and closed twelve tabs, still unsure.",
  'You give everyone else the softest version of yourself and keep the sharp edges for you.',
  "You want a real answer, not a wellness account telling you to drink more water.",
  "You're far from home, and you miss content that actually sounds like where you're from.",
];

const tracks = [
  {
    tag: 'Curaçao',
    text: 'Workshops, sessions at the salon, and soon, a space of your own on the island. This is where you can show up in person, not just on a screen.',
    soft: 'When you are ready, we will gently introduce you to the salon: an invitation, never a hard sell.',
    glow: 'var(--bougain)',
  },
  {
    tag: 'The wider Caribbean',
    text: 'From the ABC islands to Jamaica, Trinidad, Barbados, Guyana, Suriname, Haiti, the Dominican Republic, and every shore in between. The full conversation, wherever home is in this region.',
    soft: 'Your journey stays fully digital, with a community that understands the Caribbean.',
    glow: 'var(--mustard)',
  },
  {
    tag: 'Far from home',
    text: "Netherlands, the US, or anywhere else you've landed: a way back to something that still knows where you're from.",
    soft: 'Identity, belonging, and coaching that bridges distance.',
    glow: 'var(--blush)',
  },
];

export function HomePage({ navigate }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);

  const heroRef = useAnimeReveal<HTMLDivElement>({ staggerMs: 90, y: 20, delay: 40 });
  const forYouRef = useAnimeReveal<HTMLElement>({ staggerMs: 80 });
  const tracksRef = useAnimeReveal<HTMLElement>({ staggerMs: 90 });
  const circleRef = useAnimeReveal<HTMLElement>({ staggerMs: 55 });
  const articlesRef = useAnimeReveal<HTMLElement>({ staggerMs: 70 });
  const tiersRef = useAnimeReveal<HTMLElement>({ staggerMs: 90 });
  const visionRef = useAnimeReveal<HTMLElement>({ y: 24 });

  useSEO({
    title: 'Fempire.Love · A digital home for women of the Caribbean & beyond',
    description:
      'Fempire.Love is a warm, modern digital home for women across Curaçao, the Caribbean and the diaspora: hormones, the change, motherhood, mind and body, without judgement.',
    canonical: '/',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Fempire.Love',
      description:
        'A digital home for women across the Caribbean and the diaspora: hormones, the change, motherhood, mind and body, without judgement.',
    },
  });

  useEffect(() => {
    fetchCategories().then((c) => setCategories(mergeTopics(c)));
    fetchAllArticles().then(setArticles);
  }, []);

  return (
    <main>
      {/* -mt pulls the hero under the sticky header so the top strip is the photo, not a bare band */}
      <section className="min-h-[94vh] flex items-center -mt-[4.75rem] pt-[calc(110px+4.75rem)] pb-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden>
          <img
            src={MEDIA.heroCoast}
            alt=""
            className="w-full h-full object-cover object-center scene-ken"
            style={{ opacity: 0.62 }}
            fetchPriority="high"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(105deg, rgba(36,16,25,0.38) 0%, rgba(96,23,51,0.18) 45%, rgba(158,19,69,0.12) 100%)',
              backdropFilter: 'blur(10px) saturate(130%)',
              WebkitBackdropFilter: 'blur(10px) saturate(130%)',
            }}
          />
        </div>

        <div className="max-w-site mx-auto px-[22px] w-full relative z-[1]">
          <div
            ref={heroRef}
            className="reveal-ready grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-11 items-center w-full"
          >
            <div>
              <EyebrowChip className="mb-5" data-reveal>
                Made for the Caribbean, open to the world
              </EyebrowChip>
              <h1
                data-reveal
                className="font-display font-bold text-[clamp(42px,9vw,92px)] leading-[0.98] tracking-tight"
              >
                Inside out,
                <br />
                <span className="grad-text">or outside in.</span>
              </h1>
              <p data-reveal className="text-soft text-[17.5px] leading-[1.75] max-w-[520px] mt-6 mb-[30px]">
                Change or repeat. The choice is always yours, my lovelies. A warm, modern home for the
                questions about your hormones, your cycle, your mind and your body, the ones you'd
                never ask out loud.
              </p>
              <div data-reveal className="flex flex-wrap gap-3.5 mb-7">
                <Button onClick={() => navigate('/community#join')}>Start free</Button>
                <Button variant="glass" onClick={() => navigate('/explore')}>
                  Explore topics
                </Button>
              </div>
              <div data-reveal className="flex flex-wrap gap-2.5">
                {['Honest answers, no taboo', 'Free to start, always', 'A community that gets it'].map(
                  (s) => (
                    <span
                      key={s}
                      className="glass px-[18px] py-2.5 rounded-full text-[12.5px] font-bold tracking-wide"
                    >
                      {s}
                    </span>
                  ),
                )}
              </div>
            </div>

            <div data-reveal className="relative lg:justify-self-end w-full">
              <div className="absolute -inset-10 flex items-center justify-center z-0 pointer-events-none opacity-90">
                <Bloom className="w-full max-w-[460px]" />
              </div>
              <div className="relative z-1 min-h-[280px] sm:min-h-[340px]">
                <GlassPanel
                  className="absolute top-0 right-0 z-2 max-w-[320px] p-6 animate-float"
                  style={{ transform: 'rotate(-3deg)' }}
                >
                  <p className="font-display font-semibold text-[19px] leading-[1.45] mb-2.5">
                    "This is more than a feed. It feels like coming home to yourself."
                  </p>
                  <span className="text-xs text-soft-2">Real talk, from women who've been there too.</span>
                </GlassPanel>
                <GlassPanel
                  className="absolute top-[120px] right-[60px] z-1 max-w-[220px] p-5 animate-float"
                  style={{ transform: 'rotate(4deg)', animationDelay: '1s' }}
                >
                  <p className="font-display text-[14px] font-semibold m-0">$0 to start</p>
                </GlassPanel>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-[22px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[11px] text-soft-2 tracking-[0.08em] uppercase z-[1]">
          <span>Scroll</span>
          <span
            className="block w-px h-[34px]"
            style={{ background: 'linear-gradient(var(--soft-2), transparent)' }}
          />
        </div>
      </section>

      <section ref={forYouRef} className="reveal-ready py-20">
        <div className="max-w-site mx-auto px-[22px]">
          <div data-reveal>
            <SectionHeading eyebrow="Is this you?" title={<>You&apos;ll feel at home here if&hellip;</>} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {forYouCards.map((text, i) => (
              <GlassPanel key={i} data-reveal className="flex gap-[18px] items-start p-[22px] sm:p-6">
                <span
                  className="flex-shrink-0 w-[38px] h-[38px] rounded-full flex items-center justify-center font-display font-bold text-sm text-void"
                  style={{ background: 'linear-gradient(135deg, var(--bougain), var(--mustard))' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="m-0 text-[15.5px] leading-[1.6] text-cream">{text}</p>
              </GlassPanel>
            ))}
          </div>
        </div>
      </section>

      <section ref={tracksRef} className="reveal-ready py-20">
        <div className="max-w-site mx-auto px-[22px]">
          <div data-reveal>
            <SectionHeading
              eyebrow="Three ways in"
              title="Wherever you're joining from."
              description="Every woman is welcome the same way. What you find here meets you where you are."
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tracks.map((track, i) => {
              const scene =
                i === 0
                  ? MEDIA.curacaoKenepa
                  : i === 1
                    ? MEDIA.caribbeanParadise
                    : MEDIA.caribbeanPeace;
              return (
                <GlassPanel key={i} as="article" data-reveal className="relative overflow-hidden p-0">
                  <div className="relative h-[168px] overflow-hidden">
                    <img
                      src={scene}
                      alt=""
                      aria-hidden
                      className="absolute inset-0 w-full h-full object-cover object-center scene-ken"
                      style={{ opacity: 0.91 }}
                      loading="lazy"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(180deg, rgba(251,242,237,0.12) 0%, rgba(251,242,237,0.05) 40%, rgba(36,16,25,0.3) 100%), radial-gradient(circle at 85% 15%, ${track.glow}, transparent 55%)`,
                        backdropFilter: 'blur(4px) saturate(112%)',
                        WebkitBackdropFilter: 'blur(4px) saturate(112%)',
                      }}
                    />
                  </div>
                  <div className="p-7 pt-5">
                    <span className="block font-display font-bold text-[18px] mb-3">{track.tag}</span>
                    <p className="text-sm leading-[1.7] text-soft m-0 mb-3">{track.text}</p>
                    <p className="text-[12.5px] leading-[1.6] text-soft-2 m-0">{track.soft}</p>
                  </div>
                </GlassPanel>
              );
            })}
          </div>
        </div>
      </section>

      <section id="explore" ref={circleRef} className="reveal-ready py-20 scroll-mt-24">
        <div className="max-w-site mx-auto px-[22px]">
          <div data-reveal>
            <SectionHeading
              eyebrow="The Circle"
              title="Eight topics, one honest conversation."
            />
          </div>
          {categories.length === 0 ? (
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
                  <h3 className="font-display font-bold text-[17px] mb-2">{theme.name}</h3>
                  <p className="text-[13px] text-soft leading-[1.6] m-0">{theme.description}</p>
                </GlassPanel>
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="vision" ref={visionRef} className="reveal-ready py-20 scroll-mt-24">
        <div className="max-w-site mx-auto px-[22px]">
          <GlassPanel
            data-reveal
            className="relative overflow-hidden p-0"
            style={{
              border: '1px solid var(--glass-b)',
              borderRadius: 'var(--r)',
              boxShadow: '0 10px 40px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.07)',
            }}
          >
            <div className="absolute inset-0" aria-hidden>
              <img
                src={MEDIA.natureSerenity}
                alt=""
                className="w-full h-full object-cover object-center scene-ken"
                style={{ opacity: 0.93 }}
                loading="lazy"
              />
              {/* Light frost + transparency */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(36,16,25,0.52) 0%, rgba(36,16,25,0.26) 40%, rgba(251,242,237,0.1) 72%, rgba(251,242,237,0.07) 100%)',
                  backdropFilter: 'blur(4px) saturate(112%)',
                  WebkitBackdropFilter: 'blur(4px) saturate(112%)',
                }}
              />
            </div>
            <div className="relative p-[46px] sm:p-9 max-w-[560px]">
              <EyebrowChip
                className="mb-5"
                style={{
                  background: 'rgba(96, 23, 51, 0.55)',
                  border: '1px solid rgba(255, 158, 187, 0.35)',
                  color: 'var(--blush)',
                }}
              >
                Why this matters
              </EyebrowChip>
              <blockquote className="m-0 mb-[18px] font-display font-semibold text-[clamp(22px,3.4vw,30px)] leading-[1.35] text-cream">
                Today you found a place that gets it. Tomorrow, that place grows into something you
                can walk into.
              </blockquote>
              <p className="text-soft text-[14.5px] leading-[1.75] m-0 mb-6">
                When you join Fempire.Love, you're not just reading articles. You're helping create a
                real space on the island where women can come together. Part of every paid membership
                opens the door for a woman who can't afford it, because no one should be left out of
                this conversation.
              </p>
              <Button
                variant="glass"
                className="inline-flex items-center gap-2"
                onClick={() => navigate('/vision')}
              >
                Read our vision <ArrowRight size={16} />
              </Button>
            </div>
          </GlassPanel>
        </div>
      </section>

      {articles.length > 0 && (
        <section ref={articlesRef} className="reveal-ready py-20">
          <div className="max-w-site mx-auto px-[22px]">
            <div data-reveal>
              <SectionHeading eyebrow="Fresh reads" title="Latest from the Circle." />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {articles.slice(0, 6).map((article) => (
                <a
                  key={article.id}
                  data-reveal
                  href={`/${article.category?.slug}/${article.slug}`}
                  className="glass p-0 no-underline text-cream hover:-translate-y-1 transition-transform cursor-pointer block overflow-hidden"
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
                      {article.category?.name}
                    </span>
                    <h3 className="font-display font-bold text-[18px] mt-2.5 mb-2 leading-[1.3]">
                      {article.title}
                    </h3>
                    <p className="text-[13px] text-soft leading-[1.6] mb-3 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="flex gap-3 text-[12px] text-soft-2 items-center">
                      <span className="inline-flex items-center gap-1">
                        <Clock size={12} /> {article.reading_time_min} min
                      </span>
                      {!article.is_free && (
                        <span className="inline-flex items-center gap-1 text-mustard-hi">
                          <Lock size={12} /> Members
                        </span>
                      )}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="join" ref={tiersRef} className="reveal-ready py-20 scroll-mt-24">
        <div className="max-w-site mx-auto px-[22px]">
          <div data-reveal>
            <SectionHeading
              eyebrow="The Circle"
              title="Free to start. Built to grow with you."
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1.1fr] gap-[18px] md:items-end">
            {MEMBERSHIP_TIERS.map((tier) => (
              <GlassPanel
                key={tier.name}
                data-reveal
                className={`flex flex-col gap-4 p-8 ${tier.premium ? 'md:-translate-y-4' : ''}`}
                style={
                  tier.premium
                    ? {
                        border: '1px solid rgba(198,138,46,0.55)',
                        boxShadow:
                          '0 0 44px rgba(198,138,46,0.2), inset 0 1px 0 rgba(255,255,255,0.08)',
                      }
                    : undefined
                }
              >
                <span className="font-display font-bold text-xl">{tier.name}</span>
                <span className="font-display font-extrabold text-[30px]">
                  {tier.price}
                  <span className="text-[13px] font-medium text-soft-2">{tier.suffix}</span>
                </span>
                <ul className="m-0 pl-[18px] text-[13.5px] leading-[1.9] text-soft">
                  {tier.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <Button
                  variant={tier.premium ? 'primary' : 'glass'}
                  onClick={() => navigate('/community#join')}
                >
                  {tier.cta}
                </Button>
              </GlassPanel>
            ))}
          </div>
          <p data-reveal className="text-center text-[13px] text-soft-2 mt-6">
            Founding members get the closed Circle on Fempire.Love from day one, plus first seats at
            live Q&amp;A.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-site mx-auto px-[22px]">
          <GlassPanel className="p-8 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <EyebrowChip className="mb-4">Newsletter</EyebrowChip>
              <h2 className="font-display font-bold text-[clamp(26px,4vw,36px)] tracking-tight mb-3">
                One warm letter. Tell us where you are.
              </h2>
              <p className="text-soft text-[15px] leading-[1.7] m-0">
                That single answer (Curaçao, the wider Caribbean, or elsewhere) shapes how we
                meet you. Soft invitations for the island. A full digital home everywhere else.
              </p>
            </div>
            <NewsletterForm source="home" onNavigatePrivacy={() => navigate('/privacy')} />
          </GlassPanel>
        </div>
      </section>
    </main>
  );
}
