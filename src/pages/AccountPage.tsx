import { useEffect, useState } from 'react';
import type { NavigateFn } from '@/types';
import { useSEO } from '@/hooks/useSEO';
import { Button, EyebrowChip, GlassPanel } from '@/components/ui';
import { useAuth } from '@/hooks/useAuth';
import { openCustomerPortal } from '@/lib/stripe';
import { CALENDLY_URL } from '@/lib/calendly';

type Props = { navigate: NavigateFn };

export function AccountPage({ navigate }: Props) {
  const { user, loading, tier, signInWithMagicLink, signOut } = useAuth();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useSEO({
    title: 'Account · Fempire.Love',
    description: 'Sign in to Fempire.Love with a magic link. Manage membership and coaching.',
    canonical: '/account',
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('checkout') === 'success') {
      // soft note via URL; profile refresh happens in useAuth
    }
  }, []);

  const onMagic = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const { error: err } = await signInWithMagicLink(email);
    setBusy(false);
    if (err) setError(err);
    else setSent(true);
  };

  const next = new URLSearchParams(window.location.search).get('next') || '/membership';

  if (loading) {
    return (
      <main className="min-h-[50vh] flex items-center justify-center">
        <p className="text-soft text-sm">Loading…</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="max-w-[480px] mx-auto px-[22px] pt-[70px] pb-20">
        <EyebrowChip className="mb-5">Account</EyebrowChip>
        <h1 className="font-display font-bold text-[clamp(30px,5vw,42px)] leading-[1.08] mb-3">
          Sign in with email
        </h1>
        <p className="text-soft text-[15px] leading-[1.7] mb-8">
          No password. We&apos;ll send a magic link. Open it, and you&apos;re in.
        </p>
        <GlassPanel className="p-7">
          {sent ? (
            <p className="text-soft text-[15px] leading-[1.7] m-0">
              Check your inbox for the link. After you sign in, we&apos;ll bring you back to{' '}
              <span className="text-cream">{next}</span>.
            </p>
          ) : (
            <form className="flex flex-col gap-3" onSubmit={onMagic}>
              <input
                type="email"
                className="field-input"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {error && (
                <p className="text-[13px] m-0" style={{ color: 'var(--bougain)' }}>
                  {error}
                </p>
              )}
              <Button type="submit" disabled={busy}>
                {busy ? 'Sending…' : 'Email me a magic link'}
              </Button>
            </form>
          )}
        </GlassPanel>
      </main>
    );
  }

  return (
    <main className="max-w-[640px] mx-auto px-[22px] pt-[60px] pb-20">
      <EyebrowChip className="mb-5">Your account</EyebrowChip>
      <h1 className="font-display font-bold text-[clamp(30px,5vw,42px)] leading-[1.08] mb-2">
        Welcome back
      </h1>
      <p className="text-soft text-sm mb-8">{user.email}</p>

      <div className="flex flex-col gap-4">
        <GlassPanel className="p-7">
          <h2 className="font-display font-bold text-lg mb-2">Membership</h2>
          <p className="text-soft text-sm mb-4 capitalize">
            Current tier: <span className="text-cream font-semibold">{tier}</span>
          </p>
          <div className="flex flex-wrap gap-2.5">
            {tier === 'free' && (
              <Button size="small" onClick={() => navigate('/membership')}>
                Upgrade
              </Button>
            )}
            {tier !== 'free' && (
              <Button
                size="small"
                variant="glass"
                onClick={async () => {
                  try {
                    await openCustomerPortal();
                  } catch (e) {
                    setError(e instanceof Error ? e.message : 'Portal unavailable');
                  }
                }}
              >
                Manage billing
              </Button>
            )}
            {tier === 'premium' && (
              <Button
                size="small"
                variant="glass"
                onClick={() => window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer')}
              >
                Book coaching
              </Button>
            )}
          </div>
          {error && (
            <p className="text-[13px] mt-3 mb-0" style={{ color: 'var(--bougain)' }}>
              {error}
            </p>
          )}
        </GlassPanel>

        <GlassPanel className="p-7 flex flex-wrap gap-3 justify-between items-center">
          <p className="text-soft text-sm m-0">Signed in securely via magic link.</p>
          <Button
            size="small"
            variant="glass"
            onClick={async () => {
              await signOut();
              navigate('/');
            }}
          >
            Sign out
          </Button>
        </GlassPanel>
      </div>
    </main>
  );
}
