// auditLogger.js
export class AuditLogger {
  constructor(state, env) {
    this.state = state;
    this.env = env;
    this.logs = [];
  }

  async fetch(request) {
    const url = new URL(request.url);
    const action = url.searchParams.get("action");
    const user = url.searchParams.get("user") || "anonymous";

    if (request.method === "POST" && action) {
      const entry = {
        action,
        user,
        timestamp: new Date().toISOString(),
      };
      this.logs.push(entry);
      await this.state.storage.put("logs", this.logs);
      return new Response("Log entry added");
    }

    if (request.method === "GET") {
      const logs = (await this.state.storage.get("logs")) || [];
      return new Response(JSON.stringify(logs), {
        headers: { "content-type": "application/json" },
      });
    }

    return new Response("Invalid request", { status: 400 });
  }
}
