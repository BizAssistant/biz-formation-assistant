import { queryDB } from '../lib/db.js';

const PRICING = {
  free: {
    name: 'Free Tier',
    price: 0,
    domains: 1,
    registrar: 'cloudflare',
    features: ['Basic DNS', 'Cloudflare Registrar']
  },
  standard: {
    name: 'Standard Tier',
    price: 29,
    domains: 5,
    registrar: 'namecom',
    features: ['Advanced DNS', 'Name.com Registration', 'Domain Privacy', 'Auto-renewal']
  },
  premium: {
    name: 'Premium Tier',
    price: 99,
    domains: -1, // unlimited
    registrar: 'namecom',
    features: ['Full DNS Control', 'Name.com Registration', 'Domain Privacy', 
               'Auto-renewal', 'Priority Support', 'Custom Records', 'SSL/TLS Management']
  }
};

export async function handlePricing(request, env, user) {
  const url = new URL(request.url);

  // GET /api/pricing - Get all pricing tiers
  if (url.pathname === '/api/pricing' && request.method === 'GET') {
    return new Response(JSON.stringify(PRICING), { 
      headers: { 'Content-Type': 'application/json' } 
    });
  }

  // POST /api/pricing/upgrade - Upgrade user tier
  if (url.pathname === '/api/pricing/upgrade' && request.method === 'POST') {
    const { tier } = await request.json();
    
    if (!PRICING[tier]) {
      return new Response(JSON.stringify({ error: 'Invalid tier' }), { 
        status: 400, headers: { 'Content-Type': 'application/json' } 
      });
    }

    await queryDB(env,
      'UPDATE users SET tier = ? WHERE email = ?',
      [tier, user.email]
    );

    return new Response(JSON.stringify({ success: true, tier }), { 
      headers: { 'Content-Type': 'application/json' } 
    });
  }

  // GET /api/pricing/user-tier - Get user's current tier
  if (url.pathname === '/api/pricing/user-tier' && request.method === 'GET') {
    const result = await queryDB(env,
      'SELECT tier FROM users WHERE email = ?',
      [user.email]
    );

    return new Response(JSON.stringify({ tier: result[0]?.tier || 'free' }), { 
      headers: { 'Content-Type': 'application/json' } 
    });
  }

  return new Response('Not found', { status: 404 });
}
