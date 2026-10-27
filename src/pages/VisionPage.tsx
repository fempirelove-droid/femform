import type { NavigateFn } from '@/types';
import { useSEO } from '@/hooks/useSEO';
import { Button, EyebrowChip, GlassPanel } from '@/components/ui';
import { useAnimeReveal } from '@/hooks/useAnimeReveal';
import { MEDIA } from '@/lib/media';

type Props = { navigate: NavigateFn };

const story = [
  {
    kicker: '01',
    title: 'The first voice of the Vrouwencentrum',
    body: [
      'This platform starts as a standalone digital home. It is also the first voice of the Women?s Center Curaçao, the medium that builds community before the physical doors open.',
      'Who knows the platform knows the vision. Who knows the vision will walk inside when the time comes.',
    ],
  },
  {
    kicker: '02',
    title: 'Why this matters',
    body: [
      'For too long, the conversation around women?s health has been shaped by people who do not look like us, do not live where we live, and do not eat what we eat.',
      'The result is a world where women Google their symptoms at midnight and close twelve tabs, still unsure. We are changing that.',
    ],
  },
  {
    kicker: '03',
    title: 'The bridge to something real',
    body: [
      'Today, Fempire.Love is a digital home. Part of every paid membership opens the door for a woman on Curaçao who cannot afford it.',
      'Over time, this platform builds toward a physical space: a women?s center on the island where women can come together, learn, rest, and heal. The platform builds the community. The center gives her a home.',
    ],
  },
  {
    kicker: '04',
    title: 'Who is behind this',
    body: [
      'Vision and content are rooted in With Love Academy coaching expertise. The platform is built and grown with technical partnership so the work can scale.',
      'Content is written with care and, where health is involved, reviewed by medical professionals ? because who writes health information matters for your trust, and for how search engines and AI systems evaluate our work.',
    ],
  },
];

const beliefs = [
  {
    title: 'Honest answers',
    text: 'Evidence based, never taboo, never judgement.',
  },
  {
    title: 'Caribbean first',
    text: 'Our lives, our food, our bodies ? reflected in every page.',
  },
  {
    title: 'Community is medicine',
    text: 'Women who support each other heal faster.',
  },
  {
    title: 'No one left out',
    text: 'A seat in this conversation should never depend on money.',
  },
];

export function VisionPage({ navigate }: Props) {
  const ref = useAnimeReveal<HTMLElement>({ staggerMs: 70, y: 16 });

  useSEO({
    title: 'Our Vision · Fempire.Love',
    description:
      'Fempire.Love is the digital first voice of the Vrouwencentrum Curaçao, a warm home for women across the Caribbean and the diaspora.',
    canonical: '/vision',
    image: `https://fempire.love${MEDIA.natureSerenity}`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Fempire.Love',
      description:
        'A digital home for women across the Caribbean and the diaspora: hormones, the change, motherhood, mind and body, without judgement.',
    },
  });

  return (
    <main ref={ref} className="reveal-ready">
      <section className="relative overflow-hidden pt-[60px] pb-10 text-center">
        <div className="page-hero-wash" aria-hidden />
        <div className="relative z-[1] max-w-site mx-auto px-[22px]">
          <EyebrowChip className="mb-5" data-reveal>
            Our Vision
          </EyebrowChip>
          <h1
            data-reveal
            className="font-display font-bold text-[clamp(34px,6vw,56px)] leading-[1.05] tracking-tight max-w-[700px] mx-auto mb-4"
          >
            Change or repeat.{' '}
            <span className="grad-text">The choice is always yours.</span>
          </h1>
          <p data-reveal className="text-soft text-[16.5px] leading-[1.75] max-w-[480px] mx-auto mb-8">
            Digital reach. Real connection. Inside out or outside in.
          </p>
          <div data-reveal className="flex justify-center">
            <VoiceCard
              quote="A place for the questions you would never ask out loud."
              caption="Born for the Caribbean, open to the world"
              tilt={-2}
            />
          </div>
        </div>
      </section>

      {/* Opening statement ? one strong story card */}
      <section className="max-w-site mx-auto px-[22px] pb-10">
        <article data-reveal className="vision-story overflow-hidden">
          <div className="relative h-[200px] sm:h-[260px]">
            <img
              src={MEDIA.natureSerenity}
              alt=""
              aria-hidden
              className="absolute inset-0 w-full h-full object-cover scene-ken"
              loading="lazy"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(96,23,51,0.15) 0%, rgba(96,23,51,0.72) 100%)',
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <EyebrowChip className="mb-3">Why we exist</EyebrowChip>
              <h2 className="font-display font-bold text-[clamp(22px,3.5vw,32px)] leading-[1.15] m-0 max-w-[560px]">
                Honest answers for the questions midnight Google never settles.
              </h2>
            </div>
          </div>
          <div className="p-6 sm:p-9">
            <p className="text-cream/90 text-[16.5px] leading-[1.85] m-0 max-w-[640px]">
              Fempire.Love was born from a simple need: a place where women, especially women of the
              Caribbean and the diaspora, can find honest answers about hormones, cycles, the change,
              motherhood, mental health, and the body ? more than a wellness account telling you to
              drink more water.
            </p>
          </div>
        </article>
      </section>

      {/* Numbered story chapters */}
      <section className="max-w-site mx-auto px-[22px] pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {story.map((block) => (
            <article key={block.kicker} data-reveal className="vision-chapter">
              <span className="vision-chapter__num" aria-hidden>
                {block.kicker}
              </span>
              <h2 className="font-display font-bold text-[20px] sm:text-[22px] leading-[1.2] m-0 mb-3.5 tracking-tight">
                {block.title}
              </h2>
              <div className="flex flex-col gap-3">
                {block.body.map((para) => (
                  <p key={para.slice(0, 40)} className="text-soft text-[15px] leading-[1.75] m-0">
                    {para}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Beliefs as a real tile grid */}
      <section className="max-w-site mx-auto px-[22px] pb-12">
        <div data-reveal className="mb-6 text-center sm:text-left">
          <EyebrowChip className="mb-4">Beliefs</EyebrowChip>
          <h2 className="font-display font-bold text-[clamp(26px,4vw,36px)] tracking-tight m-0">
            What we hold true.
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {beliefs.map((b) => (
            <article key={b.title} data-reveal className="vision-belief">
              <h3 className="font-display font-bold text-[18px] m-0 mb-2">{b.title}</h3>
              <p className="text-soft text-[14.5px] leading-[1.65] m-0">{b.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-site mx-auto px-[22px] pb-20">
        <GlassPanel
          data-reveal
          className="p-8 sm:p-10 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between"
        >
          <div>
            <h3 className="font-display font-bold text-[22px] mb-2">Join the Circle</h3>
            <p className="text-soft text-[14.5px] m-0 max-w-[440px] leading-[1.7]">
              Start free. Read, learn, and become part of a community that gets it ? and helps open
              doors on the island.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Button onClick={() => navigate('/community#join')}>Start free</Button>
            <Button variant="glass" onClick={() => navigate('/coach')}>
              Meet the coach
            </Button>
          </div>
        </GlassPanel>
      </section>
    </main>
  );
}
