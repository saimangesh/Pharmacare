#!/bin/bash
set -e

echo "kill the react client"

# kill the react client
kill_function() {
pid=$(sudo lsof -t -i:9090)
if [ -n "$pid" ]; then
    echo "Process $pid is using port $port. Killing..."
    sudo kill $pid
else
    echo "No process found using port $port."
fi
}

# start the appliation server
kill_function || true
java -jar PharmaCareServer/target/pharmacare.jar &
