#!/usr/bin/env bash
set -e
cd "$(dirname "$0")/.."
zip -r bizform.zip . -x "node_modules/*" -x "dist/*" -x ".git/*" -x ".DS_Store" -x ".vscode/*"
echo "==> Created bizform.zip"
