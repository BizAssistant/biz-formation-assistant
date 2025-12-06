#!/usr/bin/env bash
set -euo pipefail

echo "==> CI Deploy starting"
npm ci
npm run build
wrangler deploy
echo "==> CI Deploy complete"
