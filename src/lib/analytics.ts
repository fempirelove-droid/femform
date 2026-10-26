import { hasAnalyticsConsent } from '@/lib/consent';

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

/** Load GA4 only after cookie consent. Safe no-op if ID unset. */
export function loadAnalyticsIfAllowed() {
  if (!hasAnalyticsConsent() || !GA_ID) return;
  if (document.getElementById('fempire-ga')) return;

  const s = document.createElement('script');
  s.id = 'fempire-ga';
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);

  const boot = document.createElement('script');
  boot.id = 'fempire-ga-boot';
  boot.textContent = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_ID}', { anonymize_ip: true });
  `;
  document.head.appendChild(boot);
}

export function trackPageView(path: string) {
  if (!hasAnalyticsConsent() || !GA_ID) return;
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  gtag?.('event', 'page_view', { page_path: path });
}
