import type { ReactNode } from 'react';

type Props = {
  src: string;
  alt: string;
  className?: string;
  overlay?: 'heavy' | 'soft' | 'none';
  children?: ReactNode;
};

/** Full-bleed brand photograph with a light brand-safe veil (images stay visible). */
export function SceneBanner({
  src,
  alt,
  className = '',
  overlay = 'soft',
  children,
}: Props) {
  const veil =
    overlay === 'none'
      ? 'transparent'
      : overlay === 'soft'
        ? 'linear-gradient(180deg, rgba(36,16,25,0.12) 0%, rgba(96,23,51,0.28) 55%, rgba(36,16,25,0.42) 100%)'
        : 'linear-gradient(115deg, rgba(36,16,25,0.35) 0%, rgba(158,19,69,0.28) 45%, rgba(36,16,25,0.48) 100%)';

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
