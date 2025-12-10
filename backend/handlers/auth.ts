import { Env, ExecutionContext } from '../types';

export async function authHandler(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname;

  if (path === '/api/auth/login' && request.method === 'POST') {
    const data = await request.json();
    // Process login
    return new Response(JSON.stringify({ success: true, data }), { headers: { 'Content-Type': 'application/json' } });
  }

  return new Response('Not found', { status: 404 });
}
