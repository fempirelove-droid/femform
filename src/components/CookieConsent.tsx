import { useState, useEffect } from 'react';

const CONSENT_KEY = 'fempire-cookie-consent';

export function hasAnalyticsConsent(): boolean {
  return localStorage.getItem(CONSENT_KEY) === 'accepted';
}

function loadAnalyticsIfAllowed() {
  if (!hasAnalyticsConsent()) return;
  if (document.getElementById('fempire-analytics')) return;
  const marker = document.createElement('meta');
  marker.id = 'fempire-analytics';
  marker.name = 'fempire-analytics-consent';
  marker.content = 'accepted';
  document.head.appendChild(marker);
  window.dispatchEvent(new CustomEvent('fempire:analytics-consent'));
}

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (consent === 'accepted') {
      loadAnalyticsIfAllowed();
      return;
    }
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setShow(false);
    loadAnalyticsIfAllowed();
  };

  const decline = () => {
    localStorage.setItem(CONSENT_KEY, 'declined');
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
        <p className="text-[13px] sm:text-[13.5px] text-cream leading-[1.65] m-0">
          We use essential cookies to make the site work, and analytics cookies to understand what
          content resonates. Read our{' '}
          <a href="/privacy" className="text-mustard-hi underline underline-offset-2 hover:text-cream">
            privacy policy
          </a>
          .
        </p>
        <div className="flex flex-col xs:flex-row gap-2 w-full sm:flex-row">
          <button className="btn-glass small w-full sm:w-auto flex-1 sm:flex-none" onClick={decline}>
            Essential only
          </button>
          <button className="btn-primary small w-full sm:w-auto flex-1 sm:flex-none" onClick={accept}>
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
