// functions/api/history.js
export async function onRequest(context) {
  const { env } = context;
  const list = await env.BIZFORM_R2.list();
  return new Response(JSON.stringify(list.objects), {
    headers: { "content-type": "application/json" },
  });
}
