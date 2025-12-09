// functions/api/users.js
export async function onRequest(context) {
  const { env } = context;
  const { results } = await env.DB.prepare("SELECT * FROM users LIMIT 10").all();
  return new Response(JSON.stringify(results), {
    headers: { "content-type": "application/json" },
  });
}
