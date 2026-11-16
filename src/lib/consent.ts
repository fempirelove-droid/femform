const CONSENT_KEY = 'fempire-cookie-consent';
export const COOKIE_SETTINGS_EVENT = 'fempire-cookie-settings';

export function hasAnalyticsConsent(): boolean {
  if (typeof localStorage === 'undefined') return false;
  return localStorage.getItem(CONSENT_KEY) === 'accepted';
}

export function setAnalyticsConsent(value: 'accepted' | 'declined') {
  localStorage.setItem(CONSENT_KEY, value);
}

export function openCookieSettings() {
  if (typeof localStorage === 'undefined') return;
  localStorage.removeItem(CONSENT_KEY);
  window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT));
}

export { CONSENT_KEY };
