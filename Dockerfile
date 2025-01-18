FROM python:3.9.18-alpine3.18

# Install necessary packages
RUN apk add --no-cache build-base postgresql-dev gcc python3-dev musl-dev

# Set environment variables
ARG FLASK_APP
ARG FLASK_ENV
ARG DATABASE_URL
ARG SCHEMA
ARG SECRET_KEY

# Set the working directory
WORKDIR /var/www

# Copy requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install --no-cache-dir psycopg2

# Copy the rest of the application code
COPY . .

# Run database migrations
RUN flask db upgrade

# Seed the database if necessary
RUN flask seed all

# Start the application
CMD ["gunicorn", "app:app"]