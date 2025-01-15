import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBook, addReview, fetchReviews } from '../../redux/booksSlice';
import './BookDetailPage.css'; // Import the CSS file

const BookDetailPage = () => {
  const { bookId } = useParams(); // Get the book ID from the URL
  const dispatch = useDispatch();
  const book = useSelector((state) => state.books.selectedBook);
  const loading = useSelector((state) => state.books.loading);
  const errors = useSelector((state) => state.books.errors);
  const reviews = useSelector((state) => state.books.reviews); // Get reviews from Redux
  const [newReview, setNewReview] = useState({ rating: '', comment: '' });

  useEffect(() => {
    dispatch(fetchBook(bookId)); // Fetch the book details using the ID
    dispatch(fetchReviews(bookId)); // Fetch reviews for the specific book
  }, [dispatch, bookId]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const reviewData = {
      rating: newReview.rating,
      comment: newReview.comment,
    };
    dispatch(addReview(bookId, reviewData)); // Ensure bookId is passed correctly
    setNewReview({ rating: '', comment: '' }); // Reset the form
  };

  // Function to render stars based on rating
  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating); // Full stars for rating, empty stars for the rest
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (errors) {
    return <div>Error: {errors.server || 'Failed to fetch book details'}</div>;
  }

  if (!book) {
    return <div>No book found.</div>;
  }

  return (
    <div className="book-detail-container">
      <h3>{book.title}</h3>
      <p>{book.author}</p>

      <div className="book-info">
        <div className="book-card">
          <img src={book.cover_image} alt={book.title} />
        </div>
        
        <div className="profile-book-description">
          <h2>Summary</h2>
          <p>{book.description}</p>
        </div>

        {/* Custom Star Rating */}
        <div className="rating-container">
          <input
            type="radio"
            name="rating"
            id="rate1"
            value="1"
            checked={newReview.rating === '1'}
            onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
          />
          <label htmlFor="rate1">★</label>
          <input
            type="radio"
            name="rating"
            id="rate2"
            value="2"
            checked={newReview.rating === '2'}
            onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
          />
          <label htmlFor="rate2">★</label>
          <input
            type="radio"
            name="rating"
            id="rate3"
            value="3"
            checked={newReview.rating === '3'}
            onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
          />
          <label htmlFor="rate3">★</label>
          <input
            type="radio"
            name="rating"
            id="rate4"
            value="4"
            checked={newReview.rating === '4'}
            onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
          />
          <label htmlFor="rate4">★</label>
          <input
            type="radio"
            name="rating"
            id="rate5"
            value="5"
            checked={newReview.rating === '5'}
            onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
          />
          <label htmlFor="rate5">★</label>
          <div className="rating-value"></div>
        </div>
      </div>

      <div className="comment-section">
        <h4 className="comment-title">Discussion:</h4>
        <ul className="comment-list">
          {reviews.map((review) => (
            <li className={`comment-item depth-${review.depth}`} key={review.id}>
              <div className="comment">
                <div className="user"></div>
                <div>
                  <div className="comment__body">
                    <p dir="auto">{review.comment}</p>
                  </div>
                  <div className="comment__actions">
                    <span className="comment-author">
                      Judgment: {renderStars(review.rating)}
                    </span>
                  </div>
                </div>
              </div>
              {review.replies && review.replies.length > 0 && (
                <ul className="reply-list">
                  {review.replies.map((reply) => (
                    <li className={`comment-item depth-${reply.depth}`} key={reply.id}>
                      <div className="comment">
                        <div className="user"></div>
                        <div>
                          <div className="comment__body">
                            <p dir="auto">{reply.comment}</p>
                          </div>
                          <div className="comment__actions">
                            <span className="comment-author">
                              Rating: {renderStars(reply.rating)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        <form onSubmit={handleReviewSubmit}>
          <label>
            Comment:
            <textarea
              className="comment-input"
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              required
            />
          </label>
          <button className="submit-comment-button" type="submit">Add Review</button>
        </form>
      </div>
    </div>
  );
};

export default BookDetailPage;