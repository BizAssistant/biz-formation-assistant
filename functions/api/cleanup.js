// functions/api/cleanup.js
export async function onRequest(context) {
  const { env } = context;
  const list = await env.BIZFORM_R2.list();

  for (const obj of list.objects) {
    if (Date.now() - new Date(obj.uploaded).getTime() > 7 * 24 * 60 * 60 * 1000) {
      await env.BIZFORM_R2.delete(obj.key);
    }
  }

  // Log cleanup
  const id = env.ANALYTICS_ENGINE.idFromName("global");
  const obj = env.ANALYTICS_ENGINE.get(id);
  await obj.fetch(`https://audit?action=cleanup&user=admin`);

  return new Response("Old reports cleaned up");
}
