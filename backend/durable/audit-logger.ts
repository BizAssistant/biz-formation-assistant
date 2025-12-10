import { DurableObject } from 'cloudflare:workers';

export class AuditLogger extends DurableObject {
  async fetch(request) {
    // Example: Log to KV
    await this.env.BIZFORM_KV.put('audit', 'logged');
    const log = await this.env.BIZFORM_KV.get('audit');
    return new Response(log);
  }
}

