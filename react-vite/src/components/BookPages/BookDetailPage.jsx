import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBook, addReview, fetchReviews } from '../../redux/booksSlice';

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
    <div>
      <h2>{book.title}</h2>
      <h3>{book.author}</h3>
      {book.cover_image && <img src={book.cover_image} alt={book.title} />}
      <p>{book.description}</p>

      <h4>Reviews:</h4>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <strong>Rating: {review.rating}</strong>
            <p>{review.comment}</p>
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
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            required
          />
        </label>
        <button type="submit">Add Review</button>
      </form>
    </div>
  );
};

export default BookDetailPage;