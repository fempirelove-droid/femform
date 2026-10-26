const CONSENT_KEY = 'fempire-cookie-consent';

export function hasAnalyticsConsent(): boolean {
  if (typeof localStorage === 'undefined') return false;
  return localStorage.getItem(CONSENT_KEY) === 'accepted';
}

export function setAnalyticsConsent(value: 'accepted' | 'declined') {
  localStorage.setItem(CONSENT_KEY, value);
}

export { CONSENT_KEY };
