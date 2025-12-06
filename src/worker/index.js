import { verify } from '@cfworker/jwt';
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

    // Access JWT required for all routes (you can exempt public ones if desired)
    const jwt = request.headers.get('Cf-Access-Jwt-Assertion');
    if (!jwt) return new Response('Unauthorized', { status: 401 });

    const { valid, payload } = await verify(jwt, env.CF_ACCESS_PUBLIC_KEY, { audience: env.CF_ACCESS_AUD });
    if (!valid) return new Response('Forbidden', { status: 403 });

    // RBAC via IdP groups
    let role = 'contributor';
    for (const group of payload.groups || []) {
      if (ROLE_MAP[group]) { role = ROLE_MAP[group]; break; }
    }
    const user = { email: payload.email, role };

    // Observability datapoint
    await env.ANALYTICS_ENGINE.writeDataPoint({
      blobs: [user.email, user.role, url.pathname],
      doubles: [0],
      indexes: [Date.now()]
    });

    // Routes
    if (url.pathname === '/whoami') return handleAuthWhoAmI(user);

    if (url.pathname === '/save-progress' && request.method === 'POST') return handleProgress.save(request, env, user);
    if (url.pathname.startsWith('/progress/') && request.method === 'GET') return handleProgress.load(request, env, user);

    if (url.pathname === '/report' && request.method === 'POST') return handleReport.upload(request, env, user);
    if (url.pathname.startsWith('/download/') && request.method === 'GET') return handleReport.download(request, env, user);
    if (url.pathname.startsWith('/report/') && request.method === 'DELETE') return handleReport.delete(request, env, user);

    if (url.pathname.startsWith('/admin')) {
      if (role === 'admin' || role === 'super-admin') return handleAdmin(request, env, user);
      return new Response('Forbidden', { status: 403 });
    }

    // Optional: Logs analytics endpoint (requires Analytics Engine dataset named bizform_logs)
    if (url.pathname === '/admin/analytics/logs') {
      return new Response(JSON.stringify([]), { headers: { 'Content-Type': 'application/json' } });
    }

    return new Response('Not found', { status: 404 });
  }
};
