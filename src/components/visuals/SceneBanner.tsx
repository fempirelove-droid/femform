import type { ReactNode } from 'react';

type Props = {
  src: string;
  alt: string;
  className?: string;
  overlay?: 'heavy' | 'soft' | 'none';
  children?: ReactNode;
};

/** Full-bleed brand photograph with a brand-safe veil. */
export function SceneBanner({
  src,
  alt,
  className = '',
  overlay = 'heavy',
  children,
}: Props) {
  const veil =
    overlay === 'none'
      ? 'transparent'
      : overlay === 'soft'
        ? 'linear-gradient(180deg, rgba(36,16,25,0.25) 0%, rgba(36,16,25,0.55) 100%)'
        : 'linear-gradient(115deg, rgba(36,16,25,0.72) 0%, rgba(110,13,46,0.55) 45%, rgba(36,16,25,0.75) 100%)';

  return (
    <div className={`relative overflow-hidden ${className}`.trim()}>
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover scale-105 scene-ken"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0" style={{ background: veil }} aria-hidden />
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
