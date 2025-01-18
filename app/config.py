import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    FLASK_RUN_PORT = os.environ.get('FLASK_RUN_PORT')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True

    # Use SQLite locally if in devcontainer
    if os.environ.get('DATABASE_URL') == 'sqlite:///dev.db':
        SQLALCHEMY_DATABASE_URI = 'sqlite:///dev.db'
    else:
        # If you later switch to PostgreSQL in other environments (prod), adjust DATABASE_URL
        SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL').replace('postgres://', 'postgresql://')

    # If you have a schema specified, you can use it for the schema
    SCHEMA = os.environ.get('SCHEMA', 'public')  # Default to 'public' if not set
