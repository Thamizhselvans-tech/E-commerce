#!/bin/bash
# Script for running the docker setup in the server

set -e

BASE_DIR="$HOME"

# ----------------------------------
echo "Stopping existing containers..."

cd "$BASE_DIR/videohub"
docker compose down

cd "$BASE_DIR/videohub/infrastructure/docker-kafka"
docker compose down

cd "$BASE_DIR/videohub/infrastructure/docker-mysql"
docker compose down

cd "$BASE_DIR/chocolatey"
docker compose down

echo "All containers stopped."
# ----------------------------------

echo "Starting Chocolatey application..."
cd "$BASE_DIR/chocolatey"
docker compose up -d

echo "Starting VideoHub MySQL..."
cd "$BASE_DIR/videohub/infrastructure/docker-mysql"
docker compose up -d

echo "Starting VideoHub Kafka..."
cd "$BASE_DIR/videohub/infrastructure/docker-kafka"
docker compose up -d

echo "Starting VideoHub application..."
cd "$BASE_DIR/videohub"
docker compose up -d

echo "All services started successfully!"
