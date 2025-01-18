FROM python:3.9.18-alpine3.18

RUN apk add build-base
RUN apk add postgresql-dev gcc python3-dev musl-dev

ARG FLASK_APP
ARG FLASK_ENV
ARG DATABASE_URL
ARG SCHEMA
ARG SECRET_KEY

WORKDIR /var/www

COPY requirements.txt .

RUN pip install -r requirements.txt
RUN pip install psycopg2

COPY . .

# Print environment variables for debugging
RUN echo "FLASK_APP: $FLASK_APP" && \
    echo "FLASK_ENV: $FLASK_ENV" && \
    echo "DATABASE_URL: $DATABASE_URL" && \
    echo "SCHEMA: $SCHEMA" && \
    echo "SECRET_KEY: $SECRET_KEY"

# Check database connection
RUN python -c "import psycopg2; conn = psycopg2.connect('$DATABASE_URL'); print('Database connected successfully'); conn.close()"

# List migration files
RUN ls -l /var/www/migrations/versions

RUN flask db upgrade
RUN flask seed all
CMD gunicorn app:app