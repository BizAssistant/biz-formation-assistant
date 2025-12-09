// functions/api/download-report.js
export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const key = url.searchParams.get("key");

  if (!key) return new Response("Missing key", { status: 400 });

  const object = await env.BIZFORM_R2.get(key);
  if (!object) return new Response("Not found", { status: 404 });

  return new Response(object.body, {
    headers: { "content-type": "application/pdf" },
  });
}
