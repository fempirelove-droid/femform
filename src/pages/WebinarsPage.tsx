import { useState } from 'react';
import type { NavigateFn } from '@/types';
import { useSEO } from '@/hooks/useSEO';
import { Button, EyebrowChip, GlassPanel, SectionHeading } from '@/components/ui';
import { TopicMotif } from '@/components/visuals';
import { useAnimeReveal } from '@/hooks/useAnimeReveal';
import { useAuth } from '@/hooks/useAuth';
import { startWebinarCheckout } from '@/lib/stripe';
import { MEDIA } from '@/lib/media';

type Props = { navigate: NavigateFn };

const webinars = [
  {
    id: 'boundaries-without-guilt',
    title: 'How do I set boundaries without guilt?',
    blurb: 'A live hour on the language of no: soft, clear, and rooted in Caribbean reality.',
    dateLabel: 'Launch webinar · TBA',
    price: 25,
    tag: 'Mind & Wellness',
    topicSlug: 'mind-wellness',
  },
  {
    id: 'first-signs-change',
    title: 'What are the first signs of perimenopause?',
    blurb: 'Practical signs, what to ask your doctor, and how Caribbean heat can change the story.',
    dateLabel: 'Members Q&A · monthly',
    price: 20,
    tag: 'The Change',
    topicSlug: 'the-change',
  },
  {
    id: 'hormones-week',
    title: 'Why do I feel so different every week of my cycle?',
    blurb: 'A clear map of your cycle in plain language, with no jargon, no shame.',
    dateLabel: 'Guest session · TBA',
    price: 35,
    tag: 'Hormones & Cycle',
    topicSlug: 'hormones-cycle',
  },
];

export function WebinarsPage({ navigate }: Props) {
  const ref = useAnimeReveal<HTMLElement>({ staggerMs: 80 });
  const { user } = useAuth();
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useSEO({
    title: 'Webinars · Fempire.Love',
    description:
      'Join live Fempire.Love webinars as a member or buy a single ticket for $20 to $35. Replays for Community and Premium.',
    canonical: '/webinars',
  });

  const buyTicket = async (id: string, price: number) => {
    setError(null);
    if (!user) {
      navigate(`/account?next=/webinars`);
      return;
    }
    setBusyId(id);
    try {
      await startWebinarCheckout(id, price);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Checkout failed.');
      setBusyId(null);
    }
  };

  return (
    <main ref={ref} className="reveal-ready">
      <section className="relative overflow-hidden pt-[60px] pb-12 text-center">
        <div className="absolute inset-0 z-0" aria-hidden>
          <img
            src={MEDIA.curacaoSea}
            alt=""
            className="w-full h-full object-cover object-center scene-ken"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(36,16,25,0.28), rgba(36,16,25,0.62))',
            }}
          />
        </div>
        <div className="max-w-site mx-auto px-[22px] relative z-[1]">
          <EyebrowChip className="mb-5" data-reveal>
            Webinars
          </EyebrowChip>
          <h1
            data-reveal
            className="font-display font-bold text-[clamp(34px,6vw,56px)] leading-[1.05] tracking-tight max-w-[700px] mx-auto mb-4"
          >
            Live rooms. Honest questions. Real answers.
          </h1>
          <p data-reveal className="text-soft text-[16.5px] max-w-[520px] mx-auto leading-[1.75]">
            Members get access included. Guests can buy a single ticket for $20 to $35, a low pressure
            way to meet the Circle.
          </p>
        </div>
      </section>

      {error && (
        <p className="text-center text-sm mb-4" style={{ color: 'var(--bougain)' }}>
          {error}
        </p>
      )}

      <section className="max-w-site mx-auto px-[22px] pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {webinars.map((w) => (
            <GlassPanel key={w.id} data-reveal className="p-7 flex flex-col gap-3">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[11px] font-bold uppercase tracking-[0.06em] text-bougain">
                  {w.tag}
                </span>
                <TopicMotif slug={w.topicSlug} size={40} />
              </div>
              <h3 className="font-display font-bold text-[20px] leading-[1.25] m-0">{w.title}</h3>
              <p className="text-soft text-sm leading-[1.7] m-0 flex-1">{w.blurb}</p>
              <p className="text-[12.5px] text-soft-2 m-0">{w.dateLabel}</p>
              {/* Pay row stays typography-only: no decorative photos beside checkout */}
              <div className="flex items-center justify-between gap-3 pt-2">
                <span className="font-display font-bold text-lg">${w.price}</span>
                <Button
                  size="small"
                  variant="glass"
                  disabled={busyId === w.id}
                  onClick={() => buyTicket(w.id, w.price)}
                >
                  {busyId === w.id ? 'Redirecting…' : 'Buy ticket'}
                </Button>
              </div>
            </GlassPanel>
          ))}
        </div>
      </section>

      <section className="max-w-site mx-auto px-[22px] pb-20">
        <GlassPanel data-reveal className="p-8 sm:p-10 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div>
            <SectionHeading
              className="mb-0"
              title="Prefer unlimited access?"
              description="Community and Premium include webinar replays. Premium adds a quarterly coaching session."
            />
          </div>
          <Button onClick={() => navigate('/membership')}>See membership</Button>
        </GlassPanel>
        <p data-reveal className="text-center text-[13px] text-soft-2 mt-6">
          Replays sit behind the membership wall once the community is live. Founding members get
          first access.
        </p>
      </section>
    </main>
  );
}
