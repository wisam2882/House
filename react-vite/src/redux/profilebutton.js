// Action Types
const ADD_BOOK_REQUEST = 'ADD_BOOK_REQUEST';
const ADD_BOOK_SUCCESS = 'ADD_BOOK_SUCCESS';
const ADD_BOOK_FAILURE = 'ADD_BOOK_FAILURE';

const EDIT_BOOK_REQUEST = 'EDIT_BOOK_REQUEST';
const EDIT_BOOK_SUCCESS = 'EDIT_BOOK_SUCCESS';
const EDIT_BOOK_FAILURE = 'EDIT_BOOK_FAILURE';

const DELETE_BOOK_REQUEST = 'DELETE_BOOK_REQUEST';
const DELETE_BOOK_SUCCESS = 'DELETE_BOOK_SUCCESS';
const DELETE_BOOK_FAILURE = 'DELETE_BOOK_FAILURE';

// Action Creators
const addBookRequest = () => ({ type: ADD_BOOK_REQUEST });
const addBookSuccess = (book) => ({ type: ADD_BOOK_SUCCESS, book });
const addBookFailure = (error) => ({ type: ADD_BOOK_FAILURE, error });

const editBookRequest = () => ({ type: EDIT_BOOK_REQUEST });
const editBookSuccess = (book) => ({ type: EDIT_BOOK_SUCCESS, book });
const editBookFailure = (error) => ({ type: EDIT_BOOK_FAILURE, error });

const deleteBookRequest = () => ({ type: DELETE_BOOK_REQUEST });
const deleteBookSuccess = (bookId) => ({ type: DELETE_BOOK_SUCCESS, bookId });
const deleteBookFailure = (error) => ({ type: DELETE_BOOK_FAILURE, error });

// Thunk Actions
export const addBook = (bookData) => async (dispatch) => {
    dispatch(addBookRequest());
    try {
        const response = await fetch('/api/books/books', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookData),
        });
        const data = await response.json();
        dispatch(addBookSuccess(data.book)); // Dispatch success with the new book
    } catch (error) {
        dispatch(addBookFailure(error.message)); // Dispatch failure with error message
    }
};

export const editBook = (bookId, bookData) => async (dispatch) => {
    dispatch(editBookRequest());
    try {
        const response = await fetch(`/api/books/books/${bookId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookData),
        });
        const data = await response.json();
        dispatch(editBookSuccess(data.book)); // Dispatch success with the updated book
    } catch (error) {
        dispatch(editBookFailure(error.message)); // Dispatch failure with error message
    }
};

export const deleteBook = (bookId) => async (dispatch) => {
    dispatch(deleteBookRequest());
    try {
        await fetch(`/api/books/books/${bookId}`, { method: 'DELETE' });
        dispatch(deleteBookSuccess(bookId)); // Dispatch success with the deleted book ID
    } catch (error) {
        dispatch(deleteBookFailure(error.message)); // Dispatch failure with error message
    }
};

// Initial State
const initialState = {
    userBooks: [],
    loading: false,
    errors: null,
};

// Reducer
const booksReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_BOOK_REQUEST:
        case EDIT_BOOK_REQUEST:
        case DELETE_BOOK_REQUEST:
            return { ...state, loading: true, errors: null };

        case ADD_BOOK_SUCCESS:
            return { ...state, userBooks: [...state.userBooks, action.book], loading: false };

        case EDIT_BOOK_SUCCESS:
            return {
                ...state,
                userBooks: state.userBooks.map((book) =>
                    book.id === action.book.id ? action.book : book
                ),
                loading: false,
            };

        case DELETE_BOOK_SUCCESS:
            return {
                ...state,
                userBooks: state.userBooks.filter((book) => book.id !== action.bookId),
                loading: false,
            };

        case ADD_BOOK_FAILURE:
        case EDIT_BOOK_FAILURE:
        case DELETE_BOOK_FAILURE:
            return { ...state, loading: false, errors: action.error };

        default:
            return state;
    }
};

export default booksReducer;