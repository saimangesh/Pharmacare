#!/bin/bash
# enter as admin
sudo su

# start the appliation server
java -jar PharmaCareServer/target/pharmacare.jar &

# start the react client
npm install --force
npm start &
