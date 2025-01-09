// components/BookPages/BookDetailPage.jsx
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBook } from '../../redux/booksSlice'; // Import the fetchBook action

const BookDetailPage = () => {
  const { bookId } = useParams(); // Get the book ID from the URL
  const dispatch = useDispatch();
  const book = useSelector((state) => state.books.selectedBook);
  const loading = useSelector((state) => state.books.loading);
  const errors = useSelector((state) => state.books.errors);

  useEffect(() => {
    dispatch(fetchBook(bookId)); // Fetch the book details using the ID
  }, [dispatch, bookId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (errors) {
    return <div>Error: {errors.server || 'Failed to fetch book details'}</div>;
  }

  // Check if book is defined before accessing its properties
  if (!book) {
    return <div>No book found.</div>; // Handle case where book is not found
  }

  return (
    <div>
      <h2>{book.title}</h2>
      <h3>{book.author}</h3>
      {book.cover_image && <img src={book.cover_image} alt={book.title} />}
      <p>{book.description}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default BookDetailPage;
