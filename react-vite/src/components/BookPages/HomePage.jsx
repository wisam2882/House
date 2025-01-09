// components/BookPage/HomePage.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks } from '../../redux/booksSlice'; 
import BookCard from '../Book/BookCard';
import { Link } from 'react-router-dom'; // Import Link
import "./HomePage.css";

const HomePage = () => {
  const books = useSelector((state) => state.books.books);
  const loading = useSelector((state) => state.books.loading);
  const errors = useSelector((state) => state.books.errors);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (errors && Object.keys(errors).length > 0) {
    return <div>Error: {errors.server || 'Failed to fetch books'}</div>;
  }

  return (
    <div>
      <h2>Featured Books</h2>
      {books.length === 0 ? (
        <p>No books available.</p>
      ) : (
        <div className="book-list">
          {books.map((book) => (
            <Link to={`/books/${book.id}`} key={book.id}> {/* Link to BookDetail */}
              <BookCard book={book} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;