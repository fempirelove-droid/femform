import { supabase } from './supabase';
import type { NewsletterSegment } from './segments';

export async function subscribeToNewsletter(input: {
  email: string;
  segment: NewsletterSegment;
  source?: string;
}) {
  const email = input.email.trim().toLowerCase();
  if (!email || !email.includes('@')) {
    throw new Error('Please enter a valid email.');
  }

  const { error } = await supabase.from('newsletter_subscribers').upsert(
    {
      email,
      segment: input.segment,
      source: input.source || 'site',
      consent_at: new Date().toISOString(),
    },
    { onConflict: 'email' },
  );

  if (error) {
    console.error('newsletter subscribe error:', error);
    throw new Error(error.message || 'Could not subscribe right now.');
  }
}
