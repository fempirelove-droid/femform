import type { Category } from './types';

/** Always available so Explore never looks empty if the API is down. */
export const TOPIC_CATALOG: Category[] = [
  {
    id: 'local-hormones-cycle',
    slug: 'hormones-cycle',
    name: 'Hormones & Cycle',
    description: 'What really happens in your body, in plain language, including Queenerty energy.',
    sort_order: 1,
    glow_color: 'rgba(255,92,138,0.55)',
    orb_gradient: 'radial-gradient(circle at 30% 30%, #FF9EBB, #FF5C8A)',
  },
  {
    id: 'local-the-change',
    slug: 'the-change',
    name: 'The Change',
    description: 'Perimenopause, menopause, and the first signs no one warned you about.',
    sort_order: 2,
    glow_color: 'rgba(198,138,46,0.55)',
    orb_gradient: 'radial-gradient(circle at 30% 30%, #E3B564, #C68A2E)',
  },
  {
    id: 'local-motherhood',
    slug: 'motherhood',
    name: 'Motherhood',
    description: 'From pregnancy to mothering at a distance, without judgement.',
    sort_order: 3,
    glow_color: 'rgba(242,120,156,0.55)',
    orb_gradient: 'radial-gradient(circle at 30% 30%, #F4C6D3, #F2789C)',
  },
  {
    id: 'local-mind-wellness',
    slug: 'mind-wellness',
    name: 'Mind & Wellness',
    description: 'Burnout, anxiety, boundaries, and pragmatic exercises for mental peace.',
    sort_order: 4,
    glow_color: 'rgba(158,19,69,0.55)',
    orb_gradient: 'radial-gradient(circle at 30% 30%, #F2789C, #9E1345)',
  },
  {
    id: 'local-body-wisdom',
    slug: 'body-wisdom',
    name: 'Body Wisdom',
    description: 'Food, sleep, heat, and movement from a Caribbean women\'s perspective.',
    sort_order: 5,
    glow_color: 'rgba(244,198,211,0.55)',
    orb_gradient: 'radial-gradient(circle at 30% 30%, #FFFFFF, #F4C6D3)',
  },
  {
    id: 'local-did-you-know',
    slug: 'did-you-know',
    name: 'Did You Know',
    description: 'Short knowledge drops, the newsletter spirit in article form.',
    sort_order: 6,
    glow_color: 'rgba(227,181,100,0.45)',
    orb_gradient: 'radial-gradient(circle at 30% 30%, #E3B564, #9E1345)',
  },
  {
    id: 'local-women-in-history',
    slug: 'women-in-history',
    name: 'Women in History',
    description: 'Stories that matter for our lives, Caribbean and beyond.',
    sort_order: 7,
    glow_color: 'rgba(255,92,138,0.4)',
    orb_gradient: 'radial-gradient(circle at 30% 30%, #FF9EBB, #601733)',
  },
  {
    id: 'local-tech-for-women',
    slug: 'tech-for-women',
    name: 'Tech & Business',
    description: 'Tools, business tech, and digital confidence for women building.',
    sort_order: 8,
    glow_color: 'rgba(198,138,46,0.4)',
    orb_gradient: 'radial-gradient(circle at 30% 30%, #C68A2E, #241019)',
  },
];

export function mergeTopics(remote: Category[]): Category[] {
  if (!remote.length) return TOPIC_CATALOG;
  return remote;
}
