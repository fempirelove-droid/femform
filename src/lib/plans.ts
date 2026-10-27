import type { PlanId } from '@/lib/stripe';

export const MEMBERSHIP_TIERS = [
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
] as const;

export const MEMBERSHIP_COMPARE = [
  { feature: 'Full article library', free: true, community: true, premium: true },
  { feature: 'Weekly newsletter', free: true, community: true, premium: true },
  { feature: 'Webinar replays', free: false, community: true, premium: true },
  { feature: 'Closed community', free: false, community: true, premium: true },
  { feature: 'Monthly live Q&A', free: false, community: true, premium: true },
  { feature: 'Quarterly 1:1 coaching', free: false, community: false, premium: true },
  { feature: 'Priority webinar seats', free: false, community: false, premium: true },
] as const;

export const MEMBERSHIP_FAQS = [
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
    a: "Yes. Part of every paid membership opens the door for a woman on Curaçao who can't afford it, because no one should be left out of this conversation.",
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
] as const;
