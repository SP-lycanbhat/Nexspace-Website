#!/usr/bin/expect -f

# 🚀 Nexspace Website Full Remote Deployment Script (Client-Side)
# URL: nexspace.spatiumoffices.com

set timeout -1

# Configuration
set server "zigbee@172.168.10.251"
set pass "spatium123@abc"
set target_dir "/home/zigbee/Nexspace-Website"

puts "----------------------------------------------------"
puts "🚀 Starting Remote Deployment to $server"
puts "----------------------------------------------------"

# 1. Sync Files
puts "� Syncing files to remote server..."
spawn rsync -avz --delete \
    --exclude "node_modules" \
    --exclude ".git" \
    --exclude "dist" \
    --exclude ".cloudflared" \
    ./ "$server:$target_dir/"

expect {
    "password:" {
        send "$pass\n"
        exp_continue
    }
    eof
}

# 2. Execute Remote Setup Server-Side
puts "🐳 Running remote setup and Docker build..."
spawn ssh -o StrictHostKeyChecking=no "$server" "bash -s"
expect "password:"
send "$pass\n"

expect "$ "
send "cd $target_dir\n"

# Define the massive remote script block
set script {
    set -e
    PASS="spatium123@abc"
    TARGET_DIR="$(pwd)"
    CLOUDFLARED_DIR="$TARGET_DIR/.cloudflared"

    echo "� Setting up Cloudflare tunnel in $TARGET_DIR..."
    mkdir -p "$CLOUDFLARED_DIR"

    TUNNEL_NAME="nexspace-tunnel"

    if ! cloudflared tunnel list | grep -q "$TUNNEL_NAME"; then
        echo "☁️ Creating new Cloudflare Tunnel: $TUNNEL_NAME..."
        cloudflared tunnel create "$TUNNEL_NAME"
    fi

    TUNNEL_ID=$(cloudflared tunnel list | awk -v name="$TUNNEL_NAME" '$2 == name {print $1}')

    if [ -z "$TUNNEL_ID" ]; then
        echo "❌ Error: Could not find Tunnel ID."
        exit 1
    fi

    if [ -f "$HOME/.cloudflared/$TUNNEL_ID.json" ]; then
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

        echo "$PASS" | sudo -S chown -R 65532:65532 "$CLOUDFLARED_DIR"
        echo "$PASS" | sudo -S chmod -R 700 "$CLOUDFLARED_DIR"
    else
        echo "❌ Error: Credentials file missing."
        exit 1
    fi

    cloudflared tunnel route dns -f "$TUNNEL_ID" nexspace.spatiumoffices.com || true

    echo "🐳 Building Docker images..."
    export TMPDIR="$TARGET_DIR"
    export BUILDX_NO_DEFAULT_ATTESTATIONS=1
    export BUILDX_NO_DEFAULT_PROVENANCE=1
    export DOCKER_BUILDKIT=1

    echo "$PASS" | sudo -S -E docker compose down || true
    echo "$PASS" | sudo -S -E docker build -t nexspace-frontend . --provenance=false
    echo "$PASS" | sudo -S -E docker compose up -d

    echo "✨ Deployment Remote Success!"
    echo "$PASS" | sudo -S docker ps --filter "name=nexspace"
}

# Send the script body
send "$script\n"

# Trigger execution and wait for it to process
send "exit\n"
expect eof

puts "----------------------------------------------------"
puts "✅ Client-Side Script Complete."
puts "----------------------------------------------------"
