import Stripe from 'stripe';
import { DB } from './db.js'; // Assuming you have a DB module for D1

const stripe = new Stripe('your_stripe_secret_key');

export async function handleBilling(request, env, user) {
  const url = new URL(request.url);
  const path = url.pathname;

  if (path === '/api/billing/subscribe' && request.method === 'POST') {
    const { planId, paymentMethodId } = await request.json();

    try {
      // Create a customer in Stripe
      const customer = await stripe.customers.create({
        email: user.email,
        payment_method: paymentMethodId,
        invoice_settings: { default_payment_method: paymentMethodId }
      });

      // Subscribe the customer to a plan
      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ plan: planId }],
        expand: ['latest_invoice.payment_intent']
      });

      // Save subscription details in your database
      await DB.prepare('INSERT INTO subscriptions (user_id, stripe_customer_id, stripe_subscription_id, plan_id) VALUES (?, ?, ?, ?)')
        .bind(user.email, customer.id, subscription.id, planId)
        .run();

      return new Response(JSON.stringify({ success: true, subscription }), { headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
  }

  if (path === '/api/billing/cancel' && request.method === 'POST') {
    const { subscriptionId } = await request.json();

    try {
      // Cancel the subscription in Stripe
      const canceledSubscription = await stripe.subscriptions.del(subscriptionId);

      // Update subscription status in your database
      await DB.prepare('UPDATE subscriptions SET status = ? WHERE stripe_subscription_id = ?')
        .bind('canceled', subscriptionId)
        .run();

      return new Response(JSON.stringify({ success: true, subscription: canceledSubscription }), { headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
  }

  if (path === '/api/billing/invoice' && request.method === 'GET') {
    const { subscriptionId } = url.searchParams;

    try {
      // Retrieve the latest invoice for the subscription
      const subscription = await stripe.subscriptions.retrieve(subscriptionId, { expand: ['latest_invoice'] });
      const invoice = subscription.latest_invoice;

      return new Response(JSON.stringify({ invoice }), { headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
  }

  return new Response('Not found', { status: 404 });
}

