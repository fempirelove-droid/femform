import { useState } from 'react';
import type { NavigateFn } from '@/types';
import { Button, EyebrowChip, GlassPanel, SectionHeading } from '@/components/ui';
import { useAnimeReveal } from '@/hooks/useAnimeReveal';
import { useSEO } from '@/hooks/useSEO';
import { startCheckout, openCustomerPortal, type PlanId } from '@/lib/stripe';
import { useAuth } from '@/hooks/useAuth';

type Props = { navigate: NavigateFn };

const tiers = [
  {
    id: 'free' as const,
    name: 'Free',
    price: '$0',
    suffix: '',
    features: ['Full article library', 'Weekly newsletter', 'Public social content'],
    cta: 'Join free',
    premium: false,
  },
  {
    id: 'community' as PlanId,
    name: 'Community',
    price: '$10',
    suffix: ' / mo',
    features: [
      'Everything in Free',
      'Every webinar replay',
      'Closed community on Fempire.Love',
      'Monthly live Q&A',
    ],
    cta: 'Join Community',
    premium: false,
  },
  {
    id: 'premium' as PlanId,
    name: 'Premium',
    price: '$33',
    suffix: ' / mo',
    features: [
      'Everything above',
      'One quarterly 1:1 coaching session with your Fempire.Love coach',
      'Priority webinar seats',
    ],
    cta: 'Go Premium',
    premium: true,
  },
];

const compareRows = [
  { feature: 'Full article library', free: true, community: true, premium: true },
  { feature: 'Weekly newsletter', free: true, community: true, premium: true },
  { feature: 'Webinar replays', free: false, community: true, premium: true },
  { feature: 'Closed community', free: false, community: true, premium: true },
  { feature: 'Monthly live Q&A', free: false, community: true, premium: true },
  { feature: 'Quarterly 1:1 coaching', free: false, community: false, premium: true },
  { feature: 'Priority webinar seats', free: false, community: false, premium: true },
];

const faqs = [
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. No contracts, no lock-in. Cancel from your account in two clicks, any time.',
    open: true,
  },
  {
    q: 'Is my payment information safe?',
    a: 'All payments run through Stripe. Fempire.Love never sees or stores your card details.',
    open: false,
  },
  {
    q: 'Does part of this help other women?',
    a: "Yes. Part of every paid membership opens the door for a woman on Cura�ao who can't afford it, because no one should be left out of this conversation.",
    open: false,
  },
  {
    q: 'What if I want to switch tiers later?',
    a: 'Upgrade or downgrade whenever you like. Changes take effect on your next billing date.',
    open: false,
  },
  {
    q: 'Is the community live yet?',
    a: 'Founding members join now and get the closed Circle on Fempire.Love, webinar replays, and first seats at live Q&A.',
    open: false,
  },
];

