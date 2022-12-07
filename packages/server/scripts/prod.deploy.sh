#!/bin/sh

# 이미지 pull
docker pull $1/$2:latest

# 컨테이너 내리고, 띄우기
if [[ $(docker ps -a --filter="name=$3" --filter "status=running" | grep -w $3) ]]; then
    docker stop $3
fi
if [[ $(docker ps -a --filter="name=$3" --filter "status=created" | grep -w $3) ]]; then
    docker rm $3
fi
if [[ $(docker ps -a --filter="name=$3" --filter "status=exited" | grep -w $3) ]]; then
    docker rm $3
fi

docker create -p 8080:8080 --name $3 $1/$2:latest

docker cp .prod.env $3:/app

docker start $3

if [[ $(docker ps -a --filter="name=$3" --filter "status=running" | grep -w $3) ]]; then
    echo 'dev-deploy success'
fi
