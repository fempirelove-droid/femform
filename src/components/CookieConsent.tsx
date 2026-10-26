import { useState, useEffect } from 'react';

const CONSENT_KEY = 'fempire-cookie-consent';

export function hasAnalyticsConsent(): boolean {
  return localStorage.getItem(CONSENT_KEY) === 'accepted';
}

function loadAnalyticsIfAllowed() {
  if (!hasAnalyticsConsent()) return;
  // Gate for future GA / Hotjar scripts — only inject after consent.
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
      className="fixed bottom-4 left-4 right-4 z-[200] max-w-[480px] mx-auto"
      style={{ animation: 'rise 0.4s ease both' }}
    >
      <div className="glass p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <p className="text-[13px] text-soft leading-[1.6] flex-1 m-0">
          We use essential cookies to make the site work, and analytics cookies to understand what
          content resonates. You can read our{' '}
          <a href="/privacy" className="text-bougain no-underline hover:text-cream">
            privacy policy
          </a>{' '}
          for details.
        </p>
        <div className="flex gap-2.5 flex-shrink-0">
          <button className="btn-glass small" onClick={decline}>
            Essential only
          </button>
          <button className="btn-primary small" onClick={accept}>
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
