/**
 * Brand scenes in /public/media.
 * Prefer real photography (Unsplash/Pexels/Wikimedia) over AI.
 * Never use these on payment / pricing CTAs.
 * Credits: see public/media/CREDITS.txt
 */
export const MEDIA = {
  /** Home hero: coast with pink flowers (do not swap without asking) */
  heroCoast: '/media/hero-curacao-coast.jpg',
  /** Soft nature serenity for vision / Why this matters */
  natureSerenity: '/media/nature-serenity.jpg',
  /** Turquoise Curaçao water, nature, no cityscape */
  curacaoSea: '/media/curacao-turquoise.jpg',
  /** Aerial Knip / Kenepa for island mood */
  curacaoAerial: '/media/curacao-knip-aerial.jpg',
  /** Real Kenepa beach when we need island nature (not hero) */
  curacaoKenepa: '/media/curacao-kenepa.jpg',
  /** Bright Caribbean paradise / peace (track cards) */
  caribbeanParadise: '/media/caribbean-paradise.jpg',
  caribbeanPeace: '/media/caribbean-peace.jpg',
  bougainvillea: '/media/scene-bougainvillea.jpg',
  coachRoom: '/media/coach-room-light.jpg',
  circleLight: '/media/circle-light.jpg',
  /** Aliases */
  heroDusk: '/media/hero-curacao-coast.jpg',
  coachStill: '/media/coach-room-light.jpg',
  circleOrbs: '/media/circle-light.jpg',
  bloomTexture: '/media/scene-bougainvillea.jpg',
  /** @deprecated buildings shot — do not use for webinars / vision */
  willemstad: '/media/curacao-turquoise.jpg',
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

export function coverForTopic(slug?: string | null): string {
  if (!slug) return MEDIA.bougainvillea;
  switch (slug) {
    case 'hormones-cycle':
    case 'the-change':
    case 'motherhood':
      return MEDIA.bougainvillea;
    case 'mind-wellness':
    case 'body-wisdom':
      return MEDIA.natureSerenity;
    case 'women-in-history':
      return MEDIA.curacaoAerial;
    case 'tech-for-women':
    case 'did-you-know':
      return MEDIA.curacaoKenepa;
    default:
      return MEDIA.bougainvillea;
  }
}
