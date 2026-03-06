#!/bin/bash

# 🚀 Nexspace Website Server-Side Deployment Script
# URL: nexspace.spatiumoffices.com

set -e

echo "----------------------------------------------------"
echo "🚀 Deploying Nexspace Website on Remote Server"
echo "----------------------------------------------------"

PASS="spatium123@abc"
TARGET_DIR="$(pwd)"

echo "----------------------------------------------------"
echo "🔧 Setup Started in $TARGET_DIR"
echo "----------------------------------------------------"

CLOUDFLARED_DIR="$TARGET_DIR/.cloudflared"
mkdir -p "$CLOUDFLARED_DIR"

# Cloudflare Tunnel Setup (Idempotent)
TUNNEL_NAME="nexspace-tunnel"

# Ensure user is logged in
if [ ! -f "$HOME/.cloudflared/cert.pem" ]; then
    echo "🔑 Please login to Cloudflare first on the server by running: cloudflared tunnel login"
fi

# Create tunnel if not exists
if ! cloudflared tunnel list | grep -q "$TUNNEL_NAME"; then
    echo "☁️ Creating new Cloudflare Tunnel: $TUNNEL_NAME..."
    cloudflared tunnel create "$TUNNEL_NAME"
fi

# Get Tunnel ID and Credentials
TUNNEL_ID=$(cloudflared tunnel list | awk -v name="$TUNNEL_NAME" '$2 == name {print $1}')

if [ -z "$TUNNEL_ID" ]; then
    echo "❌ Error: Could not find Tunnel ID for '$TUNNEL_NAME'."
    exit 1
fi

echo "✅ Using Tunnel ID: $TUNNEL_ID"

if [ -f "$HOME/.cloudflared/$TUNNEL_ID.json" ]; then
    echo "🔑 Preparing tunnel configuration..."
    echo "$PASS" | sudo -S mkdir -p "$CLOUDFLARED_DIR"
    echo "$PASS" | sudo -S cp "$HOME/.cloudflared/$TUNNEL_ID.json" "$CLOUDFLARED_DIR/credentials.json"
    
    echo "$PASS" | sudo -S tee "$CLOUDFLARED_DIR/config.yml" > /dev/null <<CONF
tunnel: $TUNNEL_ID
credentials-file: /etc/cloudflared/credentials.json

ingress:
  - hostname: nexspace.spatiumoffices.com
    service: http://nexspace-frontend:80
  - service: http_status:404
CONF

    # Fix permissions
    echo "$PASS" | sudo -S chown -R 65532:65532 "$CLOUDFLARED_DIR"
    echo "$PASS" | sudo -S chmod -R 700 "$CLOUDFLARED_DIR"
else
    echo "❌ Error: Credentials file not found at $HOME/.cloudflared/$TUNNEL_ID.json"
    exit 1
fi

echo "🔗 Routing DNS..."
cloudflared tunnel route dns -f "$TUNNEL_ID" nexspace.spatiumoffices.com || true

echo "🐳 Building and starting Docker containers..."

export TMPDIR="$TARGET_DIR"
export BUILDX_NO_DEFAULT_ATTESTATIONS=1
export BUILDX_NO_DEFAULT_PROVENANCE=1
export DOCKER_BUILDKIT=1

echo "🧹 Cleaning up current project containers..."
echo "$PASS" | sudo -S -E docker compose down || true

echo "📦 Building Frontend..."
echo "$PASS" | sudo -S -E docker build -t nexspace-frontend . --provenance=false

echo "🚀 Starting containers..."
echo "$PASS" | sudo -S -E docker compose up -d

echo "----------------------------------------------------"
echo "✨ Deployment Success!"
echo "📍 Access your app at: https://nexspace.spatiumoffices.com"
echo "----------------------------------------------------"
echo "📊 Current Status:"
echo "$PASS" | sudo -S docker ps --filter "name=nexspace"
