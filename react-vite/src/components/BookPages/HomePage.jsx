
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks, searchBooks } from '../../redux/booksSlice'; 
import BookCard from '../Book/BookCard';
import { Link } from 'react-router-dom'; 
import SearchBar from '../Book/SearchBar'; 
import "./HomePage.css";
import coolBackground from '../../../public/cool-background.png';

const HomePage = () => {
    const books = useSelector((state) => state.books.books);
    const loading = useSelector((state) => state.books.loading);
    const errors = useSelector((state) => state.books.errors);
    const dispatch = useDispatch();

    const [query, setQuery] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    const [sortOption, setSortOption] = useState(''); // State for sort option

    const genres = [
        "Fiction", "Mystery", "Fantasy", "Romance", "Science Fiction",
        "Horror", "Thriller", "Biography", "Historical", "Self-Help"
    ];

    useEffect(() => {
        dispatch(fetchBooks());
    }, [dispatch]);

    const handleGenreClick = (genre) => {
        setSelectedGenre(genre);
        setQuery(genre); // Set the query to the selected genre
        dispatch(searchBooks(genre, '')); // Dispatch search with the selected genre
    };

    // Sorting function
    const sortedBooks = () => {
        if (sortOption === 'recently-added') {
            return [...books].sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate)); // Assuming 'addedDate' is a property in your book object
        } else if (sortOption === 'highest-rating') {
            return [...books].sort((a, b) => b.rating - a.rating); // Assuming 'rating' is a property in your book object
        }
        return books; // Return original order if no sort option is selected
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (errors && Object.keys(errors).length > 0) {
        return <div>Error: {errors.server || 'Failed to fetch books'}</div>;
    }

    return (
        
        <div 
            className="homepage-container" 
            style={{ 
                backgroundImage: `url(${coolBackground})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center', 
                backgroundRepeat: 'no-repeat', 
                height: '100vh' // Optional: Set height to full viewport height
            }}
        >
            <div className="search-bar-container">
                <SearchBar selectedGenre={selectedGenre} setQuery={setQuery} />
                
                {/* Sort By Dropdown */}
                <div className="sort-dropdown">
                    <label htmlFor="sort">Sort By:</label>
                    <select 
                        id="sort" 
                        value={sortOption} 
                        onChange={(e) => setSortOption(e.target.value)}
                    >
                        <option value="">Select an option</option>
                        <option value="recently-added">Recently Added</option>
                        <option value="highest-rating">Highest Rating</option>
                    </select>
                </div>

                {/* Categories Section */}
                <h3>Categories</h3>
                <div className="genre-links">
                    {genres.map((genre, index) => (
                        <span 
                        key={index} 
                        className="genre-link special-genre-link" 
            onClick={() => handleGenreClick(genre)}
        >
            {genre}
        </span>
    ))}
</div>
            </div>

          
            <div className="book-list-container">
                <h2>Featured Books</h2>
                {sortedBooks().length === 0 ? (
                    <p>No books available.</p>
                ) : (
                    <div className="book-list">
                        {sortedBooks().map((book) => (
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
