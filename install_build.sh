#!/bin/bash

# Helper function to verify the .env after build
copy_env() {
    FILE=.env
    if [ ! -f "$FILE" ]; then
        echo "$FILE does not exist."
        cp .env.sample .env
    fi
}

installing_node_modules(){
    echo "[Installing]"
    cd client && npm i &
    cd server && npm i &
    wait
    echo "[Installing Finished]"
}

building_client_and_server(){
    echo "[Building]"
    cd server
    npm run build:client &
    npm run build && copy_env && cp package.json ./dist && cp ./.env.local ./dist/.env &
    wait
    cd ../
    echo "[Building Finished]"
}

## Build Public (Takes longer)
if [ "$1" = "intall" ]; then
    installing_node_modules
elif [ "$1" = "build" ]; then
    building_client_and_server
else
    installing_node_modules
    building_client_and_server
fi
echo "[All Done]"
exit 0