# from flask import Blueprint, jsonify
# from flask_login import current_user, login_required
# from app.models import Book

# profile_routes = Blueprint('profile', __name__)

# # Get User Profile
# @profile_routes.route('/me', methods=['GET'])
# @login_required
# def get_user_profile():
#     """
#     Returns the authenticated user's profile information.
#     """
#     return jsonify({
#         "id": current_user.id,
#         "username": current_user.username,
#         "email": current_user.email,
#         # "profile_picture": current_user.profile_picture
#     }), 200

# # Get User's Books
# @profile_routes.route('/me/books', methods=['GET'])
# @login_required
# def get_user_books():
#     """
#     Returns a list of books added by the authenticated user.
#     """
#     books = Book.query.filter_by(user_id=current_user.id).all()
#     return jsonify([book.to_dict() for book in books]), 200


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
        books = [{"id": book.id, "title": book.title, "author": book.author} for book in user.books]
        return jsonify(books), 200
    return jsonify({"error": "User not found."}), 404