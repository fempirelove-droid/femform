import type { NavigateFn } from '@/types';
import { useSEO } from '@/hooks/useSEO';
import { Button, EyebrowChip, GlassPanel, VoiceCard } from '@/components/ui';
import { useAnimeReveal } from '@/hooks/useAnimeReveal';
import { MEDIA } from '@/lib/media';

type Props = { navigate: NavigateFn };

const beliefs = [
  'Every woman deserves honest, evidence based answers, not taboos, not judgement.',
  'Health information should reflect Caribbean lives, Caribbean food, Caribbean bodies.',
  'Community is medicine. Women who support each other heal faster.',
  'No one should be left out of this conversation because she cannot afford it.',
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
      <section className="relative overflow-hidden pt-[60px] pb-12 text-center">
        <div className="page-hero-wash" aria-hidden />
        <div className="relative z-[1] max-w-site mx-auto px-[22px]">
          <EyebrowChip className="mb-5" data-reveal>
            Our Vision
          </EyebrowChip>
          <h1
            data-reveal
            className="font-display font-bold text-[clamp(34px,6vw,56px)] leading-[1.05] tracking-tight max-w-[700px] mx-auto mb-8"
          >
            Change or repeat.{' '}
            <span className="grad-text">The choice is always yours.</span>
          </h1>
          <div data-reveal className="flex justify-center">
            <VoiceCard
              quote="Digital reach. Real connection. Inside out or outside in."
              caption="The heart of Fempire.Love"
              tilt={-2}
            />
          </div>
        </div>
      </section>

      <section className="max-w-[760px] mx-auto px-[22px] pb-8">
        <GlassPanel data-reveal className="p-7 sm:p-9 overflow-hidden">
          <div className="relative h-[160px] sm:h-[200px] rounded-[16px] overflow-hidden mb-7 -mx-1">
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
                  'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(36,16,25,0.35) 100%)',
              }}
            />
          </div>
          <p className="text-soft text-[16.5px] leading-[1.85] m-0">
            Fempire.Love was born from a simple need: a place where women, especially women of the
            Caribbean and the diaspora, can find honest answers to the questions they would never ask
            out loud. Questions about hormones, cycles, the change, motherhood, mental health, and the
            body. Questions that deserve more than a wellness account telling you to drink more water.
          </p>
        </GlassPanel>
      </section>

      <section className="max-w-[760px] mx-auto px-[22px] pb-16 flex flex-col gap-4">
        <GlassPanel data-reveal className="p-7 sm:p-8">
          <h2 className="font-display font-bold text-[22px] sm:text-[24px] m-0 mb-3 tracking-tight">
            The first voice of the Vrouwencentrum
          </h2>
          <p className="text-soft text-[15.5px] leading-[1.8] m-0 mb-3">
            This platform starts as a standalone digital home. It is also the first voice of the
            Women&apos;s Center Curaçao, the medium that builds community before the physical doors
            open. Who knows the platform knows the vision. Who knows the vision will walk inside when
            the time comes.
          </p>
          <p className="text-soft text-[15.5px] leading-[1.8] m-0">
            Digital reach. Real connection. Inside out or outside in. The choice is always yours.
          </p>
        </GlassPanel>

        <GlassPanel data-reveal className="p-7 sm:p-8">
          <h2 className="font-display font-bold text-[22px] sm:text-[24px] m-0 mb-3 tracking-tight">
            Why this matters
          </h2>
          <p className="text-soft text-[15.5px] leading-[1.8] m-0">
            For too long, the conversation around women&apos;s health has been shaped by people who do
            not look like us, do not live where we live, and do not eat what we eat. The result is a
            world where women Google their symptoms at midnight and close twelve tabs, still unsure. We
            are changing that.
          </p>
        </GlassPanel>

        <GlassPanel data-reveal className="p-7 sm:p-8">
          <EyebrowChip className="mb-4">Beliefs</EyebrowChip>
          <h2 className="font-display font-bold text-[22px] sm:text-[24px] m-0 mb-5 tracking-tight">
            What we hold true.
          </h2>
          <ul className="list-none m-0 p-0 flex flex-col gap-3">
            {beliefs.map((item) => (
              <li
                key={item}
                className="flex gap-3 items-start text-soft text-[15px] leading-[1.7]"
              >
                <span
                  className="mt-2 shrink-0 w-2 h-2 rounded-full"
                  style={{
                    background: 'linear-gradient(120deg, var(--bougain), var(--mustard))',
                    boxShadow: '0 0 10px rgba(255,92,138,0.45)',
                  }}
                  aria-hidden
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </GlassPanel>

        <GlassPanel data-reveal className="p-7 sm:p-8">
          <h2 className="font-display font-bold text-[22px] sm:text-[24px] m-0 mb-3 tracking-tight">
            The bridge to something real
          </h2>
          <p className="text-soft text-[15.5px] leading-[1.8] m-0">
            Today, Fempire.Love is a digital home. Part of every paid membership opens the door for a
            woman on Curaçao who cannot afford it. Over time, this platform builds toward a physical
            space: a women&apos;s center on the island where women can come together, learn, rest, and
            heal. The platform builds the community. The center gives her a home.
          </p>
        </GlassPanel>

        <GlassPanel data-reveal className="p-7 sm:p-8">
          <h2 className="font-display font-bold text-[22px] sm:text-[24px] m-0 mb-3 tracking-tight">
            Who is behind this
          </h2>
          <p className="text-soft text-[15.5px] leading-[1.8] m-0">
            Vision and content are rooted in With Love Academy coaching expertise. The platform is
            built and grown with technical partnership so the work can scale. Content is written with
            care and, where health is involved, reviewed by medical professionals, because who writes
            health information matters for your trust, and for how search engines and AI systems
            evaluate our work.
          </p>
        </GlassPanel>
      </section>

      <section className="max-w-[760px] mx-auto px-[22px] pb-20">
        <GlassPanel data-reveal className="p-8 sm:p-10 text-center">
          <h3 className="font-display font-bold text-[22px] mb-2.5">Join the Circle</h3>
          <p className="text-soft text-[14.5px] mb-[22px] max-w-[440px] mx-auto leading-[1.7]">
            Start free. Read, learn, and become part of a community that gets it, and helps open doors
            on the island.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
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
