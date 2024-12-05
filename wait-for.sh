#!/bin/sh
host="$1"
shift
until nc -z "$host" 27017; do
  echo "Waiting for MongoDB to start..."
  sleep 2
done
exec "$@"