export function MembershipPage({ navigate }: Props) {
  const heroRef = useAnimeReveal<HTMLDivElement>({ staggerMs: 80 });
  const tiersRef = useAnimeReveal<HTMLDivElement>({ staggerMs: 90 });
  const { user, loading: authLoading } = useAuth();
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useSEO({
    title: 'Membership · Fempire.Love',
    description:
      'Start free, or join Community ($10/mo) or Premium ($33/mo) with quarterly coaching. Founding members welcome.',
    canonical: '/membership',
  });

  const handleTier = async (tierId: string) => {
    setError(null);
    if (tierId === 'free') {
      navigate('/#newsletter');
      return;
    }
    if (!user) {
      navigate('/account?next=/membership');
      return;
    }
    setBusy(tierId);
    try {
      await startCheckout(tierId as PlanId);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Checkout could not start. Please try again.');
      setBusy(null);
    }
  };

  const handlePortal = async () => {
    setError(null);
    setBusy('portal');
    try {
      await openCustomerPortal();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not open billing portal.');
      setBusy(null);
    }
  };

  return (
    <main>
      <div ref={heroRef} className="reveal-ready pt-[70px] pb-5 text-center">
        <div className="max-w-site mx-auto px-[22px]">
          <EyebrowChip className="mb-5" data-reveal>
            Membership
          </EyebrowChip>
          <h1
            data-reveal
            className="font-display font-bold text-[clamp(34px,6.5vw,58px)] leading-[1.05] max-w-[640px] mx-auto mb-[18px] tracking-tight"
          >
            Free to start. Built to grow with you.
          </h1>
          <p data-reveal className="text-soft text-base max-w-[480px] mx-auto">
            No pressure, no tricks. Start free, and only pay when it feels worth it to you.
          </p>
          {user && (
            <p data-reveal className="mt-4">
              <button className="btn-glass small" onClick={handlePortal} disabled={busy === 'portal'}>
                {busy === 'portal' ? 'Opening�' : 'Manage billing'}
              </button>
            </p>
          )}
        </div>
      </div>

      <div ref={tiersRef} className="reveal-ready max-w-site mx-auto px-[22px] py-[50px]">
        {error && (
          <p className="text-center text-sm mb-6" style={{ color: 'var(--bougain)' }}>
            {error}
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1.1fr] gap-[18px] md:items-end">
          {tiers.map((tier) => (
            <GlassPanel
              key={tier.name}
              data-reveal
              className={`flex flex-col gap-4 p-[34px] sm:p-7 ${tier.premium ? 'md:-translate-y-4' : ''}`}
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
              <span className="font-display font-bold text-[21px]">{tier.name}</span>
              <span className="font-display font-extrabold text-[32px]">
                {tier.price}
                <span className="text-[13px] font-medium text-soft-2">{tier.suffix}</span>
              </span>
              <ul className="m-0 pl-[18px] text-sm leading-[2] text-soft">
                {tier.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <Button
                variant={tier.premium ? 'primary' : 'glass'}
                fullWidth
                disabled={authLoading || busy === tier.id}
                onClick={() => handleTier(tier.id)}
              >
                {busy === tier.id ? 'Redirecting�' : tier.cta}
              </Button>
            </GlassPanel>
          ))}
        </div>
        <p data-reveal className="text-center text-[13px] text-soft-2 mt-8 max-w-[560px] mx-auto">
          Founding members get the closed Circle built into Fempire.Love, not a third party app.
        </p>
      </div>

      <div className="max-w-site mx-auto px-[22px] pb-10">
        <GlassPanel className="p-8 sm:p-10 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-xl mb-2">Just want one webinar?</h3>
            <p className="text-soft text-[14.5px] m-0 max-w-[420px]">
              Join a live session as a one time guest for $20 to $35, no membership required.
            </p>
          </div>
          <Button variant="glass" onClick={() => navigate('/webinars')}>
            Browse webinars
          </Button>
        </GlassPanel>
      </div>

      <div className="max-w-site mx-auto px-[22px] py-5 pb-15">
        <SectionHeading align="center" title="Compare what's included" className="mb-[34px]" />
        <GlassPanel className="overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {['Feature', 'Free', 'Community', 'Premium'].map((th, i) => (
                  <th
                    key={th}
                    className={`p-4 text-center font-display font-bold text-sm ${
                      i === 0 ? 'text-left text-soft' : 'text-cream'
                    }`}
                    style={{ borderBottom: '1px solid var(--glass-b)' }}
                  >
                    {th}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {compareRows.map((row) => (
                <tr key={row.feature} style={{ borderBottom: '1px solid var(--glass-b)' }}>
                  <td className="p-4 text-left text-soft text-[13.5px]">{row.feature}</td>
                  {[row.free, row.community, row.premium].map((val, i) => (
                    <td key={i} className="p-4 text-center text-[13.5px]">
                      {val ? (
                        <span className="text-mustard-hi font-bold">?</span>
                      ) : (
                        <span className="text-soft-2">�</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </GlassPanel>
      </div>

      <div className="max-w-[760px] mx-auto px-[22px] py-5 pb-[70px]">
        <h2 className="font-display font-bold text-[clamp(24px,4vw,32px)] text-center mb-[34px] tracking-tight">
          Questions
        </h2>
        {faqs.map((faq) => (
          <details key={faq.q} className="glass mb-3 p-5 sm:px-[22px]" open={faq.open}>
            <summary className="font-display font-semibold text-base cursor-pointer list-none">
              {faq.q}
            </summary>
            <p className="text-soft text-[14.5px] leading-[1.7] mt-3.5 m-0">{faq.a}</p>
          </details>
        ))}
      </div>
    </main>
  );
}
