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
puts "📦 Phase 1/3: Syncing files to remote server..."
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
puts "✅ File sync complete!"

# 2. Execute Remote Setup Server-Side
puts "\n🐳 Phase 2/3: Connecting to remote server for setup..."

# Write the remote execution script to a temporary file locally
set fd [open "remote_deploy_tmp.sh" w]
puts $fd "#!/bin/bash"
puts $fd "set -e"
puts $fd "PASS=\"spatium123@abc\""
puts $fd "TARGET_DIR=\"$target_dir\""
puts $fd "cd \"\$TARGET_DIR\" || exit 1"
puts $fd "echo \"----------------------------------------------------\""
puts $fd "echo \"🔧 Remote Server Execution Started\""
puts $fd "echo \"----------------------------------------------------\""
puts $fd "CLOUDFLARED_DIR=\"\$TARGET_DIR/.cloudflared\""
puts $fd "mkdir -p \"\$CLOUDFLARED_DIR\""
puts $fd "TUNNEL_NAME=\"nexspace-tunnel\""
puts $fd "if ! cloudflared tunnel list | grep -q \"\$TUNNEL_NAME\"; then"
puts $fd "    cloudflared tunnel create \"\$TUNNEL_NAME\""
puts $fd "fi"
puts $fd "TUNNEL_ID=\$(cloudflared tunnel list | awk -v name=\"\$TUNNEL_NAME\" '\$2 == name {print \$1}')"
puts $fd "if \[ -z \"\$TUNNEL_ID\" ]; then exit 1; fi"
puts $fd "if \[ -f \"\$HOME/.cloudflared/\$TUNNEL_ID.json\" ]; then"
puts $fd "    echo \"\$PASS\" | sudo -S mkdir -p \"\$CLOUDFLARED_DIR\""
puts $fd "    echo \"\$PASS\" | sudo -S cp \"\$HOME/.cloudflared/\$TUNNEL_ID.json\" \"\$CLOUDFLARED_DIR/credentials.json\""
puts $fd "    echo \"\$PASS\" | sudo -S bash -c \"cat > \$CLOUDFLARED_DIR/config.yml <<CONF"
puts $fd "tunnel: \$TUNNEL_ID"
puts $fd "credentials-file: /etc/cloudflared/credentials.json"
puts $fd ""
puts $fd "ingress:"
puts $fd "  - hostname: nexspace.spatiumoffices.com"
puts $fd "    service: http://nexspace-frontend:80"
puts $fd "  - service: http_status:404"
puts $fd "CONF\""
puts $fd "    echo \"\$PASS\" | sudo -S chown -R 65532:65532 \"\$CLOUDFLARED_DIR\""
puts $fd "    echo \"\$PASS\" | sudo -S chmod -R 700 \"\$CLOUDFLARED_DIR\""
puts $fd "fi"
puts $fd "cloudflared tunnel route dns -f \"\$TUNNEL_ID\" nexspace.spatiumoffices.com || true"
puts $fd "export TMPDIR=\"\$TARGET_DIR\""
puts $fd "export BUILDX_NO_DEFAULT_ATTESTATIONS=1"
puts $fd "export BUILDX_NO_DEFAULT_PROVENANCE=1"
puts $fd "export DOCKER_BUILDKIT=1"
puts $fd "echo \"\$PASS\" | sudo -S -E docker compose down || true"
puts $fd "echo \"\$PASS\" | sudo -S -E docker build -t nexspace-frontend . --provenance=false"
puts $fd "echo \"\$PASS\" | sudo -S -E docker compose up -d"
puts $fd "echo \"✨ Remote Server Execution Success!\""
close $fd

# Sync the script
spawn rsync -avz ./remote_deploy_tmp.sh "$server:$target_dir/"
expect {
    "password:" {
        send "$pass\n"
        exp_continue
    }
    eof
}

# Execute the script
spawn ssh -o StrictHostKeyChecking=no "$server" "bash $target_dir/remote_deploy_tmp.sh"
expect {
    "password:" {
        send "$pass\n"
        exp_continue
    }
    eof
}

# Cleanup local temp file
exec rm remote_deploy_tmp.sh

puts "----------------------------------------------------"
puts "✅ Client-Side Automation Complete."
puts "----------------------------------------------------"
