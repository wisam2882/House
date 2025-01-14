import React from 'react';
import "./BookCard.css";

const BookCard = ({ book }) => {
  return (
    <div className="book-card">
      <img src={book.cover_image} />
      <h3>{book.title}</h3>
      <p>{book.author}</p>
    
    </div>
  );
};

export default BookCard;