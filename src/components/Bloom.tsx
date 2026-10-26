import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '@/lib/motion';

export function Bloom({ className = '' }: { className?: string }) {
  const ref = useRef<SVGSVGElement | null>(null);
  const [spin, setSpin] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setSpin(false);
      return;
    }
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) {
      setSpin(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setSpin(!!entry?.isIntersecting),
      { threshold: 0.05 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <svg
      ref={ref}
      viewBox="0 0 500 500"
      role="img"
      aria-label="Abstract bougainvillea bloom in the Fempire palette"
      className={`${className} ${spin ? 'animate-spin-slow' : ''}`.trim()}
    >
      <defs>
        <radialGradient id="pPink" cx="50%" cy="28%" r="78%">
          <stop offset="0%" stopColor="#FF9EBB" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#C43D68" stopOpacity="0.04" />
        </radialGradient>
        <radialGradient id="pGold" cx="50%" cy="28%" r="78%">
          <stop offset="0%" stopColor="#E3B564" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#C68A2E" stopOpacity="0.04" />
        </radialGradient>
        <radialGradient id="pBurg" cx="50%" cy="28%" r="78%">
          <stop offset="0%" stopColor="#F2789C" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#9E1345" stopOpacity="0.04" />
        </radialGradient>
        <radialGradient id="pBlush" cx="50%" cy="28%" r="78%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#F4C6D3" stopOpacity="0.04" />
        </radialGradient>
      </defs>
      <g style={{ mixBlendMode: 'screen' }}>
        {[
          'rotate(0 250 250)',
          'rotate(51.43 250 250)',
          'rotate(102.86 250 250)',
          'rotate(154.29 250 250)',
          'rotate(205.71 250 250)',
          'rotate(257.14 250 250)',
          'rotate(308.57 250 250)',
        ].map((transform, i) => {
          const fill = [
            'url(#pPink)',
            'url(#pGold)',
            'url(#pBurg)',
            'url(#pBlush)',
            'url(#pPink)',
            'url(#pGold)',
            'url(#pBurg)',
          ][i];
          return (
            <ellipse key={i} cx="250" cy="145" rx="98" ry="145" fill={fill} transform={transform} />
          );
        })}
      </g>
      <circle cx="250" cy="250" r="26" fill="#FBF2ED" opacity="0.92" />
    </svg>
  );
}
