import type { NavigateFn } from '@/types';
import { useSEO } from '@/hooks/useSEO';
import { Button, EyebrowChip, GlassPanel } from '@/components/ui';
import { SceneBanner } from '@/components/visuals';
import { useAnimeReveal } from '@/hooks/useAnimeReveal';
import { MEDIA } from '@/lib/media';

type Props = { navigate: NavigateFn };

export function VisionPage({ navigate }: Props) {
  const ref = useAnimeReveal<HTMLElement>({ staggerMs: 70, y: 16 });

  useSEO({
    title: 'Our Vision · Fempire.Love',
    description:
      'Fempire.Love is the digital first voice of the Vrouwencentrum Curaçao, a warm home for women across the Caribbean and the diaspora.',
    canonical: '/vision',
    image: `https://fempire.love${MEDIA.willemstad}`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Fempire.Love',
      description:
        'A digital home for women across the Caribbean and the diaspora: hormones, the change, motherhood, mind and body, without judgement.',
    },
  });

  return (
    <main ref={ref} className="reveal-ready pb-20">
      <SceneBanner
        src={MEDIA.willemstad}
        alt="Willemstad waterfront, the island home this vision is building toward"
        className="min-h-[38vh] flex items-end mb-10"
        overlay="soft"
      >
        <div className="max-w-[720px] mx-auto px-[22px] pt-[70px] pb-10 w-full">
          <EyebrowChip className="mb-5" data-reveal>
            Our Vision
          </EyebrowChip>
          <h1
            data-reveal
            className="font-display font-bold text-[clamp(32px,6vw,52px)] leading-[1.05] tracking-tight"
          >
            Change or repeat. The choice is always yours.
          </h1>
        </div>
      </SceneBanner>

      <div className="max-w-[720px] mx-auto px-[22px]">

      <div data-reveal className="text-soft text-[16.5px] leading-[1.85] article-body">
        <p>
          Fempire.Love was born from a simple need: a place where women, especially women of the
          Caribbean and the diaspora, can find honest answers to the questions they would never ask
          out loud. Questions about hormones, cycles, the change, motherhood, mental health, and the
          body. Questions that deserve more than a wellness account telling you to drink more water.
        </p>

        <h2>The first voice of the Vrouwencentrum</h2>
        <p>
          This platform starts as a standalone digital home. It is also the first voice of the
          Women&apos;s Center Curaçao, the medium that builds community before the physical doors
          open. Who knows the platform knows the vision. Who knows the vision will walk inside when
          the time comes.
        </p>
        <p>
          Digital reach. Real connection. Inside out or outside in. The choice is always yours.
        </p>

        <h2>Why this matters</h2>
        <p>
          For too long, the conversation around women&apos;s health has been shaped by people who do
          not look like us, do not live where we live, and do not eat what we eat. The result is a
          world where women Google their symptoms at midnight and close twelve tabs, still unsure. We
          are changing that.
        </p>

        <h2>What we believe</h2>
        <ul>
          <li>Every woman deserves honest, evidence based answers, not taboos, not judgement.</li>
          <li>Health information should reflect Caribbean lives, Caribbean food, Caribbean bodies.</li>
          <li>Community is medicine. Women who support each other heal faster.</li>
          <li>No one should be left out of this conversation because she cannot afford it.</li>
        </ul>

        <h2>The bridge to something real</h2>
        <p>
          Today, Fempire.Love is a digital home. Part of every paid membership opens the door for a
          woman on Curaçao who cannot afford it. Over time, this platform builds toward a physical
          space: a women&apos;s center on the island where women can come together, learn, rest, and
          heal. The platform builds the community. The center gives her a home.
        </p>

        <h2>Who is behind this</h2>
        <p>
          Vision and content are rooted in With Love Academy coaching expertise. The platform is
          built and grown with technical partnership so the work can scale. Content is written with
          care and, where health is involved, reviewed by medical professionals, because who writes
          health information matters for your trust, and for how search engines and AI systems
          evaluate our work.
        </p>
      </div>

        <GlassPanel data-reveal className="p-8 text-center mt-10">
          <h3 className="font-display font-bold text-[22px] mb-2.5">Join the Circle</h3>
          <p className="text-soft text-[14.5px] mb-[22px] max-w-[440px] mx-auto">
            Start free. Read, learn, and become part of a community that gets it, and helps open doors
            on the island.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button onClick={() => navigate('/membership')}>Start free</Button>
            <Button variant="glass" onClick={() => navigate('/coach')}>
              Meet the coach
            </Button>
          </div>
        </GlassPanel>
      </div>
    </main>
  );
}
