// functions/hello.js
export async function onRequest(context) {
  return new Response("Hello from Cloudflare Functions!", {
    headers: { "content-type": "text/plain" },
  });
}
