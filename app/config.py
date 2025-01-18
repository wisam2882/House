import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    FLASK_RUN_PORT = os.environ.get('FLASK_RUN_PORT')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # If DATABASE_URL is set (for production), use it. Otherwise, fallback to SQLite.
    if os.environ.get('DATABASE_URL'):
        # For PostgreSQL in production (Heroku or Render)
        SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL').replace('postgres://', 'postgresql://')
    else:
        # For local SQLite setup
        SQLALCHEMY_DATABASE_URI = 'sqlite:///your_local_db.db'
    
    SQLALCHEMY_ECHO = True
