#!/bin/bash
# kill the existing process
pid=$(sudo lsof -t -i:9090)
if [ -n "$pid" ]; then
    echo "Process $pid is using port $port. Killing..."
    sudo kill $pid
else
    echo "No process found using port $port."
fi

pid=$(sudo lsof -t -i:3000)
if [ -n "$pid" ]; then
    echo "Process $pid is using port $port. Killing..."
    sudo kill $pid
else
    echo "No process found using port $port."
fi

# replace the ip address
ipaddress=`curl http://checkip.amazonaws.com`
sed -i "s/localhost/$ipaddress/g" PharmaCareClient/src/Helper/Axios.js
sed -i "s/localhost/$ipaddress/g" PharmaCareClient/package.json


# start the appliation server
java -jar PharmaCareServer/target/pharmacare.jar &

# start the react client
cd PharmaCareClient
npm install --force &
npm start &
