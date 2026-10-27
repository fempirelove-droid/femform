import { useState } from 'react';
import type { NavigateFn } from '@/types';
import { Bloom } from '@/components/Bloom';
import { Button, EyebrowChip, GlassPanel, SectionHeading, VoiceCard } from '@/components/ui';
import { useAnimeReveal } from '@/hooks/useAnimeReveal';
import { useAuth } from '@/hooks/useAuth';
import { MEMBERSHIP_COMPARE, MEMBERSHIP_FAQS, MEMBERSHIP_TIERS } from '@/lib/plans';
import { openCustomerPortal, startCheckout, type PlanId } from '@/lib/stripe';

type Props = {
  navigate: NavigateFn;
  /** Softer intro when this sits inside Community */
  context?: 'community' | 'standalone';
};

export function MembershipJoin({ navigate, context = 'community' }: Props) {
  const heroRef = useAnimeReveal<HTMLDivElement>({ staggerMs: 80 });
  const tiersRef = useAnimeReveal<HTMLDivElement>({ staggerMs: 90 });
  const { user, loading: authLoading } = useAuth();
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTier = async (tierId: string) => {
    setError(null);
    if (tierId === 'free') {
      navigate('/#newsletter');
      return;
    }
    if (!user) {
      navigate('/account?next=/community#join');
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
    <div>
      <div
        ref={heroRef}
        className="reveal-ready relative overflow-hidden pt-[60px] pb-8 text-center"
      >
        {context === 'community' && (
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-55"
            aria-hidden
          >
            <Bloom className="w-full max-w-[480px]" />
          </div>
        )}
        <div className="relative z-[1] max-w-site mx-auto px-[22px]">
          <EyebrowChip className="mb-5" data-reveal>
            {context === 'community' ? 'The Circle' : 'Join'}
          </EyebrowChip>
          <h1
            data-reveal
            className="font-display font-bold text-[clamp(34px,6.5vw,56px)] leading-[1.05] max-w-[640px] mx-auto mb-[18px] tracking-tight"
          >
            Free to start. Built to grow with you.
          </h1>
          <p data-reveal className="text-soft text-base max-w-[480px] mx-auto">
            The closed Circle is for Community and Premium members. Start free, then take a seat when
            it feels right.
          </p>
          {user && (
            <p data-reveal className="mt-4">
              <button className="btn-glass small" onClick={handlePortal} disabled={busy === 'portal'}>
                {busy === 'portal' ? 'Opening…' : 'Manage billing'}
              </button>
            </p>
          )}
          <div data-reveal className="flex justify-center mt-8">
            <VoiceCard
              quote="A seat where you do not have to explain yourself first."
              caption="The Circle, for women who get it."
              tilt={-2}
            />
          </div>
        </div>
      </div>

      <div id="join" ref={tiersRef} className="reveal-ready max-w-site mx-auto px-[22px] py-12 scroll-mt-28">
        {error && (
          <p className="text-center text-sm mb-6" style={{ color: 'var(--bougain)' }}>
            {error}
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1.1fr] gap-[18px] md:items-end">
          {MEMBERSHIP_TIERS.map((tier) => (
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
                {busy === tier.id ? 'Redirecting…' : tier.cta}
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

      <div className="max-w-site mx-auto px-[22px] py-5 pb-12">
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
              {MEMBERSHIP_COMPARE.map((row) => (
                <tr key={row.feature} style={{ borderBottom: '1px solid var(--glass-b)' }}>
                  <td className="p-4 text-left text-soft text-[13.5px]">{row.feature}</td>
                  {[row.free, row.community, row.premium].map((val, i) => (
                    <td key={i} className="p-4 text-center text-[13.5px]">
                      {val ? (
                        <span className="text-mustard-hi font-bold">Yes</span>
                      ) : (
                        <span className="text-soft-2">—</span>
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
        {MEMBERSHIP_FAQS.map((faq) => (
          <details key={faq.q} className="glass mb-3 p-5 sm:px-[22px]" open={faq.open}>
            <summary className="font-display font-semibold text-base cursor-pointer list-none">
              {faq.q}
            </summary>
            <p className="text-soft text-[14.5px] leading-[1.7] mt-3.5 m-0">{faq.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
