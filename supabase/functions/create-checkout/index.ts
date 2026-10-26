import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';
import Stripe from 'https://esm.sh/stripe@17.3.1?target=deno';

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });

  try {
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeKey) {
      return json({ error: 'Stripe is not configured yet.' }, 503);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } },
    );

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) return json({ error: 'Unauthorized' }, 401);

    const body = await req.json();
    const stripe = new Stripe(stripeKey, { apiVersion: '2024-11-20.acacia' });

    const admin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data: profile } = await admin
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    let customerId = profile?.stripe_customer_id as string | null;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email || undefined,
        metadata: { supabase_user_id: user.id },
      });
      customerId = customer.id;
      await admin
        .from('profiles')
        .upsert({ id: user.id, email: user.email, stripe_customer_id: customerId });
    }

    if (body.mode === 'subscription') {
      const priceId =
        body.plan === 'premium'
          ? Deno.env.get('STRIPE_PRICE_PREMIUM')
          : Deno.env.get('STRIPE_PRICE_COMMUNITY');
      if (!priceId) return json({ error: 'Price IDs are not configured.' }, 503);

      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        customer: customerId,
        line_items: [{ price: priceId, quantity: 1 }],
        success_url: body.successUrl,
        cancel_url: body.cancelUrl,
        metadata: { supabase_user_id: user.id, plan: body.plan },
      });
      return json({ url: session.url });
    }

    if (body.mode === 'payment') {
      const amount = Math.round(Number(body.priceUsd) * 100);
      if (!amount || amount < 500) return json({ error: 'Invalid ticket price.' }, 400);

      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        customer: customerId,
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: 'usd',
              unit_amount: amount,
              product_data: {
                name: `Webinar ticket: ${body.webinarId}`,
                description: 'Fempire.Love single webinar access',
              },
            },
          },
        ],
        success_url: body.successUrl,
        cancel_url: body.cancelUrl,
        metadata: {
          supabase_user_id: user.id,
          webinar_id: body.webinarId,
          kind: 'webinar',
        },
      });
      return json({ url: session.url });
    }

    return json({ error: 'Unknown checkout mode.' }, 400);
  } catch (e) {
    console.error(e);
    return json({ error: e instanceof Error ? e.message : 'Checkout failed' }, 500);
  }
});

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...cors, 'Content-Type': 'application/json' },
  });
}
