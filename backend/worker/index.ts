import { handleRequest } from '../handlers/onboarding';
import { billingHandler } from '../handlers/billing';
import { authHandler } from '../handlers/auth';

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname.startsWith('/api/onboarding')) {
      return handleRequest(request, env, ctx);
    } else if (url.pathname.startsWith('/api/billing')) {
      return billingHandler(request, env, ctx);
    } else if (url.pathname.startsWith('/api/auth')) {
      return authHandler(request, env, ctx);
    }

    return new Response('Not found', { status: 404 });
  },
};

