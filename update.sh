#!/bin/bash

# 🚀 Nexspace Website Fast Update Script (Client-Side)
# Use this script to quickly push local changes and restart ONLY the frontend container
# without touching the Cloudflare tunnel or doing full setup.

set -e

# Configuration
SERVER="zigbee@172.168.10.251"
PASS="spatium123@abc"
TARGET_DIR="/home/zigbee/Nexspace-Website"

echo "----------------------------------------------------"
echo "🚀 Pushing Nexspace Updates to $SERVER"
echo "----------------------------------------------------"

# 1. Sync Files
echo "📦 Phase 1/2: Syncing latest files to remote server..."
rsync -avz --delete \
    --exclude "node_modules" \
    --exclude ".git" \
    --exclude "dist" \
    --exclude ".cloudflared" \
    ./ "$SERVER:$TARGET_DIR/"

echo "✅ File sync complete!"

# 2. Execute Fast Update Server-Side
echo "🐳 Phase 2/2: Rebuilding & Restarting Frontend Container..."

# Write the remote execution script to a temporary file locally
cat > update_tmp.sh <<EOF
#!/bin/bash
set -e
PASS="spatium123@abc"
TARGET_DIR="$TARGET_DIR"

cd "\$TARGET_DIR" || exit 1
echo "----------------------------------------------------"
echo "🔧 Remote Server Update Started"
echo "----------------------------------------------------"

export TMPDIR="\$TARGET_DIR"
export BUILDX_NO_DEFAULT_ATTESTATIONS=1
export BUILDX_NO_DEFAULT_PROVENANCE=1
export DOCKER_BUILDKIT=1

echo "📦 Rebuilding Frontend Image..."
echo "\$PASS" | sudo -S -E docker build -t nexspace-frontend . --provenance=false

echo "🔄 Restarting Frontend Container..."
echo "\$PASS" | sudo -S -E docker compose stop nexspace-frontend || true
echo "\$PASS" | sudo -S -E docker compose rm -f nexspace-frontend || true
echo "\$PASS" | sudo -S -E docker compose up -d nexspace-frontend

echo "✨ Update Success! Changes are now live."
EOF

# Sync the script
rsync -avz ./update_tmp.sh "$SERVER:$TARGET_DIR/"

# Execute the script
ssh -o StrictHostKeyChecking=no "$SERVER" "bash $TARGET_DIR/update_tmp.sh"

# Cleanup local temp file
rm update_tmp.sh

echo "----------------------------------------------------"
echo "✅ Update Complete."
echo "----------------------------------------------------"
