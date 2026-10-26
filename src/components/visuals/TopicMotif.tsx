import type { TopicSlug } from '@/lib/media';

type Props = {
  slug: TopicSlug;
  className?: string;
  size?: number;
};

/** Animated SVG motif matched to each Circle topic. Not a stock icon set. */
export function TopicMotif({ slug, className = '', size = 56 }: Props) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 64 64',
    className: `topic-motif ${className}`.trim(),
    role: 'img' as const,
    'aria-hidden': true as const,
  };

  switch (slug) {
    case 'hormones-cycle':
      return (
        <svg {...common} aria-label="Cycle motif">
          <defs>
            <radialGradient id="hcCore" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FF9EBB" />
              <stop offset="100%" stopColor="#9E1345" />
            </radialGradient>
          </defs>
          <circle cx="32" cy="32" r="22" fill="none" stroke="rgba(255,158,187,0.35)" strokeWidth="1.5" className="motif-ring" />
          <circle cx="32" cy="32" r="12" fill="url(#hcCore)" className="motif-pulse" />
          <circle cx="32" cy="10" r="3.5" fill="#E3B564" className="motif-orbit" />
        </svg>
      );
    case 'the-change':
      return (
        <svg {...common} aria-label="The Change motif">
          <path
            d="M18 44c4-14 10-24 14-28 4 4 10 14 14 28"
            fill="none"
            stroke="#E3B564"
            strokeWidth="2.2"
            strokeLinecap="round"
            className="motif-draw"
          />
          <circle cx="32" cy="18" r="5" fill="#F2789C" className="motif-pulse" />
          <path d="M22 44h20" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'motherhood':
      return (
        <svg {...common} aria-label="Motherhood motif">
          <circle cx="28" cy="30" r="14" fill="rgba(242,120,156,0.35)" className="motif-pulse" />
          <circle cx="40" cy="34" r="9" fill="rgba(255,158,187,0.55)" className="motif-float" />
          <path
            d="M18 46c6-4 14-4 20 0"
            fill="none"
            stroke="#F4C6D3"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'mind-wellness':
      return (
        <svg {...common} aria-label="Mind motif">
          <ellipse cx="32" cy="34" rx="16" ry="14" fill="rgba(158,19,69,0.45)" />
          <path
            d="M20 30c4-10 10-14 12-14s8 4 12 14"
            fill="none"
            stroke="#FF9EBB"
            strokeWidth="2"
            className="motif-draw"
          />
          <circle cx="26" cy="34" r="2" fill="#FBF2ED" className="motif-blink" />
          <circle cx="38" cy="34" r="2" fill="#FBF2ED" className="motif-blink" />
        </svg>
      );
    case 'body-wisdom':
      return (
        <svg {...common} aria-label="Body wisdom motif">
          <path
            d="M32 10c8 8 14 16 14 26a14 14 0 1 1-28 0c0-10 6-18 14-26z"
            fill="rgba(244,198,211,0.35)"
            stroke="#F4C6D3"
            strokeWidth="1.5"
            className="motif-pulse"
          />
          <circle cx="32" cy="36" r="4" fill="#E3B564" />
        </svg>
      );
    case 'did-you-know':
      return (
        <svg {...common} aria-label="Did you know motif">
          <circle cx="32" cy="28" r="14" fill="rgba(227,181,100,0.25)" stroke="#E3B564" strokeWidth="1.5" className="motif-pulse" />
          <path d="M32 18v12" stroke="#FBF2ED" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="32" cy="36" r="1.8" fill="#FBF2ED" />
          <circle cx="32" cy="48" r="2.5" fill="#C68A2E" className="motif-float" />
        </svg>
      );
    case 'women-in-history':
      return (
        <svg {...common} aria-label="History motif">
          <path
            d="M16 48V20l16-8 16 8v28"
            fill="none"
            stroke="#FF9EBB"
            strokeWidth="1.8"
            className="motif-draw"
          />
          <path d="M24 48V28h16v20" fill="rgba(96,23,51,0.5)" stroke="#E3B564" strokeWidth="1.2" />
          <circle cx="32" cy="18" r="3" fill="#E3B564" className="motif-pulse" />
        </svg>
      );
      case 'tech-for-women':
      return (
        <svg {...common} aria-label="Tech motif">
          <rect x="14" y="18" width="36" height="26" rx="4" fill="rgba(198,138,46,0.2)" stroke="#C68A2E" strokeWidth="1.5" />
          <path d="M22 28h8M22 34h14" stroke="#F4C6D3" strokeWidth="1.8" strokeLinecap="round" className="motif-draw" />
          <circle cx="44" cy="30" r="3" fill="#FF5C8A" className="motif-blink" />
        </svg>
      );
    default:
      return (
        <svg {...common} aria-label="Topic motif">
          <circle cx="32" cy="32" r="16" fill="rgba(255,92,138,0.35)" className="motif-pulse" />
          <circle cx="32" cy="32" r="6" fill="#FBF2ED" />
        </svg>
      );
  }
}
