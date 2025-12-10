// handlers/onboarding.ts
import { Env, ExecutionContext } from '../types';

// Helper to add CORS headers (same as in index.ts)
function withCors(response: Response): Response {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
}

export async function handleRequest(
  request: Request,
  env: Env,
  ctx: ExecutionContext
): Promise<Response> {
  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return withCors(new Response(null, { status: 204 }));
  }

  const url = new URL(request.url);
  const path = url.pathname;

  // === STEP 1: Basic Business Info ===
  if (path.endsWith('/api/onboarding/step1') && request.method === 'POST') {
    try {
      const body = await request.json<any>();

      // Basic validation (expand as needed)
      if (!body.businessName?.trim()) {
        return withCors(
          new Response(
            JSON.stringify({ error: 'Business name is required' }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
          )
        );
      }

      // Here you can later save to D1:
      // await env.DB.prepare('INSERT INTO onboarding (...) VALUES (...)').bind(...).run();

      // For now, just echo + success (perfect for testing)
      const responseData = {
        success: true,
        message: 'Step 1 completed',
        received: {
          businessName: body.businessName,
          industry: body.industry,
          entityType: body.entityType,
          state: body.state,
        },
        nextStep: '/api/onboarding/step2',
        timestamp: new Date().toISOString(),
      };

      return withCors(
        new Response(JSON.stringify(responseData), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      );
    } catch (err) {
      console.error('Onboarding Step 1 error:', err);
      return withCors(
        new Response(
          JSON.stringify({ error: 'Invalid JSON or server error' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        )
      );
    }
  }

  // === Add more steps here later ===
  // Example: step2, step3, etc.

  return withCors(new Response(JSON.stringify({ error: 'Not found' }), { status: 404 }));
}
