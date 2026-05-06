#!/bin/bash
while true; do
  cd /home/z/my-project
  NODE_ENV=production bun .next/standalone/server.js >> /tmp/server.log 2>&1
  echo "Server died at $(date), restarting in 2s..." >> /tmp/watchdog.log
  sleep 2
done
