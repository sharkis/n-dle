#!/usr/bin/env bash

nvm use
node app.js & apppid=$!
echo "Node.js PID: $apppid"
cd static
python3 -m http.server & httppid=$!
echo "Python PID: $httppid"
trap "{ echo 'Killing servers...'; kill $apppid; kill $httppid; exit; }" SIGINT
while true;
do sleep 1;
done

