import { animate, stagger } from 'animejs';

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Instantly show elements that would otherwise wait on anime. */
export function showImmediately(targets: Element | Element[] | NodeListOf<Element> | string) {
  const nodes =
    typeof targets === 'string'
      ? Array.from(document.querySelectorAll(targets))
      : targets instanceof Element
        ? [targets]
        : Array.from(targets as ArrayLike<Element>);

  nodes.forEach((el) => {
    (el as HTMLElement).style.opacity = '1';
    (el as HTMLElement).style.transform = 'none';
  });
}

export type RevealOptions = {
  y?: number;
  duration?: number;
  delay?: number;
  staggerMs?: number;
  ease?: string;
};

function targetCount(targets: Element | Element[] | NodeListOf<Element> | string): number {
  if (typeof targets === 'string') return document.querySelectorAll(targets).length;
  if (targets instanceof Element) return 1;
  return (targets as ArrayLike<Element>).length;
}

/** Fade + rise reveal. No-ops when reduced motion is on. */
export function reveal(
  targets: Element | Element[] | NodeListOf<Element> | string,
  options: RevealOptions = {},
) {
  const {
    y = 18,
    duration = 700,
    delay = 0,
    staggerMs = 70,
    ease = 'outCubic',
  } = options;

  if (prefersReducedMotion()) {
    showImmediately(targets);
    return null;
  }

  const useStagger = targetCount(targets) > 1;

  return animate(targets, {
    opacity: [0, 1],
    translateY: [y, 0],
    duration,
    delay: useStagger ? stagger(staggerMs, { start: delay }) : delay,
    ease,
  });
}

export function settleIn(
  targets: Element | Element[] | string,
  options: { duration?: number; delay?: number } = {},
) {
  const { duration = 500, delay = 0 } = options;
  if (prefersReducedMotion()) {
    showImmediately(targets);
    return null;
  }
  return animate(targets, {
    opacity: [0, 1],
    translateY: [-6, 0],
    duration,
    delay,
    ease: 'outQuad',
  });
}
