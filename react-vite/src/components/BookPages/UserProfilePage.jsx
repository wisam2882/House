import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserBooks, fetchUserProfile } from '../../redux/booksSlice';
import { addBook, editBook, deleteBook } from '../../redux/profilebutton';
import bookImage from '../../images/book3.jpg';
import bookImage5 from '../../images/book5.jpg';
import bookImage4 from '../../images/book4.jpg';
import './UserProfilePage.css';

const UserProfilePage = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const userProfile = useSelector((state) => state.books.userProfile);
    const userBooks = useSelector((state) => state.books.userBooks);
    const loading = useSelector((state) => state.books.loading);
    const errors = useSelector((state) => state.books.errors);

    const [newBook, setNewBook] = useState({ title: '', author: '', genre: '', description: '' });
    const [editingBook, setEditingBook] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        if (userId && userId !== 'undefined') {
            dispatch(fetchUserProfile(userId));
            dispatch(fetchUserBooks(userId));
        }
    }, [dispatch, userId]);

    const handleAddBook = (e) => {
        e.preventDefault();
        dispatch(addBook(newBook)).then(() => {
            // Optionally, you can fetch the user books again to ensure the latest state
            dispatch(fetchUserBooks(userId));
        });
        setNewBook({ title: '', author: '', genre: '', description: '' });
        setIsPopupOpen(false);
    };

    const handleEditBook = (e) => {
        e.preventDefault();
        dispatch(editBook(editingBook.id, editingBook)).then(() => {
            // Optionally, you can fetch the user books again to ensure the latest state
            dispatch(fetchUserBooks(userId));
        });
        setEditingBook(null);
    };

    const handleDeleteBook = (bookId) => {
        dispatch(deleteBook(bookId)).then(() => {
            // Optionally, you can fetch the user books again to ensure the latest state
            dispatch(fetchUserBooks(userId));
        });
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
        <div className="profile-container">
            <div className="profile-info">
                <header>
                <div className="profile-header">
                <h1>User Profile</h1>
                 <h2>Welcome, {userProfile.username}</h2>
                </div>
                </header>
                <img src={bookImage} alt="Book 1" className="profile-image" />
                <img src={bookImage5} alt="Book 1" className="profile-image" />
                <img src={bookImage4} alt="Book 1" className="profile-image" />
            </div>
            <div className="book-info">
                <h3>Books Added by {userProfile.username}</h3>
                <ul>
                    {userBooks.length > 0 ? (
                        userBooks.map((book) => (
                            
                            <li key={book.id}>
                            <div className="book-card">
                            <img src={book.cover_image} />
                            <h3>{book.title}</h3>
                             <p>{book.author}</p>
                          
                            </div>
                            <div className="profile-book-description">
                            <p>{book.description}</p>
                            </div>
                                <button onClick={() => { setEditingBook(book); setIsPopupOpen(true); }}>Edit</button>
                                <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
                            </li>
                        ))
                    ) : (
                        <li>No books found.</li>
                    )}
                </ul>

                <button className="open-popup-button" onClick={() => setIsPopupOpen(true)}>
                    Add a New Book
                </button>

                {isPopupOpen && (
                    <div className="overlay">
                        <div className="popup">
                            <button className="close-button" onClick={() => setIsPopupOpen(false)}>
                                &times;
                            </button>
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
                                <input
                                    type="text"
                                    placeholder="Cover Image URL"
                                    value={newBook.cover_image}
                                    onChange={(e) => setNewBook({ ...newBook, cover_image: e.target.value })}
                                />
                                <button type="submit">Add Book</button>
                            </form>
                        </div>
                    </div>
                )}

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
                            <input
                                type="text"
                                placeholder="Cover Image URL"
                                value={editingBook.cover_image || ''} 
                                onChange={(e) => setEditingBook({ ...editingBook, cover_image: e.target.value })}
                            />
                            <button type="submit">Save Changes</button>
                            <button onClick={() => setEditingBook(null)}>Cancel</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfilePage;