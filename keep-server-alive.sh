#!/bin/bash
# Check if server is already running on port 3000
if ! ss -tlnp | grep -q ':3000 '; then
  cd /home/z/my-project
  NODE_ENV=production bun .next/standalone/server.js >> /tmp/server.log 2>&1 &
  disown
  echo "Server started at $(date)" >> /tmp/server-watchdog.log
fi
