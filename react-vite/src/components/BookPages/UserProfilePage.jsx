import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserBooks, fetchUserProfile } from '../../redux/booksSlice';
import { addBook, editBook, deleteBook } from '../../redux/profilebutton';

const UserProfilePage = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.books.userProfile);
  const userBooks = useSelector((state) => state.books.userBooks);
  const loading = useSelector((state) => state.books.loading);
  const errors = useSelector((state) => state.books.errors);

  const [newBook, setNewBook] = useState({ title: '', author: '', genre: '', description: '' });
  const [editingBook, setEditingBook] = useState(null); // Track the book being edited

  useEffect(() => {
    if (userId && userId !== 'undefined') {
      dispatch(fetchUserProfile(userId));
      dispatch(fetchUserBooks(userId));
    }
  }, [dispatch, userId]);

  const handleAddBook = (e) => {
    e.preventDefault();
    dispatch(addBook(newBook));
    setNewBook({ title: '', author: '', genre: '', description: '' }); // Reset form
  };

  const handleEditBook = (e) => {
    e.preventDefault();
    dispatch(editBook(editingBook.id, editingBook));
    setEditingBook(null); // Reset editing state
  };

  const handleDeleteBook = (bookId) => {
    dispatch(deleteBook(bookId));
  };

  if (!userId || userId === 'undefined') {
    return <div>Error: User ID is not available.</div>;
  }

  if (loading) return <div>Loading...</div>;
  if (errors) {
    console.error('Errors:', errors);
    return <div>Error: {errors.server || 'Failed to fetch user data'}</div>;
  }

  return (
    <div>
      <header>
        <h1>User Profile</h1>
      </header>
      <div className="profile-info">
        <h2>{userProfile.username}</h2>
        <p>Email: {userProfile.email}</p>
      </div>
      <h3>Books Added by User</h3>
      <ul>
        {userBooks.length > 0 ? (
          userBooks.map((book) => (
            <li key={book.id}>
              <h4>{book.title}</h4>
              <p>{book.author}</p>
              <button onClick={() => setEditingBook(book)}>Edit</button>
              <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
            </li>
          ))
        ) : (
          <li>No books found.</li>
        )}
      </ul>

      {/* Add New Book Form */}
      <h3>Add a New Book</h3>
      <form onSubmit={handleAddBook}>
        <input
          type="text"
          placeholder="Title"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Genre"
          value={newBook.genre}
          onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={newBook.description}
          onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
        />
        <button type="submit">Add Book</button>
      </form>

      {/* Edit Book Form */}
      {editingBook && (
        <div>
          <h3>Edit Book</h3>
          <form onSubmit={handleEditBook}>
            <input
              type="text"
              placeholder="Title"
              value={editingBook.title}
              onChange={(e) => setEditingBook({ ...editingBook, title: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Author"
              value={editingBook.author}
              onChange={(e) => setEditingBook({ ...editingBook, author: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Genre"
              value={editingBook.genre}
              onChange={(e) => setEditingBook({ ...editingBook, genre: e.target.value })}
            />
            <textarea
              placeholder="Description"
              value={editingBook.description}
              onChange={(e) => setEditingBook({ ...editingBook, description: e.target.value })}
            />
            <button type="submit">Save Changes</button>
            <button onClick={() => setEditingBook(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;