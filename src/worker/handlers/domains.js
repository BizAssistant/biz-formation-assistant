import { searchNamecom, registerNamecom } from '../lib/namecom.js';
import { queryDB } from '../lib/db.js';

export async function handleDomains(request, env, user) {
  const url = new URL(request.url);
  const method = request.method;

  // GET /api/domains - List user's domains
  if (url.pathname === '/api/domains' && method === 'GET') {
    const domains = await queryDB(env, 
      'SELECT * FROM domains WHERE user_email = ?', 
      [user.email]
    );
    return new Response(JSON.stringify(domains), { 
      headers: { 'Content-Type': 'application/json' } 
    });
  }

  // POST /api/domains/search - Search availability
  if (url.pathname === '/api/domains/search' && method === 'POST') {
    const { domain } = await request.json();
    const result = await searchNamecom(domain, env);
    return new Response(JSON.stringify(result), { 
      headers: { 'Content-Type': 'application/json' } 
    });
  }

  // POST /api/domains/register - Register domain
  if (url.pathname === '/api/domains/register' && method === 'POST') {
    const body = await request.json();
    const { domain, years, tier } = body;

    // Validate tier
    const userTier = await queryDB(env, 
      'SELECT tier FROM users WHERE email = ?', 
      [user.email]
    );

    if (!userTier || userTier[0].tier === 'free') {
      return new Response(
        JSON.stringify({ error: 'Must upgrade to register domains' }), 
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Register via Name.com
    const result = await registerNamecom(domain, years, body.contact, env);
    
    if (result.success) {
      // Store in DB
      await queryDB(env, 
        `INSERT INTO domains (user_email, domain_name, registrar, registered_at, expires_at, status)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [user.email, domain, 'namecom', new Date().toISOString(), 
         new Date(Date.now() + years * 365 * 24 * 60 * 60 * 1000).toISOString(), 'active']
      );
    }

    return new Response(JSON.stringify(result), { 
      headers: { 'Content-Type': 'application/json' } 
    });
  }

  return new Response('Not found', { status: 404 });
}
