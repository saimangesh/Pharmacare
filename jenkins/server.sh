# kill the application server
pid=$(sudo lsof -t -i:9090)
if [ -n "$pid" ]; then
    echo "Process $pid is using port $port. Killing..."
    sudo kill $pid
else
    echo "No process found using port $port."
fi

# start the appliation server
java -jar PharmaCareServer/target/pharmacare.jar &
