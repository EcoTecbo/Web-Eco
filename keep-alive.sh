#!/bin/bash
cd /home/z/my-project
while true; do
    if ! ss -tlnp | grep -q ":3000 "; then
        echo "$(date): Starting Next.js server..." >> /home/z/my-project/server-restart.log
        node ./node_modules/.bin/next dev -p 3000 --webpack >> /home/z/my-project/dev.log 2>&1 &
        sleep 5
    fi
    sleep 10
done
