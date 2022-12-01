#!/bin/sh

# 이미지 pull
docker pull $1/$2:latest

# 컨테이너 내리고, 띄우기
if [[ $(docker ps -a --filter="name=node-nest" --filter "status=running" | grep -w node-nest) ]]; then
    docker stop node-nest
fi
if [[ $(docker ps -a --filter="name=node-nest" --filter "status=created" | grep -w node-nest) ]]; then
    docker rm node-nest
fi
if [[ $(docker ps -a --filter="name=node-nest" --filter "status=exited" | grep -w node-nest) ]]; then
    docker rm node-nest
fi

docker run -p 8080:8080 -v ~/server/dist:/app/dist -v -d --name node-nest $1/$2:latest

exit 0