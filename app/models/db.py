from . import db
from flask_sqlalchemy import SQLAlchemy

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


db = SQLAlchemy()

# helper function for adding prefix to foreign key column references in production
def add_prefix_for_prod(attr):
    if environment == "production":
        return f"{SCHEMA}.{attr}"
    else:
        return attr



# Join table for many-to-many relationship between Users and Books
user_books = db.Table(
    'user_books',
    db.metadata,
    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('book_id', db.Integer, db.ForeignKey(add_prefix_for_prod('books.id')), primary_key=True),
    schema=SCHEMA if environment == "production" else None
)

book_reviews = db.Table(
    'book_reviews',
    db.metadata,
    db.Column('book_id', db.Integer, db.ForeignKey(add_prefix_for_prod('books.id')), primary_key=True),
    db.Column('review_id', db.Integer, db.ForeignKey(add_prefix_for_prod('reviews.id')), primary_key=True),
    schema=SCHEMA if environment == "production" else None
)