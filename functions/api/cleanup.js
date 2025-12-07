// functions/api/cleanup.js
export async function onRequest(context) {
  const { env } = context;
  const list = await env.REPORTS_BUCKET.list();

  for (const obj of list.objects) {
    if (Date.now() - new Date(obj.uploaded).getTime() > 7 * 24 * 60 * 60 * 1000) {
      await env.REPORTS_BUCKET.delete(obj.key);
    }
  }

  return new Response("Old reports cleaned up");
}
