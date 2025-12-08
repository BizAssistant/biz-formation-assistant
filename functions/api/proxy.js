// functions/api/proxy.js
export async function onRequest(context) {
  const res = await fetch("https://api.github.com/repos/BizAssistant/biz-formation-assistant");
  const json = await res.json();
  return new Response(JSON.stringify(json), {
    headers: { "content-type": "application/json" },
  });
}
