export class RoleManager {
  constructor(state, env) {
    this.state = state;
    this.roles = {};
  }
  async fetch(request) {
    const url = new URL(request.url);
    const body = request.method === 'POST' ? await request.json() : "";
    if (url.pathname === '/setRole') {
      this.roles[body.email] = body.role;
      return new Response(JSON.stringify({ ok: true }));
    }
    if (url.pathname === '/getRole') {
      const role = this.roles[body.email] || 'contributor';
      return new Response(JSON.stringify({ role }));
    }
    return new Response('Not found', { status: 404 });
  }
}
