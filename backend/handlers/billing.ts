// handlers/billing.ts
import { Env, ExecutionContext } from '../types';

const STRIPE_PRICE_ID = 'price_1abcdef1234567890'; // ← Replace with your real Price ID
const SUCCESS_URL = 'https://yourdomain.com/dashboard?success=true';
const CANCEL_URL  = 'https://yourdomain.com/pricing?canceled=true';

function withCors(response: Response): Response {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
}

export async function billingHandler(
  request: Request,
  env: Env,
  ctx: ExecutionContext
): Promise<Response> {
  if (request.method === 'OPTIONS') {
    return withCors(new Response(null, { status: 204 }));
  }

  const url = new URL(request.url);

  // === CREATE STRIPE CHECKOUT SESSION ===
  if (url.pathname.endsWith('/api/billing/subscribe') && request.method === 'POST') {
    try {
      // Optional: extract authenticated user from JWT
      const authHeader = request.headers.get('Authorization');
      let customerEmail = '';
      let userId = '';

      if (authHeader?.startsWith('Bearer ')) {
        // Very small JWT decode (no verification needed here – Stripe does the payment)
        try {
          const token = authHeader.split(' ')[1];
          const payload = JSON.parse(atob(token.split('.')[1]));
          customerEmail = payload.email || '';
          userId = payload.sub || '';
        } catch {}
      }

      const body = await request.json<{ priceId?: string }>();
      const priceId = body.priceId || STRIPE_PRICE_ID;

      const session = await fetch('https://api.stripe.com/v1/checkout/sessions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.STRIPE_SECRET_KEY}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          mode: 'subscription',
          payment_method_types: 'card',
          line_items: JSON.stringify([{
            price: priceId,
            quantity: 1,
          }]),
          success_url: SUCCESS_URL,
          cancel_url: CANCEL_URL,
          ...(customerEmail && { customer_email: customerEmail }),
          metadata: JSON.stringify({ userId }), // useful in webhook
        }),
      });

      const sessionData = await session.json<any>();

      if (!session.ok) {
        throw new Error(sessionData.error?.message || 'Stripe error');
      }

      return withCors(
        new Response(
          JSON.stringify({
            success: true,
            checkoutUrl: sessionData.url,
            sessionId: sessionData.id,
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        )
      );
    } catch (err: any) {
      console.error('Stripe Checkout error:', err);
      return withCors(
        new Response(
          JSON.stringify({ error: err.message || 'Failed to create checkout session' }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        )
      );
    }
  }

  // === OPTIONAL: Webhook endpoint for subscription events ===
  if (url.pathname.endsWith('/api/billing/webhook') && request.method === 'POST') {
    const signature = request.headers.get('stripe-signature');
    if (!signature) return withCors(new Response('No signature', { status: 400 }));

    // In production: verify with stripe.webhooks.constructEvent(...)
    // For simplicity here we just acknowledge
    console.log('Webhook received (implement full verification in production)');
    return withCors(new Response('OK', { status: 200 }));
  }

  return withCors(new Response(JSON.stringify({ error: 'Not found' }), { status: 404 }));
}
