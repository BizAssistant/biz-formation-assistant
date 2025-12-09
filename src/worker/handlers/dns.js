import { createDNSRecord, deleteDNSRecord, listDNSRecords } 
  from '../lib/cloudflare-dns.js';
import { queryDB } from '../lib/db.js';

export async function handleDNS(request, env, user) {
  const url = new URL(request.url);

  // GET /api/dns/:domain - List DNS records
  if (url.pathname.startsWith('/api/dns/') && request.method === 'GET') {
    const domain = url.pathname.split('/')[3];
    
    // Verify user owns domain
    const owns = await queryDB(env,
      'SELECT * FROM domains WHERE user_email = ? AND domain_name = ?',
      [user.email, domain]
    );

    if (!owns.length) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { 
        status: 403, headers: { 'Content-Type': 'application/json' } 
      });
    }

    const records = await listDNSRecords(domain, env);
    return new Response(JSON.stringify(records), { 
      headers: { 'Content-Type': 'application/json' } 
    });
  }

  // POST /api/dns/:domain - Create DNS record
  if (url.pathname.startsWith('/api/dns/') && request.method === 'POST') {
    const domain = url.pathname.split('/')[3];
    const { type, name, content, ttl } = await request.json();

    // Verify ownership
    const owns = await queryDB(env,
      'SELECT * FROM domains WHERE user_email = ? AND domain_name = ?',
      [user.email, domain]
    );

    if (!owns.length) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { 
        status: 403, headers: { 'Content-Type': 'application/json' } 
      });
    }

    const result = await createDNSRecord(domain, { type, name, content, ttl }, env);
    return new Response(JSON.stringify(result), { 
      headers: { 'Content-Type': 'application/json' } 
    });
  }

  return new Response('Not found', { status: 404 });
}
