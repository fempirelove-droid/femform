import { useState, useEffect } from 'react';
import { loadAnalyticsIfAllowed } from '@/lib/analytics';
import { hasAnalyticsConsent, setAnalyticsConsent } from '@/lib/consent';

export { hasAnalyticsConsent };

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (hasAnalyticsConsent()) {
      loadAnalyticsIfAllowed();
      return;
    }
    const existing = localStorage.getItem('fempire-cookie-consent');
    if (!existing) {
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    setAnalyticsConsent('accepted');
    setShow(false);
    loadAnalyticsIfAllowed();
  };

  const decline = () => {
    setAnalyticsConsent('declined');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      className="cookie-bar fixed z-[200] left-3 right-3 bottom-3 sm:left-4 sm:right-auto sm:bottom-5 sm:max-w-[400px]"
      style={{ animation: 'rise 0.4s ease both' }}
      role="dialog"
      aria-label="Cookie preferences"
    >
      <div className="cookie-frost p-4 sm:p-5 flex flex-col gap-3.5">
        <p className="relative text-[13px] sm:text-[13.5px] leading-[1.65] m-0 font-medium">
          We use essential cookies to make the site work, and analytics cookies to understand what
          content resonates. Read our{' '}
          <a href="/privacy" className="underline underline-offset-2">
            privacy policy
          </a>
          .
        </p>
        <div className="relative flex flex-col gap-2 w-full sm:flex-row">
          <button className="btn-glass small w-full sm:w-auto" onClick={decline}>
            Essential only
          </button>
          <button className="btn-primary small w-full sm:w-auto" onClick={accept}>
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
