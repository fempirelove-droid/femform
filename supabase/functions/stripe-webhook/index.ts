import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';
import Stripe from 'https://esm.sh/stripe@17.3.1?target=deno';

Deno.serve(async (req) => {
  const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
  const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
  if (!stripeKey || !webhookSecret) {
    return new Response('Stripe not configured', { status: 503 });
  }

  const stripe = new Stripe(stripeKey, { apiVersion: '2024-11-20.acacia' });
  const signature = req.headers.get('stripe-signature');
  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature!, webhookSecret);
  } catch (err) {
    console.error('Webhook signature failed', err);
    return new Response('Invalid signature', { status: 400 });
  }

  const admin = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  );

  const premiumPrice = Deno.env.get('STRIPE_PRICE_PREMIUM');
  const communityPrice = Deno.env.get('STRIPE_PRICE_COMMUNITY');

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.supabase_user_id;
    if (session.mode === 'payment' && session.metadata?.kind === 'webinar' && userId) {
      await admin.from('webinar_tickets').insert({
        user_id: userId,
        email: session.customer_details?.email,
        webinar_id: session.metadata.webinar_id,
        amount_usd: (session.amount_total || 0) / 100,
        stripe_session_id: session.id,
      });
    }
  }

  if (
    event.type === 'customer.subscription.created' ||
    event.type === 'customer.subscription.updated' ||
    event.type === 'customer.subscription.deleted'
  ) {
    const sub = event.data.object as Stripe.Subscription;
    const customerId = typeof sub.customer === 'string' ? sub.customer : sub.customer.id;
    const { data: profile } = await admin
      .from('profiles')
      .select('id')
      .eq('stripe_customer_id', customerId)
      .maybeSingle();

    if (profile) {
      const priceId = sub.items.data[0]?.price?.id;
      let plan: 'community' | 'premium' = 'community';
      if (priceId && premiumPrice && priceId === premiumPrice) plan = 'premium';
      if (priceId && communityPrice && priceId === communityPrice) plan = 'community';

      const active = ['active', 'trialing'].includes(sub.status);
      const tier = active ? plan : 'free';

      await admin.from('subscriptions').upsert(
        {
          user_id: profile.id,
          stripe_subscription_id: sub.id,
          stripe_price_id: priceId,
          plan,
          status: sub.status,
          current_period_end: new Date((sub.current_period_end || 0) * 1000).toISOString(),
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'stripe_subscription_id' },
      );

      await admin
        .from('profiles')
        .update({ tier, updated_at: new Date().toISOString() })
        .eq('id', profile.id);
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
});
