// functions/api/quiz.js
export async function onRequest(context) {
  const { request } = context;
  const body = await request.json();
  const { topic } = body;

  const quiz = [
    { q: `What is ${topic}?`, a: "Definition" },
    { q: `Why is ${topic} important?`, a: "Reason" },
  ];

  return new Response(JSON.stringify(quiz), {
    headers: { "content-type": "application/json" },
  });
}
