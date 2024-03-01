#!/bin/bash
set -e

echo "kill the react client"

# kill the react client
kill_function() {
pid=$(sudo lsof -t -i:3000)
if [ -n "$pid" ]; then
    echo "Process $pid is using port $port. Killing..."
    sudo kill $pid
else
    echo "No process found using port $port."
fi
}

# start the react client
npm_install_function() {
cd PharmaCareClient
npm install --force
}

kill_function || true
npm_install_function || true
npm start &

echo "react client is started"
