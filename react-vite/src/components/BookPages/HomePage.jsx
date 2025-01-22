import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks, searchBooks } from '../../redux/booksSlice';
import BookCard from '../Book/BookCard';
import { Link } from 'react-router-dom';
import SearchBar from '../Book/SearchBar';
import Footer from '../Book/Footer';
import "./HomePage.css";
import coolBackground from '../../images/cool-background.png';

const HomePage = () => {
    const books = useSelector((state) => state.books.books);
    const loading = useSelector((state) => state.books.loading);
    const errors = useSelector((state) => state.books.errors);
    const dispatch = useDispatch();

    const [query, setQuery] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    // const [sortOption, setSortOption] = useState('');

    const genres = [
        "Fiction", "Mystery", "Fantasy", "Romance", "Science Fiction",
        "Horror", "Thriller", "Biography", "Historical", "Self-Help"
    ];

    useEffect(() => {
        dispatch(fetchBooks());
    }, [dispatch]);

    const handleGenreClick = (genre) => {
        setSelectedGenre(genre);
        dispatch(searchBooks(genre, ''));
    };

    // Sorting logic commented out for now
    // const sortedBooks = () => {
    //     if (sortOption === 'recently-added') {
    //         return [...books].sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));
    //     } else if (sortOption === 'highest-rating') {
    //         return [...books].sort((a, b) => Number(b.rating) - Number(a.rating));
    //     }
    //     return books;
    // };

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
                height: '100vh'
            }}
        >
            <div className="search-bar-container">
                <SearchBar selectedGenre={selectedGenre} setQuery={setQuery} />
                
            
                {/* <div className="sort-dropdown">
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
                </div> */}

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

            <Footer />
        </div>
    );
};

export default HomePage;
