/** Brand scenes live in /public/media. Never use these on payment / pricing CTAs. */
export const MEDIA = {
  heroDusk: '/media/hero-dusk-coast.jpg',
  coachStill: '/media/coach-still-life.jpg',
  circleOrbs: '/media/circle-orbs.jpg',
  bloomTexture: '/media/bloom-texture.jpg',
} as const;

export type TopicSlug =
  | 'hormones-cycle'
  | 'the-change'
  | 'motherhood'
  | 'mind-wellness'
  | 'body-wisdom'
  | 'did-you-know'
  | 'women-in-history'
  | 'tech-for-women'
  | string;

/** Soft cover fallbacks by topic: bloom texture tinted via CSS, plus motif. */
export function coverForTopic(slug?: string | null): string {
  if (!slug) return MEDIA.bloomTexture;
  switch (slug) {
    case 'hormones-cycle':
    case 'the-change':
    case 'motherhood':
      return MEDIA.bloomTexture;
    case 'mind-wellness':
    case 'body-wisdom':
      return MEDIA.circleOrbs;
    case 'women-in-history':
    case 'tech-for-women':
      return MEDIA.heroDusk;
    default:
      return MEDIA.bloomTexture;
  }
}
