// components/BookPage/HomePage.jsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks, searchBooks } from '../../redux/booksSlice'; 
import BookCard from '../Book/BookCard';
import { Link } from 'react-router-dom'; 
import SearchBar from '../Book/SearchBar'; 
import "./HomePage.css";

const HomePage = () => {
    const books = useSelector((state) => state.books.books);
    const loading = useSelector((state) => state.books.loading);
    const errors = useSelector((state) => state.books.errors);
    const dispatch = useDispatch();

    const [query, setQuery] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');

    const genres = [
        "Fiction", "Mystery", "Fantasy", "Romance", "Science Fiction",
        "Horror", "Thriller", "Biography", "Historical", "Self-Help"
    ];

    useEffect(() => {
        dispatch(fetchBooks());
    }, [dispatch]);

    const handleGenreClick = (genre) => {
        setSelectedGenre(genre);
        setQuery(''); // Clear the query when a genre is selected
        dispatch(searchBooks('', genre)); // Dispatch search with the selected genre
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (errors && Object.keys(errors).length > 0) {
        return <div>Error: {errors.server || 'Failed to fetch books'}</div>;
    }

    return (
        <div className="homepage-container">
            {/* Left side: Search bar and genre links */}
            <div className="search-bar-container">
                <SearchBar selectedGenre={selectedGenre} />
                
                {/* Categories Section */}
                <h3>Categories</h3>
                <div className="genre-links">
                    {genres.map((genre, index) => (
                        <span 
                            key={index} 
                            className="genre-link" 
                            onClick={() => handleGenreClick(genre)}
                        >
                            {genre}
                        </span>
                    ))}
                </div>
            </div>

            {/* Right side: Book list */}
            <div className="book-list-container">
                <h2>Featured Books</h2>
                {books.length === 0 ? (
                    <p>No books available.</p>
                ) : (
                    <div className="book-list">
                        {books.map((book) => (
                            <Link to={`/books/${book.id}`} key={book.id}>
                                <BookCard book={book} />
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;