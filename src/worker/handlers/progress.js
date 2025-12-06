export const handleProgress = {
  async save(request, env, user) {
    const body = await request.json();
    await env.BIZFORM_KV.put(`user:${user.email}:progress`, JSON.stringify(body.state), { expirationTtl: 60 * 60 * 24 * 30 });
    return new Response(JSON.stringify({ ok: true }), { headers: { 'Content-Type': 'application/json' } });
  },
  async load(request, env, user) {
    const id = request.url.split('/').pop();
    const key = `user:${id || user.email}:progress`;
    const state = await env.BIZFORM_KV.get(key);
    return new Response(state || '{}', { headers: { 'Content-Type': 'application/json' } });
  }
};
