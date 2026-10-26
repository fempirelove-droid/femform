import { useState } from 'react';
import type { NavigateFn } from '@/types';
import { useSEO } from '@/hooks/useSEO';
import { Button, EyebrowChip, GlassPanel } from '@/components/ui';
import { NewsletterForm } from '@/components/NewsletterForm';
import { useAnimeReveal } from '@/hooks/useAnimeReveal';
import { supabase } from '@/lib/supabase';

type Props = { navigate: NavigateFn };

export function ContactPage({ navigate }: Props) {
  const ref = useAnimeReveal<HTMLElement>({ staggerMs: 70 });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useSEO({
    title: 'Contact · Fempire.Love',
    description: 'Reach the Fempire.Love team: questions, partnerships, or a warm hello.',
    canonical: '/contact',
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const { error: insertError } = await supabase.from('contact_messages').insert({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        message: message.trim(),
      });
      if (insertError) throw insertError;
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send your message.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <main ref={ref} className="reveal-ready max-w-site mx-auto px-[22px] pt-[60px] pb-20">
      <EyebrowChip className="mb-5" data-reveal>
        Contact
      </EyebrowChip>
      <h1
        data-reveal
        className="font-display font-bold text-[clamp(34px,6vw,52px)] leading-[1.05] tracking-tight mb-4 max-w-[640px]"
      >
        Say hello. We read every note.
      </h1>
      <p data-reveal className="text-soft text-[16.5px] leading-[1.75] max-w-[520px] mb-12">
        Partnerships, press, coaching questions, or just a warm hello. We&apos;re here.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassPanel data-reveal className="p-8">
          <h2 className="font-display font-bold text-xl mb-5">Send a message</h2>
          {done ? (
            <p className="text-soft text-[15px] leading-[1.7]">
              Thank you. We&apos;ll get back to you as soon as we can, my lovely.
            </p>
          ) : (
            <form className="flex flex-col gap-3" onSubmit={onSubmit}>
              <input
                className="field-input"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                className="field-input"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <textarea
                className="field-input min-h-[140px] resize-y"
                placeholder="How can we help?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              {error && (
                <p className="text-[13px] m-0" style={{ color: 'var(--bougain)' }}>
                  {error}
                </p>
              )}
              <Button type="submit" disabled={busy}>
                {busy ? 'Sending…' : 'Send message'}
              </Button>
            </form>
          )}
        </GlassPanel>

        <div className="flex flex-col gap-4">
          <GlassPanel data-reveal className="p-8">
            <h2 className="font-display font-bold text-xl mb-3">Email</h2>
            <p className="text-soft text-sm leading-[1.7] m-0 mb-4">
              Prefer a direct line? Write to{' '}
              <a href="mailto:hello@fempire.love" className="text-bougain no-underline hover:text-cream">
                hello@fempire.love
              </a>
              .
            </p>
            <Button variant="glass" size="small" onClick={() => navigate('/coach')}>
              Meet the coach
            </Button>
          </GlassPanel>
          <GlassPanel data-reveal className="p-8">
            <h2 className="font-display font-bold text-xl mb-3">Newsletter</h2>
            <p className="text-soft text-sm leading-[1.7] mb-4">
              One warm letter at a time. Tell us where you&apos;re joining from so we can meet you
              there.
            </p>
            <NewsletterForm
              source="contact"
              onNavigatePrivacy={() => navigate('/privacy')}
            />
          </GlassPanel>
        </div>
      </div>
    </main>
  );
}
