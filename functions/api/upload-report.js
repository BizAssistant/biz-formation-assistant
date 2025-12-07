// functions/api/upload-report.js
export async function onRequest(context) {
  const { request, env } = context;
  const body = await request.arrayBuffer();
  const objectName = `report-${Date.now()}.pdf`;

  await env.REPORTS_BUCKET.put(objectName, body);
  return new Response(JSON.stringify({ key: objectName }), {
    headers: { "content-type": "application/json" },
  });
}
