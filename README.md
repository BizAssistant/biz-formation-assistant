# BizForm — Cloudflare-native SaaS

A complete scaffold for a business formation assistant:
- React + Sass wizard (6 steps), progress bar, branded PDF export
- Cloudflare Workers backend with KV (progress), R2 (reports), Durable Objects (sessions/audit)
- Access + IdP groups → RBAC (contributor/admin/super-admin)
- Admin dashboards (history, cleanup, audit)
- Observability & Analytics via Workers Analytics Engine, Logpush (optional)
- Grafana dashboards & alert routing (optional)
- Self-healing automation via Cloudflare APIs (optional)

## Quick start

1. Copy .env.example to .env and fill values.
2. Run installer:
   - bash setup.sh
     - If prompted, fill .env then re-run setup.sh.
3. Protect /admin/* with Cloudflare Access (Zero Trust → Access → Applications).
4. Start dev server:
   - npm run dev
5. Deploy Worker:
   - wrangler deploy

## Config notes

- KV is used for progress saves.
- R2 stores generated PDF reports under reports/{email}/{timestamp}.pdf.
- Durable Objects provide audit logging and optional role overrides.
- Access JWT claims provide identity and IdP groups for RBAC.
- Workers Analytics Engine records basic datapoints for observability and metrics.
- Grafana can query Analytics Engine via SQL plugin (optional).

## Environment variables (.env)

CF_ACCOUNT_ID=
CF_API_TOKEN=
CF_ZONE_ID=
CF_ACCESS_PUBLIC_KEY=
CF_ACCESS_AUD=
SLACK_WEBHOOK_URL=

See .env.example for details.
