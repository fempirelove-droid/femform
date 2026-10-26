import { useState } from 'react';
import { Button } from '@/components/ui';
import {
  SEGMENT_OPTIONS,
  segmentSuccessMessage,
  type NewsletterSegment,
} from '@/lib/segments';
import { subscribeToNewsletter } from '@/lib/newsletter';

type Props = {
  source?: string;
  onNavigatePrivacy?: () => void;
  compact?: boolean;
  className?: string;
};

export function NewsletterForm({
  source = 'footer',
  onNavigatePrivacy,
  compact,
  className = '',
}: Props) {
  const [email, setEmail] = useState('');
  const [segment, setSegment] = useState<NewsletterSegment>('curacao');
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [joinedSegment, setJoinedSegment] = useState<NewsletterSegment | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!consent) {
      setError('Please accept the privacy policy to continue.');
      return;
    }
    setBusy(true);
    try {
      await subscribeToNewsletter({ email, segment, source });
      setJoinedSegment(segment);
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  if (done && joinedSegment) {
    return (
      <p className="text-soft text-sm leading-relaxed max-w-[360px]">
        {segmentSuccessMessage(joinedSegment)}
      </p>
    );
  }

  return (
    <form
      id={source === 'footer' ? 'newsletter' : undefined}
      className={`flex flex-col gap-2.5 ${compact ? 'max-w-[360px]' : 'max-w-[320px]'} ${className}`}
      onSubmit={onSubmit}
    >
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="field-input"
        required
        autoComplete="email"
      />
      <label className="sr-only" htmlFor={`segment-${source}`}>
        Where are you joining from?
      </label>
      <select
        id={`segment-${source}`}
        aria-label="Where are you joining from?"
        className="field-input"
        value={segment}
        onChange={(e) => setSegment(e.target.value as NewsletterSegment)}
      >
        {SEGMENT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <p className="text-[11.5px] text-soft-2 m-0 -mt-1">Where are you joining from?</p>
      <label className="flex items-start gap-2 text-[12px] text-soft-2 leading-[1.5]">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          required
          className="mt-[2px] flex-shrink-0"
        />
        <span>
          I agree to receive emails and accept the{' '}
          <a
            href="/privacy"
            className="text-soft hover:text-cream no-underline"
            onClick={(e) => {
              if (onNavigatePrivacy) {
                e.preventDefault();
                onNavigatePrivacy();
              }
            }}
          >
            privacy policy
          </a>
          .
        </span>
      </label>
      {error && (
        <p className="text-[12.5px] m-0" style={{ color: 'var(--bougain)' }}>
          {error}
        </p>
      )}
      <Button type="submit" size="small" disabled={busy}>
        {busy ? 'Subscribing…' : 'Subscribe'}
      </Button>
    </form>
  );
}
