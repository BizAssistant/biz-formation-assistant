export const handleReport = {
  async upload(request, env, user) {
    const body = await request.json();
    const pdfBytes = Uint8Array.from(atob(body.pdfBase64), c => c.charCodeAt(0));
    const key = `reports/${user.email}/${Date.now()}.pdf`;
    await env.BIZFORM_R2.put(key, pdfBytes);
    return new Response(JSON.stringify({ ok: true, key }), { headers: { 'Content-Type': 'application/json' } });
  },
  async download(request, env, user) {
    const key = request.url.replace(/.*\/download\//, '');
    const obj = await env.BIZFORM_R2.get(key);
    if (!obj) return new Response('Not found', { status: 404 });
    return new Response(obj.body, { headers: { 'Content-Type': 'application/pdf' } });
  },
  async delete(request, env, user) {
    const key = request.url.replace(/.*\/report\//, '');
    await env.BIZFORM_R2.delete(key);
    return new Response(JSON.stringify({ ok: true }), { headers: { 'Content-Type': 'application/json' } });
  }
};
