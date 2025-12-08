// functions/api/data.js
export async function onRequest(context) {
  const data = { message: "Cloudflare Functions are live!", time: new Date().toISOString() };
  return new Response(JSON.stringify(data), {
    headers: { "content-type": "application/json" },
  });
}
