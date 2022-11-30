#!/bin/sh

# 이미지 pull
docker pull $1/$2:latest

# 컨테이너 내리고, 띄우기
if [[ $(docker ps -a --filter="name=node-nest" --filter "status=running" | grep -w node-nest) ]]; then
    docker stop node-test
fi
if [[ $(docker ps -a --filter="name=node-test" --filter "status=created" | grep -w node-test) ]]; then
    docker rm node-test
fi
if [[ $(docker ps -a --filter="name=node-test" --filter "status=exited" | grep -w node-test) ]]; then
    docker rm node-test
fi

docker run -p 8080:8080 -v ~/server/dist:/app/dist -v -d --name node-test $1/$2:latest

exit 0