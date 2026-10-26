import { supabase } from './supabase';

export type PlanId = 'community' | 'premium';
export type CheckoutKind = PlanId | 'webinar';

const FUNCTIONS_BASE = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1`;

async function authHeaders() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.access_token) {
    throw new Error('Please sign in first.');
  }
  return {
    Authorization: `Bearer ${session.access_token}`,
    apikey: import.meta.env.VITE_SUPABASE_ANON_KEY as string,
    'Content-Type': 'application/json',
  };
}

async function postCheckout(body: Record<string, unknown>) {
  const headers = await authHeaders();
  const res = await fetch(`${FUNCTIONS_BASE}/create-checkout`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
  const json = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
  if (!res.ok || !json.url) {
    throw new Error(json.error || 'Checkout is not available yet. Please try again later.');
  }
  window.location.href = json.url;
}

export async function startCheckout(plan: PlanId) {
  return postCheckout({
    mode: 'subscription',
    plan,
    successUrl: `${window.location.origin}/account?checkout=success`,
    cancelUrl: `${window.location.origin}/membership?checkout=cancel`,
  });
}

export async function startWebinarCheckout(webinarId: string, priceUsd: number) {
  return postCheckout({
    mode: 'payment',
    webinarId,
    priceUsd,
    successUrl: `${window.location.origin}/webinars?ticket=success`,
    cancelUrl: `${window.location.origin}/webinars?ticket=cancel`,
  });
}

export async function openCustomerPortal() {
  const headers = await authHeaders();
  const res = await fetch(`${FUNCTIONS_BASE}/create-portal`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      returnUrl: `${window.location.origin}/account`,
    }),
  });
  const json = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
  if (!res.ok || !json.url) {
    throw new Error(json.error || 'Billing portal is not available yet.');
  }
  window.location.href = json.url;
}
