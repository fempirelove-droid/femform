export type NewsletterSegment =
  | 'curacao'
  | 'caribbean_suriname'
  | 'diaspora_international';

export const SEGMENT_OPTIONS: { value: NewsletterSegment; label: string }[] = [
  { value: 'curacao', label: 'Curaçao' },
  { value: 'caribbean_suriname', label: 'Caribbean or Suriname' },
  { value: 'diaspora_international', label: 'Elsewhere / diaspora' },
];

export function segmentSuccessMessage(segment: NewsletterSegment): string {
  switch (segment) {
    case 'curacao':
      return "You're in. We'll share island-side notes too — gently, when it feels right.";
    case 'caribbean_suriname':
      return "You're in. Your journey stays fully digital, with a community that knows the region.";
    case 'diaspora_international':
      return "You're in. A little closer to home, wherever you've landed.";
  }
}
