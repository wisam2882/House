// components/SearchBar.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchBooks } from '../../redux/booksSlice'; 
import "./searchbar.css";

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
                placeholder="Search by title Or Genre"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                required
                className="search-input"
            />
      <button type="submit" className="search-button-main">Search</button>
        </form>
    );
};

export default SearchBar;