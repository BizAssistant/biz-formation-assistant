export function handleAuthWhoAmI(user) {
  return new Response(JSON.stringify(user), { headers: { 'Content-Type': 'application/json' } });
}
