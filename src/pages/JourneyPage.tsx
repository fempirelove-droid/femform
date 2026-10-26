import type { NavigateFn } from '@/types';
import { useSEO } from '@/hooks/useSEO';
import { Button, EyebrowChip, GlassPanel } from '@/components/ui';
import { useAnimeReveal } from '@/hooks/useAnimeReveal';

type Props = { navigate: NavigateFn };

const phases = [
  {
    name: 'Reach',
    both: 'SEO, social, word of mouth — the first soft hello.',
    local: null,
    intl: null,
  },
  {
    name: 'Segment',
    both: 'One question at signup: where do you live? That answer shapes everything after.',
    local: null,
    intl: null,
  },
  {
    name: 'First contact',
    both: 'An article, reel, or podcast — tagged for your path.',
    local: null,
    intl: null,
  },
  {
    name: 'Trust',
    both: null,
    local: 'Newsletter + free content with a gentle mention of the salon and local gatherings.',
    intl: 'Fully digital nurture — community, podcast, and someday a retreat on Curaçao.',
  },
  {
    name: 'Community',
    both: 'Paid membership, closed group, $10 / month. Founding members first.',
    local: null,
    intl: null,
  },
  {
    name: 'Premium',
    both: 'Coaching once a quarter.',
    local: 'Online or in person at the salon when you prefer.',
    intl: 'Coaching on distance — a bridge back to your roots.',
  },
  {
    name: 'Ambassador',
    both: 'You share the platform — and become a bridge to the physical Women’s Center on Curaçao.',
    local: null,
    intl: null,
  },
];

export function JourneyPage({ navigate }: Props) {
  const ref = useAnimeReveal<HTMLElement>({ staggerMs: 60, y: 14 });

  useSEO({
    title: 'Your Journey — Fempire.Love',
    description:
      'From first hello to ambassador — how Fempire.Love walks with women on Curaçao and across the diaspora.',
    canonical: '/journey',
  });

  return (
    <main ref={ref} className="reveal-ready">
      <section className="max-w-site mx-auto px-[22px] pt-[60px] pb-12">
        <EyebrowChip className="mb-5" data-reveal>
          Customer journey
        </EyebrowChip>
        <h1
          data-reveal
          className="font-display font-bold text-[clamp(34px,6vw,56px)] leading-[1.05] tracking-tight max-w-[720px] mb-4"
        >
          From first hello to a door you can walk through.
        </h1>
        <p data-reveal className="text-soft text-[16.5px] leading-[1.75] max-w-[560px]">
          One journey, two tracks. On Curaçao the path can become physical. Everywhere else, the
          platform is the full home — with a bridge of belonging back to the island.
        </p>
      </section>

      <section className="max-w-site mx-auto px-[22px] pb-16">
        <div className="flex flex-col gap-3.5">
          {phases.map((phase, i) => (
            <GlassPanel key={phase.name} data-reveal className="p-6 sm:p-7 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                <div className="flex items-center gap-3 sm:w-[180px] flex-shrink-0">
                  <span
                    className="w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-sm text-void"
                    style={{ background: 'linear-gradient(135deg, var(--bougain), var(--mustard))' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2 className="font-display font-bold text-lg m-0">{phase.name}</h2>
                </div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                  {phase.both && (
                    <p className="text-soft text-[14.5px] leading-[1.7] m-0 md:col-span-2">
                      {phase.both}
                    </p>
                  )}
                  {phase.local && (
                    <div
                      className="rounded-xl p-4"
                      style={{ background: 'rgba(255,92,138,0.1)', border: '1px solid rgba(255,92,138,0.22)' }}
                    >
                      <span className="text-[11px] font-bold uppercase tracking-wide text-bougain">
                        Curaçao
                      </span>
                      <p className="text-soft text-[13.5px] leading-[1.65] m-0 mt-1.5">{phase.local}</p>
                    </div>
                  )}
                  {phase.intl && (
                    <div
                      className="rounded-xl p-4"
                      style={{ background: 'rgba(198,138,46,0.1)', border: '1px solid rgba(198,138,46,0.22)' }}
                    >
                      <span className="text-[11px] font-bold uppercase tracking-wide text-mustard-hi">
                        Caribbean · diaspora
                      </span>
                      <p className="text-soft text-[13.5px] leading-[1.65] m-0 mt-1.5">{phase.intl}</p>
                    </div>
                  )}
                </div>
              </div>
            </GlassPanel>
          ))}
        </div>
      </section>

      <section className="max-w-site mx-auto px-[22px] pb-20">
        <GlassPanel data-reveal className="p-8 sm:p-10 text-center">
          <h3 className="font-display font-bold text-[22px] mb-3">Ready for your first step?</h3>
          <p className="text-soft text-[14.5px] max-w-[480px] mx-auto mb-6">
            Tell us where you&apos;re joining from when you subscribe — that one answer keeps your
            path clear from day one.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button onClick={() => navigate('/membership')}>Start free</Button>
            <Button variant="glass" onClick={() => navigate('/#newsletter')}>
              Join the newsletter
            </Button>
          </div>
        </GlassPanel>
      </section>
    </main>
  );
}
