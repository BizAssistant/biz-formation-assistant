// functions/api/upload-report.js
export async function onRequest(context) {
  const { request, env } = context;
  const body = await request.arrayBuffer();
  const objectName = `report-${Date.now()}.pdf`;

  await env.BIZFORM_R2.put(objectName, body);

  // Log action
  const id = env.ANALYTICS_ENGINE.idFromName("global");
  const obj = env.ANALYTICS_ENGINE.get(id);
  await obj.fetch(`https://audit?action=upload&user=contributor`);

  return new Response(JSON.stringify({ key: objectName }), {
    headers: { "content-type": "application/json" },
  });
}
