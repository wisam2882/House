// components/SearchBar.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchBooks } from '../../redux/booksSlice'; 

const SearchBar = ({ selectedGenre }) => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(searchBooks(query, selectedGenre)); // Dispatch the search action with the query and selected genre
    };

    return (
        <form onSubmit={handleSearch} className="search-bar">
            <input
                type="text"
                placeholder="Search by title..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                required
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;