import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBook, addReview, fetchReviews } from '../../redux/booksSlice';
import './BookDetailPage.css'; // Import the CSS file
import Footer from '../Book/Footer';

const BookDetailPage = () => {
  const { bookId } = useParams();
  const dispatch = useDispatch();
  const book = useSelector((state) => state.books.selectedBook);
  const loading = useSelector((state) => state.books.loading);
  const errors = useSelector((state) => state.books.errors);
  const reviews = useSelector((state) => state.books.reviews);
  const user = useSelector((state) => state.session.user);
  const isAuthenticated = user !== null;
  const [newReview, setNewReview] = useState({ rating: '', comment: '' });
  const [warningMessage, setWarningMessage] = useState('');

  useEffect(() => {
    dispatch(fetchBook(bookId));
    dispatch(fetchReviews(bookId));
  }, [dispatch, bookId]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    let messages = [];

    if (!isAuthenticated) {
      messages.push('You must be logged in.');
    }

    if (newReview.rating === '') {
      messages.push('Please select a rating!');
    }

    if (messages.length > 0) {
      setWarningMessage(messages.join(' '));
      return;
    }

    const reviewData = {
      rating: newReview.rating,
      comment: newReview.comment,
    };
    dispatch(addReview(bookId, reviewData));
    setNewReview({ rating: '', comment: '' });
    setWarningMessage('');
  };

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((acc, review) => acc + parseInt(review.rating), 0);
    return (totalRating / reviews.length).toFixed(1);
  };

  const averageRating = calculateAverageRating(reviews);

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
    <div className="page-container">
      <div className="book-detail-container">
        <h3>{book.title}</h3>
        <p>{book.author}</p>

        <div className="average-rating">
          <h4>Average Rating: {averageRating} ★</h4>
        </div>

        <div className="book-info">
          <div className="book-card">
            <img src={book.cover_image} alt={book.title} />
          </div>

          <div className="profile-book-description">
            <h2>Summary</h2>
            <p>{book.description}</p>
          </div>

          <div className="rating-container">
             {/* Render radio buttons in ascending order (1 to 5) */}
             {[1, 2, 3, 4, 5].map((value) => (
                  <React.Fragment key={`rate-${value}`}>
                      <input
                          type="radio"
                          name="rating"
                          id={`rate${value}`}
                           value={value}
                           checked={newReview.rating === String(value)}
                           onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                      />
                      <label htmlFor={`rate${value}`}>★</label>
                    </React.Fragment>
                ))}
           
            <div className="rating-value"></div>
          </div>
        </div>

        <div className="comment-section">
          <h4 className="comment-title">Discussion:</h4>
          {warningMessage && <div className="warning-message">{warningMessage}</div>}
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
            <button className="review-submit-button" type="submit">Add Review</button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookDetailPage;