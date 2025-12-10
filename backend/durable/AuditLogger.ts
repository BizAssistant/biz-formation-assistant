export class AuditLogger extends DurableObject {
  async fetch(request) {
    // Example: Log to KV
    await this.env.MY_KV_NAMESPACE.put('audit', 'logged');
    const log = await this.env.MY_KV_NAMESPACE.get('audit');
    return new Response(log);
  }
}
