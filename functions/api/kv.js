// functions/api/kv.js
export async function onRequest(context) {
  const { env } = context;
  const counter = (await env.MY_KV.get("counter")) || 0;
  const newValue = parseInt(counter) + 1;
  await env.MY_KV.put("counter", newValue.toString());
  return new Response(`Counter updated: ${newValue}`);
}
