import { useEffect, useRef } from 'react';
import { prefersReducedMotion, reveal, type RevealOptions } from '@/lib/motion';

type Options = RevealOptions & {
  /** Only animate when the root enters the viewport */
  once?: boolean;
  rootMargin?: string;
  threshold?: number;
};

/**
 * Attach to a container. Children with `[data-reveal]` (or the container itself)
 * animate in when visible.
 */
export function useAnimeReveal<T extends HTMLElement = HTMLDivElement>(options: Options = {}) {
  const ref = useRef<T | null>(null);
  const played = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const run = () => {
      if (played.current && options.once !== false) return;
      played.current = true;
      const targets = el.querySelectorAll('[data-reveal]');
      if (targets.length > 0) {
        reveal(targets, options);
      } else {
        reveal(el, options);
      }
    };

    if (prefersReducedMotion()) {
      const targets = el.querySelectorAll('[data-reveal]');
      if (targets.length > 0) {
        targets.forEach((node) => {
          (node as HTMLElement).style.opacity = '1';
          (node as HTMLElement).style.transform = 'none';
        });
      } else {
        el.style.opacity = '1';
        el.style.transform = 'none';
      }
      return;
    }

    if (!('IntersectionObserver' in window)) {
      run();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            run();
            if (options.once !== false) observer.disconnect();
          }
        });
      },
      {
        rootMargin: options.rootMargin ?? '0px 0px -8% 0px',
        threshold: options.threshold ?? 0.12,
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options.delay, options.duration, options.staggerMs, options.y, options.once, options.rootMargin, options.threshold]);

  return ref;
}

/** Marks children as pre-hidden for anime reveal (SSR/hydration safe via CSS). */
export const revealReadyClass = 'reveal-ready';
