import type { NavigateFn } from '@/types';
import { useSEO } from '@/hooks/useSEO';
import { Button, EyebrowChip, GlassPanel } from '@/components/ui';
import { useAnimeReveal } from '@/hooks/useAnimeReveal';
import { CALENDLY_URL } from '@/lib/calendly';
import { MEDIA } from '@/lib/media';

type Props = { navigate: NavigateFn };

export function CoachPage({ navigate }: Props) {
  const ref = useAnimeReveal<HTMLElement>({ staggerMs: 80, y: 18 });

  useSEO({
    title: 'The Coach · Fempire.Love',
    description:
      'Meet the coach behind Fempire.Love and With Love Academy: warm, practical guidance on hormones, the change, motherhood, and mental wellness.',
    canonical: '/coach',
    image: `https://fempire.love${MEDIA.coachRoom}`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Roeleke',
      jobTitle: 'Coach',
      worksFor: {
        '@type': 'Organization',
        name: 'With Love Academy / Fempire.Love',
      },
      description:
        'Coach in women’s health, personal growth and community, the primary face of Fempire.Love content and Premium coaching.',
    },
  });

  return (
    <main ref={ref} className="reveal-ready">
      <section className="max-w-site mx-auto px-[22px] pt-[60px] pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 items-start">
          <div>
            <EyebrowChip className="mb-5" data-reveal>
              With Love Academy
            </EyebrowChip>
            <h1
              data-reveal
              className="font-display font-bold text-[clamp(34px,6vw,56px)] leading-[1.05] tracking-tight mb-5"
            >
              A trusted voice for the questions you carry quietly.
            </h1>
            <p data-reveal className="text-soft text-[17px] leading-[1.75] max-w-[540px] mb-6">
              Fempire.Love content and Premium coaching are rooted in the practice of With Love
              Academy: coaching, women’s health, and personal growth with a Caribbean heart. Warm.
              Direct. Never clinical for the sake of sounding smart.
            </p>
            <div data-reveal className="flex flex-wrap gap-3">
              <Button onClick={() => navigate('/community#join')}>Explore Premium</Button>
              <Button
                variant="glass"
                onClick={() => window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer')}
              >
                Book a session
              </Button>
            </div>
          </div>

          <GlassPanel data-reveal className="p-4 sm:p-5 relative overflow-hidden">
            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden mb-5">
              <img
                src={MEDIA.coachRoom}
                alt="Bright coaching room with Caribbean light, linen chair and bougainvillea by the window"
                className="absolute inset-0 w-full h-full object-cover scene-ken"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, transparent 55%, rgba(36,16,25,0.55) 100%)',
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="font-display font-bold text-2xl m-0">Roeleke</p>
                <p className="text-soft text-sm m-0 mt-1">Coach · With Love Academy</p>
              </div>
            </div>
            <p className="text-soft text-[14.5px] leading-[1.7] m-0 px-1">
              Her portrait arrives soon. Until then, this is the room her work lives in: soft light,
              honest talk, and every article, webinar, and Premium session shaped by that same
              warmth.
            </p>
          </GlassPanel>
        </div>
      </section>

      <section className="max-w-site mx-auto px-[22px] pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              t: 'Expertise',
              d: 'Coaching, women’s health, personal growth, and community: practical tools for real lives.',
            },
            {
              t: 'On the platform',
              d: 'Editorial voice, live Q&A, webinars, and the quarterly 1:1 sessions inside Premium.',
            },
            {
              t: 'On the island',
              d: 'For women on Curaçao, coaching can connect to the salon and, later, the Women’s Center.',
            },
          ].map((card) => (
            <GlassPanel key={card.t} data-reveal className="p-7">
              <h3 className="font-display font-bold text-lg mb-2">{card.t}</h3>
              <p className="text-soft text-sm leading-[1.7] m-0">{card.d}</p>
            </GlassPanel>
          ))}
        </div>
      </section>
    </main>
  );
}
