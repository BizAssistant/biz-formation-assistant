export class SessionManager {
  constructor(state, env) {
    this.state = state;
    this.env = env;
    this.logs = [];
  }
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === '/logCleanup') {
      const body = await request.json();
      this.logs.push({ type: 'cleanup', key: body.key, ts: Date.now() });
      return new Response(JSON.stringify({ ok: true }));
    }
    if (url.pathname === '/audit') {
      return new Response(JSON.stringify(this.logs), { headers: { 'Content-Type': 'application/json' } });
    }
    return new Response('Not found', { status: 404 });
  }
}
