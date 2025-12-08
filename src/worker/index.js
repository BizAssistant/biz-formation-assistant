import { verify } from '@cfworker/jwt';
import { handleDomains } from './handlers/domains.js';
import { handlePricing } from './handlers/pricing.js';
import { handleDNS } from './handlers/dns.js';
import { handleBilling } from './handlers/billing.js';
import { handleAdmin } from './handlers/admin.js';
import { handleProgress } from './handlers/progress.js';
import { handleReport } from './handlers/report.js';
import { handleAuthWhoAmI } from './handlers/auth.js';

const ROLE_MAP = {
  'bizform-admins': 'admin',
  'bizform-contributors': 'contributor',
  'bizform-superadmins': 'super-admin'
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // JWT verification
    const jwt = request.headers.get('Cf-Access-Jwt-Assertion');
    if (!jwt) return new Response('Unauthorized', { status: 401 });

    const { valid, payload } = await verify(jwt, env.CF_ACCESS_PUBLIC_KEY, { 
      audience: env.CF_ACCESS_AUD 
    });
    if (!valid) return new Response('Forbidden', { status: 403 });

    // RBAC via IdP groups
    let role = 'contributor';
    for (const group of payload.groups || []) {
      if (ROLE_MAP[group]) { role = ROLE_MAP[group]; break; }
    }
    const user = { email: payload.email, role };

    // Analytics
    await env.ANALYTICS_ENGINE.writeDataPoint({
      blobs: [user.email, user.role, path],
      doubles: [0],
      indexes: [Date.now()]
    });

    // Auth routes
    if (path === '/whoami') return handleAuthWhoAmI(user);

    // Domain routes
    if (path.startsWith('/api/domains')) return handleDomains(request, env, user);

    // Pricing routes
    if (path.startsWith('/api/pricing')) return handlePricing(request, env, user);

    // DNS routes
    if (path.startsWith('/api/dns')) return handleDNS(request, env, user);

    // Billing routes
    if (path.startsWith('/api/billing')) return handleBilling(request, env, user);

    // Progress routes
    if (path === '/save-progress' && request.method === 'POST') 
      return handleProgress.save(request, env, user);
    if (path.startsWith('/progress/') && request.method === 'GET') 
      return handleProgress.load(request, env, user);

    // Report routes
    if (path === '/report' && request.method === 'POST') 
      return handleReport.upload(request, env, user);
    if (path.startsWith('/download/') && request.method === 'GET') 
      return handleReport.download(request, env, user);
    if (path.startsWith('/report/') && request.method === 'DELETE') 
      return handleReport.delete(request, env, user);

    // Admin routes
    if (path.startsWith('/admin')) {
      if (role === 'admin' || role === 'super-admin') 
        return handleAdmin(request, env, user);
      return new Response('Forbidden', { status: 403 });
    }

    return new Response('Not found', { status: 404 });
  }
};
