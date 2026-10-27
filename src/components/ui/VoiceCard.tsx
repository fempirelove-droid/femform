import type { CSSProperties, ReactNode } from 'react';
import { GlassPanel } from './GlassPanel';

type Props = {
  quote: ReactNode;
  caption?: string;
  className?: string;
  style?: CSSProperties;
  tilt?: number;
  float?: boolean;
  children?: ReactNode;
};

/** Intimate glass quote card — same language as the hero voice card. Use sparingly. */
export function VoiceCard({
  quote,
  caption,
  className = '',
  style,
  tilt = -3,
  float = true,
  children,
}: Props) {
  const body =
    typeof quote === 'string' ? quote.replace(/^["“]|["”]$/g, '') : quote;

  return (
    <GlassPanel
      className={`p-6 max-w-[320px] ${float ? 'animate-float' : ''} ${className}`.trim()}
      style={{ transform: `rotate(${tilt}deg)`, ...style }}
    >
      <p className="font-display font-semibold text-[19px] leading-[1.45] mb-2.5 m-0">
        “{body}”
      </p>
      {caption && <span className="text-xs text-soft-2">{caption}</span>}
      {children}
    </GlassPanel>
  );
}
