#!/bin/bash
 
 osascript -e 'tell app "Terminal"
    do script "cd307; cd ./api; npm run start"
 end tell'
 osascript -e 'tell app "Terminal"
    do script "cd307; cd ./client; npm run serve"
 end tell'
 echo `docker-compose up -d`



