#!/bin/bash
# enter as admin
sudo su

# kill the existing process
kill -9 $(lsof -t -i:9090)
kill -9 $(lsof -t -i:3000)

# replace the ip address


# start the appliation server
java -jar PharmaCareServer/target/pharmacare.jar &

# start the react client
cd PharmaCareClient
npm install --force
npm start &
