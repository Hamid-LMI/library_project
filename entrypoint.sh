#!/bin/sh

echo "Waiting for PostgreSQL to be ready..."

until pg_isready -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER"; do
    echo "PostgreSQL is not ready yet - sleeping 2 seconds"
    sleep 2
done

echo "PostgreSQL is ready!"

echo "Running database migrations..."

python manage.py migrate

python manage.py collectstatic --noinput

echo "Starting Gunicorn server..."

exec gunicorn library_project.wsgi:application --bind 0.0.0.0:8000