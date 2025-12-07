#!/usr/bin/env bash
set -euo pipefail

echo "==> BizForm Install: Starting"

# Prereqs
need() { command -v "$1" >/dev/null 2>&1 || { echo "Missing $1. Please install and re-run."; exit 1; }; }
need npm
need node
need curl

# Wrangler
if ! command -v wrangler >/dev/null 2>&1; then
  echo "==> Installing Cloudflare Wrangler..."
  npm i -g wrangler
fi

# .env
if [ ! -f ".env" ]; then
  echo "==> Creating .env from template..."
  cp .env.example .env
  echo "Fill .env with your values and re-run setup.sh."
  exit 1
fi

# Read .env
set -a
source .env
set +a

# Basic checks
if [ -z "${CF_ACCOUNT_ID:-}" ] || [ -z "${CF_API_TOKEN:-}" ]; then
  echo "CF_ACCOUNT_ID and CF_API_TOKEN must be set in .env"; exit 1
fi

echo "==> Installing npm dependencies..."
npm install

echo "==> Building frontend..."
npm run build

echo "==> Logging into Cloudflare (if needed)..."
wrangler whoami >/dev/null 2>&1 || wrangler login

echo "==> Creating KV namespace (BIZFORM_KV)..."
KV_JSON=$(wrangler kv namespace create BIZFORM_KV --json)
KV_ID=$(echo "$KV_JSON" | node -e "process.stdin.on('data',d=>{const j=JSON.parse(d);console.log(j.id)})")

echo "==> Creating R2 bucket (bizform-reports) if not exists..."
wrangler r2 bucket create bizform-reports >/dev/null 2>&1 || true

echo "==> Writing wrangler.toml..."
cat > wrangler.toml << EOF
name = "bizform-worker"
main = "src/worker/index.js"
compatibility_date = "$(date +%Y-%m-%d)"
account_id = "${CF_ACCOUNT_ID}"

kv_namespaces = [
  { binding = "BIZFORM_KV", id = "${KV_ID}" }
]

r2_buckets = [
  { binding = "BIZFORM_R2", bucket_name = "bizform-reports" }
]

durable_objects = [
  { name = "SessionManager", class_name = "SessionManager" },
  { name = "RoleManager", class_name = "RoleManager" }
]

analytics_engine_datasets = [
  { binding = "ANALYTICS_ENGINE", dataset = "bizform_metrics" }
]

[observability]
logs = true
traces = true

[vars]
CF_ACCESS_PUBLIC_KEY = "${CF_ACCESS_PUBLIC_KEY}"
CF_ACCESS_AUD = "${CF_ACCESS_AUD}"
CF_API_TOKEN = "${CF_API_TOKEN}"
CF_ZONE_ID = "${CF_ZONE_ID}"
SLACK_WEBHOOK_URL = "${SLACK_WEBHOOK_URL}"
EOF

echo "==> Deploying Worker..."
wrangler deploy

echo "==> Packaging zip (optional)..."
bash scripts/zip.sh || true

echo "==> BizForm Install: Complete"
echo "- Protect /admin/* via Cloudflare Access."
echo "- Use the deployed Worker route from wrangler output."
