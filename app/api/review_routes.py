from flask import Blueprint, request, jsonify
from app.models import db  
from app.models.review import Review
from app.models.user import User  

from flask_login import current_user
from flask_login import login_required

review_routes = Blueprint('reviews', __name__)




# Get All Reviews for a User
@review_routes.route('/users/<int:user_id>/reviews', methods=['GET'])
@login_required
def get_user_reviews(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    reviews = Review.query.filter_by(user_id=user_id).all()
    return jsonify([review.to_dict() for review in reviews]), 200

# Edit a Review
@review_routes.route('/reviews/<int:review_id>', methods=['PUT'])
@login_required
def edit_review(review_id):
    review = Review.query.get(review_id)
    if not review:
        return jsonify({"error": "Review not found"}), 404

    data = request.get_json()
    try:
        review.rating = data.get('rating', review.rating)
        review.comment = data.get('comment', review.comment)
        db.session.commit()
        return jsonify({"message": "Review successfully updated.", "review": review.to_dict()}), 200
    except Exception as e:
        return jsonify({"error": "Validation errors", "details": str(e)}), 400

# Delete a Review
@review_routes.route('/reviews/<int:review_id>', methods=['DELETE'])
@login_required
def delete_review(review_id):
    review = Review.query.get(review_id)
    if not review:
        return jsonify({"error": "Review not found"}), 404

    db.session.delete(review)
    db.session.commit()
    return jsonify({"message": "Review deleted successfully."}), 200





# Get User Reviews
# @review_routes.route('/users/<int:user_id>/reviews', methods=['GET'])
# def get_user_reviews(user_id):
#     user = User.query.get(user_id)
#     if user:
#         reviews = [
#             {
#                 "id": review.id,
#                 "content": review.content,
#                 "book_id": review.book_id
#             } for review in user.reviews
#         ]
#         return jsonify(reviews), 200
#     return jsonify({"error": "User not found."}), 404

# # Edit a Review
# @review_routes.route('/reviews/<int:review_id>', methods=['PUT'])
# def edit_review(review_id):
#     review = Review.query.get(review_id)
#     if review:
#         data = request.get_json()
#         review.content = data.get('content', review.content)
#         review.rating = data.get('rating', review.rating)
#         db.session.commit()
#         return jsonify({"id": review.id, "content": review.content, "rating": review.rating}), 200
#     return jsonify({"error": "Review not found."}), 404

# # Delete a Review
# @review_routes.route('/reviews/<int:review_id>', methods=['DELETE'])
# def delete_review(review_id):
#     review = Review.query.get(review_id)
#     if review:
#         db.session.delete(review)
#         db.session.commit()
#         return jsonify({"message": "Review deleted successfully."}), 200
#     return jsonify({"error": "Review not found."}), 404






    # # Get Reviews by the Current User
# @book_routes.route('/users/reviews', methods=['GET'])
# # @login_required
# def get_user_reviews():
#     user_reviews = Review.query.filter_by(user_id=current_user.id).all()
#     return jsonify([review.to_dict() for review in user_reviews]), 200

# # Edit Review
# @book_routes.route('/reviews/<int:review_id>', methods=['PUT'])
# @login_required
# def edit_review(review_id):
#     review = Review.query.get(review_id)
#     if not review:
#         return jsonify({"error": "Review not found"}), 404

#     # Ensure the current user is the owner of the review
#     if review.user_id != current_user.id:
#         return jsonify({"error": "You do not have permission to edit this review."}), 403

#     data = request.get_json()

#     try:
#         review.rating = data['rating']
#         review.comment = data.get('comment', review.comment)
#         db.session.commit()
#         return jsonify({"message": "Review successfully updated.", "review": review.to_dict()}), 200
#     except Exception as e:
#         return jsonify({"error": "Validation errors", "details": str(e)}), 400

# # Delete Review
# @book_routes.route('/reviews/<int:review_id>', methods=['DELETE'])
# @login_required
# def delete_review(review_id):
#     review = Review.query.get(review_id)
#     if not review:
#         return jsonify({"error": "Review not found"}), 404

#     # Ensure the current user is the owner of the review
#     if review.user_id != current_user.id:
#         return jsonify({"error": "You do not have permission to delete this review."}), 403

#     db.session.delete(review)
#     db.session.commit()
#     return jsonify({"message": "Review successfully deleted."}), 204