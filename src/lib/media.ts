/** Brand scenes live in /public/media. Never use these on payment / pricing CTAs. */
export const MEDIA = {
  heroCoast: '/media/hero-curacao-coast.jpg',
  willemstad: '/media/scene-willemstad.jpg',
  bougainvillea: '/media/scene-bougainvillea.jpg',
  coachRoom: '/media/coach-room-light.jpg',
  circleLight: '/media/circle-light.jpg',
  /** @deprecated aliases kept so older refs keep working during rollout */
  heroDusk: '/media/hero-curacao-coast.jpg',
  coachStill: '/media/coach-room-light.jpg',
  circleOrbs: '/media/circle-light.jpg',
  bloomTexture: '/media/scene-bougainvillea.jpg',
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

/** Soft cover fallbacks by topic: bright Caribbean scenes, not dark red voids. */
export function coverForTopic(slug?: string | null): string {
  if (!slug) return MEDIA.bougainvillea;
  switch (slug) {
    case 'hormones-cycle':
    case 'the-change':
    case 'motherhood':
      return MEDIA.bougainvillea;
    case 'mind-wellness':
    case 'body-wisdom':
      return MEDIA.circleLight;
    case 'women-in-history':
      return MEDIA.willemstad;
    case 'tech-for-women':
    case 'did-you-know':
      return MEDIA.heroCoast;
    default:
      return MEDIA.bougainvillea;
  }
}
