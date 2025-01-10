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
      <div className="book-info">
        <h2 className="book-title">{book.title}</h2>
        <h3 className="book-details">{book.author}</h3>
        {book.cover_image && <img className="book-cover" src={book.cover_image} alt={book.title} />}
        <p className="book-details">{book.description}</p>

        <div className="star-rating">
          <span className="star">★</span>
          <span className="star">★</span>
          <span className="star">★</span>
          <span className="star">★</span>
          <span className="star">☆</span>
        </div>
      </div>

      <div className="comment-section">
        <h4 className="comment-title">Reviews:</h4>
        <ul className="comment-list">
          {reviews.map((review) => (
            <li className="comment-item" key={review.id}>
              <span className="comment-author">Rating: {review.rating}</span>
              <p className="comment-text">{review.comment}</p>
            </li>
          ))}
        </ul>

        <form onSubmit={handleReviewSubmit}>
          <label>
            Rating:
            <input
              type="number"
              min="1"
              max="5"
              value={newReview.rating}
              onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
              required
            />
          </label>
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