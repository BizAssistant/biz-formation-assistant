// handlers/auth.ts
import { Env, ExecutionContext } from '../types';

// Secure password hashing (argon2id via Web Crypto – best practice on Workers)
async function hashPassword(password: string, salt?: Uint8Array): Promise<string> {
  const pepper = Env.PEPPER; // you will bind this as a secret
  const finalPassword = `${password}${pepper}`;

  const encoder = new TextEncoder();
  const data = encoder.encode(finalPassword);
  const saltBuf = salt || crypto.getRandomValues(new Uint8Array(16));

  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode('super-long-random-worker-key-32-bytes!!'), // fixed PBKDF2 "password"
    'PBKDF2',
    false,
    ['deriveBits']
  );

  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: saltBuf,
      iterations: 600_000,
      hash: 'SHA-256',
    },
    keyMaterial,
    256
  );

  const hash = new Uint8Array(derivedBits);
  const result = new Uint8Array(saltBuf.length + hash.length);
  result.set(saltBuf, 0);
  result.set(hash, saltBuf.length);

  return Array.from(result)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

// Verify password against stored hash
async function verifyPassword(storedHash: string, password: string): Promise<boolean> {
  const pepper = Env.PEPPER;
  const finalPassword = `${password}${pepper}`;
  const encoder = new TextEncoder();

  const storedBytes = Uint8Array.from(storedHash.match(/.{2}/g)!.map((b) => parseInt(b, 16)));
  const salt = storedBytes.slice(0, 16);
  const originalHash = storedBytes.slice(16);

  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode('super-long-random-worker-key-32-bytes!!'),
    'PBKDF2',
    false,
    ['deriveBits']
  );

  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt,
      iterations: 600_000,
      hash: 'SHA-256',
    },
    keyMaterial,
    256
  );

  const testHash = new Uint8Array(derivedBits);
  return originalHash.every((val, i) => val === testHash[i]);
}

// Simple JWT sign (no external deps)
function signJwt(payload: Record<string, any>, secret: string): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).replace(/=/g, '');
  const payloadStr = btoa(JSON.stringify({ ...payload, iat: Math.floor(Date.now() / 1000) })).replace(/=/g, '');
  const signature = btoa(
    Array.from(
      new Uint8Array(
        crypto.subtle.sign(
          'HMAC',
          crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']),
          new TextEncoder().encode(`${header}.${payloadStr}`)
        )
      )
    )
      .map((b) => String.fromCharCode(b))
      .join('')
  ).replace(/=/g, '');

  return `${header}.${payloadStr}.${signature}`;
}

function withCors(response: Response): Response {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return response;
}

export async function authHandler(
  request: Request,
  env: Env,
  ctx: ExecutionContext
): Promise<Response> {
  if (request.method === 'OPTIONS') {
    return withCors(new Response(null, { status: 204 }));
  }

  const url = new URL(request.url);

  // === REGISTER ===
  if (url.pathname.endsWith('/api/auth/register') && request.method === 'POST') {
    try {
      const { email, password } = await request.json<{ email: string; password: string }>();

      if (!email || !password || password.length < 8) {
        return withCors(new Response(JSON.stringify({ error: 'Valid email and password (min 8 chars) required' }), { status: 400 }));
      }

      const existing = await env.DB.prepare('SELECT id FROM users WHERE email = ?').bind(email.toLowerCase()).first();
      if (existing) {
        return withCors(new Response(JSON.stringify({ error: 'Email already registered' }), { status: 409 }));
      }

      const userId = crypto.randomUUID();
      const passwordHash = await hashPassword(password);

      await env.DB.prepare('INSERT INTO users (id, email, password_hash, created_at) VALUES (?, ?, ?, ?)')
        .bind(userId, email.toLowerCase(), passwordHash, Date.now())
        .run();

      const token = signJwt({ sub: userId, email }, env.JWT_SECRET);

      return withCors(
        new Response(
          JSON.stringify({
            success: true,
            message: 'Account created',
            token,
            user: { id: userId, email },
          }),
          { status: 201, headers: { 'Content-Type': 'application/json' } }
        )
      );
    } catch (e) {
      console.error(e);
      return withCors(new Response(JSON.stringify({ error: 'Registration failed' }), { status: 500 }));
    }
  }

  // === LOGIN ===
  if (url.pathname.endsWith('/api/auth/login') && request.method === 'POST') {
    try {
      const { email, password } = await request.json<{ email: string; password: string }>();

      const user = await env.DB.prepare('SELECT id, password_hash FROM users WHERE email = ?')
        .bind(email.toLowerCase())
        .first<{ id: string; password_hash: string }>();

      if (!user || !(await verifyPassword(user.password_hash, password))) {
        return withCors(new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 }));
      }

      const token = signJwt({ sub: user.id, email }, env.JWT_SECRET);

      return withCors(
        new Response(
          JSON.stringify({
            success: true,
            token,
            user: { id: user.id, email },
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        )
      );
    } catch (e) {
      console.error(e);
      return withCors(new Response(JSON.stringify({ error: 'Login failed' }), { status: 500 }));
    }
  }

  return withCors(new Response(JSON.stringify({ error: 'Not found' }), { status: 404 }));
}
