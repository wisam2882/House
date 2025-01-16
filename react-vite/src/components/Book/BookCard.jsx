
import "./BookCard.css";

const BookCard = ({ book }) => {
  return (
    <div className="book-card">
        <h3>{book.title}</h3>
        <p>{book.author}</p>
      <img src={book.cover_image} />
   
    
    </div>
  );
};

export default BookCard;