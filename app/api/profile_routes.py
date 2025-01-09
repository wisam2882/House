from flask import Blueprint, request, jsonify
from app.models import db  # Import db from your models
from app.models.user import User  # Import User model
from app.models.book import Book  # Import Book model

profile_routes = Blueprint('profiles', __name__)

# Get User Profile
@profile_routes.route('/users/<int:user_id>', methods=['GET'])
def get_user_profile(user_id):
    user = User.query.get(user_id)
    if user:
        return jsonify({"id": user.id, "username": user.username, "email": user.email}), 200
    return jsonify({"error": "User not found."}), 404

# Get User's Books
@profile_routes.route('/users/<int:user_id>/books', methods=['GET'])
def get_user_books(user_id):
    user = User.query.get(user_id)
    if user:
        books = [{"id": book.id, "title": book.title, "author": book.author, "genre": book.genre, "description": book.description, "cover_image": book.cover_image} for book in user.books]
        return jsonify(books), 200
    return jsonify({"error": "User not found."}), 404