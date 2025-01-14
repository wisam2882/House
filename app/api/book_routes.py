from flask import Blueprint, request, jsonify, session
from app.models import db
from app.models.book import Book
from app.models.review import Review
from flask_login import current_user
from flask_login import login_required

book_routes = Blueprint('books', __name__)

@book_routes.route('/books', methods=['POST'])
def add_book():
    data = request.get_json()
    
    # Retrieve user_id from the current user
    user_id = current_user.id if current_user.is_authenticated else None
    
    if user_id is None:
        return jsonify({"error": "You must be logged in to create a new book."}), 401  # Unauthorized

    try:
        new_book = Book(
            title=data['title'],
            author=data['author'],
            cover_image=data.get('cover_image'),
            description=data.get('description'),
            genre=data.get('genre'),
            user_id=user_id  # Use the user_id from the current user
        )
        db.session.add(new_book)
        db.session.commit()
        return jsonify({"message": "Book successfully added.", "book": new_book.to_dict()}), 201
    except Exception as e:
        return jsonify({"error": "Validation errors", "details": str(e)}), 400

# Edit Book
@book_routes.route('/books/<int:book_id>', methods=['PUT'])
def edit_book(book_id):
    data = request.get_json()
    book = Book.query.get(book_id)
    if not book:
        return jsonify({"error": "Book not found"}), 404

    try:
        book.title = data['title']
        book.author = data['author']
        book.cover_image = data.get('cover_image')
        book.description = data.get('description')
        book.genre = data.get('genre')
        db.session.commit()
        return jsonify({"message": "Book successfully updated.", "book": book.to_dict()}), 200
    except Exception as e:
        return jsonify({"error": "Validation errors", "details": str(e)}), 400

# Delete Book
@book_routes.route('/books/<int:book_id>', methods=['DELETE'])
def delete_book(book_id):
    book = Book.query.get(book_id)
    if not book:
        return jsonify({"error": "Book not found"}), 404

    db.session.delete(book)
    db.session.commit()
    return jsonify({"message": "Book successfully deleted."}), 204

# Get All Books
@book_routes.route('/books', methods=['GET'])
def get_all_books():
    books = Book.query.all()
    return jsonify([book.to_dict() for book in books]), 200

# Get Book Details
@book_routes.route('/books/<int:book_id>', methods=['GET'])
def get_book_detail(book_id):
    book = Book.query.get(book_id)
    if not book:
        return jsonify({"error": "Book not found"}), 404
    return jsonify(book.to_dict()), 200

# Search Books
@book_routes.route('/books/search', methods=['GET'])
def search_books():
    tag = request.args.get('tag', '')
    books = Book.query.filter(
    (Book.title.ilike(f"%{tag}%")) | (Book.genre.ilike(f"%{tag}%"))
).all()
    return jsonify([book.to_dict() for book in books]), 200

# Add Review

@book_routes.route('/books/<int:book_id>/reviews', methods=['POST'])
@login_required
def add_review(book_id):
    print(f"Current User: {current_user}")  # Debugging line
    data = request.get_json()
    book = Book.query.get(book_id)
    if not book:
        return jsonify({"error": "Book not found"}), 404

    try:
        new_review = Review(
            book_id=book_id,
            user_id=current_user.id,  # Use the current user's ID
            rating=data['rating'],
            comment=data.get('comment')
        )
        db.session.add(new_review)
        db.session.commit()
        return jsonify({"message": "Review successfully added.", "review": new_review.to_dict()}), 201
    except Exception as e:
        return jsonify({"error": "Validation errors", "details": str(e)}), 400

# Get Reviews for a Book
@book_routes.route('/books/<int:book_id>/reviews', methods=['GET'])
def get_reviews(book_id):
    book = Book.query.get(book_id)
    if not book:
        return jsonify({"error": "Book not found"}), 404

    reviews = Review.query.filter_by(book_id=book_id).all()
    return jsonify([review.to_dict() for review in reviews]), 200