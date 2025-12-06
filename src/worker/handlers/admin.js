export async function handleAdmin(request, env, user) {
  const url = new URL(request.url);

  if (url.pathname === '/admin/reports' && request.method === 'GET') {
    const list = await env.BIZFORM_R2.list({ prefix: 'reports/' });
    return new Response(JSON.stringify(list.objects), { headers: { 'Content-Type': 'application/json' } });
  }

  if (url.pathname === '/admin/audit' && request.method === 'GET') {
    const id = env.SessionManager.idFromName('audit');
    const obj = env.SessionManager.get(id);
    const res = await obj.fetch('http://session/audit');
    return new Response(await res.text(), { headers: { 'Content-Type': 'application/json' } });
  }

  if (url.pathname === '/admin/cleanup' && request.method === 'POST') {
    const cutoff = Date.now() - 90 * 24 * 60 * 60 * 1000;
    const list = await env.BIZFORM_R2.list({ prefix: 'reports/' });
    let deleted = 0;
    for (const obj of list.objects) {
      if (obj.uploaded.getTime() < cutoff) {
        await env.BIZFORM_R2.delete(obj.key);
        deleted++;
        const id = env.SessionManager.idFromName('audit');
        const session = env.SessionManager.get(id);
        await session.fetch('http://session/logCleanup', { method: 'POST', body: JSON.stringify({ key: obj.key }) });
      }
    }
    return new Response(JSON.stringify({ ok: true, deleted }), { headers: { 'Content-Type': 'application/json' } });
  }

  if (url.pathname === '/admin/analytics' && request.method === 'GET') {
    const list = await env.BIZFORM_R2.list({ prefix: 'reports/' });
    const weeklyCounts = {};
    for (const obj of list.objects) {
      const day = new Date(obj.uploaded).toISOString().slice(0, 10);
      weeklyCounts[day] = (weeklyCounts[day] || 0) + 1;
    }
    const id = env.SessionManager.idFromName('audit');
    const auditRes = await env.SessionManager.get(id).fetch('http://session/audit');
    const audit = await auditRes.json();
    return new Response(JSON.stringify({ weeklyCounts, audit }), { headers: { 'Content-Type': 'application/json' } });
  }

  return new Response('Not found', { status: 404 });
}
