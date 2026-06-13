#!/usr/bin/env bash
set -euo pipefail

# Redeploy mohameddesign.com on the VPS.
# Run from the project root:  bash deploy.sh
# (First-time setup is documented in DEPLOYMENT.md.)

APP_NAME="mohameddesign"

echo "==> [1/4] Pulling latest from origin/main"
git pull origin main

echo "==> [2/4] Installing dependencies (clean, from package-lock)"
npm ci

echo "==> [3/4] Building production bundle"
npm run build

echo "==> [4/4] Restarting PM2 process on port 3010"
if pm2 describe "$APP_NAME" > /dev/null 2>&1; then
  pm2 reload ecosystem.config.js --update-env
else
  pm2 start ecosystem.config.js
fi
pm2 save

echo "==> Done. $APP_NAME is live on http://127.0.0.1:3010"
