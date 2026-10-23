#!/bin/bash

echo 'Starting Next.js application Dev Local...'
# Start only Postgres and Keycloak; the app runs on the host with npm run dev
docker compose up -d db keycloak

echo 'Waiting for PostgreSQL to be ready...'
max_retries=30
counter=0
while ! docker compose exec -T db pg_isready -h localhost -p 5432 > /dev/null 2>&1; do
    counter=$((counter+1))
    if [ $counter -eq $max_retries ]; then
        echo "Failed to connect to PostgreSQL after $max_retries attempts. Exiting..."
        exit 1
    fi
    echo "Waiting for PostgreSQL to be ready... (Attempt $counter/$max_retries)"
    sleep 1
done
echo "PostgreSQL is ready!"

echo 'Running migrations and seeding database...'
npm run db:migrate-dev &&
npm run db:seed &&
echo 'Starting Next.js application Dev Local...'
npm run dev
