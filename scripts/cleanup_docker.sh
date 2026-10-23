#!/bin/bash

docker-compose down && docker volume prune --force
awk '/image:/ {print $2}' docker-compose.yml | while read image; do
  if docker images --format "{{.Repository}}:{{.Tag}}" | grep -q "^${image}$"; then
    docker rmi "$image"
  else
    echo "Image $image not found, skipping..."
  fi
done
