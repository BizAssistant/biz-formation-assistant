// backend/worker/index.ts
import { handleRequest } from '../handlers/onboarding';
import { billingHandler } from '../handlers/billing';
import { authHandler } from '../handlers/auth';

// Export your Durable Object classes (unchanged)
export { SessionManager } from '../durable/session-manager';
export { RoleManager } from '../durable/role-manager';
export { AuditLogger } from '../durable/audit-logger';

// Helper to add CORS headers
function withCors(response: Response): Response {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
}

export default {
  async fetch(request: Request, env: any, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // Handle preflight CORS
    if (request.method === 'OPTIONS') {
      return withCors(new Response(null, { status: 204 }));
    }

    // Health check
    if (url.pathname === '/health' || url.pathname === '/') {
      return withCors(new Response(JSON.stringify({ status: 'ok', worker: 'biz-formation-assistant' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }));
    }

    // === FIXED: Use actual env.WORKER_URL instead of broken template strings ===
    const base = env.WORKER_URL?.replace(/\/+$/, '') || ''; // e.g. https://biz-api.yourname.workers.dev

    const onboardingPath = `${base}/api/onboarding`;
    const billingPath = `${base}/api/billing`;
    const authPath = `${base}/api/auth`;

    try {
      if (url.pathname.startsWith(onboardingPath)) {
        return withCors(await handleRequest(request, env, ctx));
      }

      if (url.pathname.startsWith(billingPath)) {
        return withCors(await billingHandler(request, env, ctx));
      }

      if (url.pathname.startsWith(authPath)) {
        return withCors(await authHandler(request, env, ctx));
      }
    } catch (error: any) {
      console.error('Worker error:', error);
      return withCors(new Response(JSON.stringify({ error: 'Internal Server Error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }));
    }

    return withCors(new Response('Not Found', { status: 404 }));
  },
};
