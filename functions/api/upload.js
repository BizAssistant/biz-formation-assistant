// functions/api/upload.js
export async function onRequest(context) {
  const { request, env } = context;
  const body = await request.arrayBuffer();
  const objectName = `upload-${Date.now()}.bin`;

  await env.BIZFORMS_R2.put(objectName, body);
  return new Response(`File uploaded to R2: ${objectName}`);
}
