// Action Types
const FETCH_BOOKS_REQUEST = 'FETCH_BOOKS_REQUEST';
const FETCH_BOOKS_SUCCESS = 'FETCH_BOOKS_SUCCESS';
const FETCH_BOOKS_FAILURE = 'FETCH_BOOKS_FAILURE';

// Action Creators
const fetchBooksRequest = () => ({
  type: FETCH_BOOKS_REQUEST,
});

const fetchBooksSuccess = (books) => ({
  type: FETCH_BOOKS_SUCCESS,
  books,
});

const fetchBooksFailure = (error) => ({
  type: FETCH_BOOKS_FAILURE,
  error,
});

// Thunk Action Creator for Fetching Books
export const fetchBooks = () => async (dispatch) => {
    dispatch(fetchBooksRequest());
    try {
      const response = await fetch('/api/books/books');
      if (!response.ok) {
        const errorData = await response.text(); // Get the error response as text
        throw new Error(`Error: ${response.status} - ${errorData}`);
      }
      const data = await response.json();
      dispatch(fetchBooksSuccess(data));
    } catch (error) {
      console.error('Error fetching books:', error);
      dispatch(fetchBooksFailure({ server: error.message }));
    }
  };

// Initial State
const initialState = {
  books: [],
  loading: false,
  errors: null,
};

// Reducer
const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKS_REQUEST:
      return {
        ...state,
        loading: true,
        errors: null,
      };
    case FETCH_BOOKS_SUCCESS:
      return {
        ...state,
        books: action.books,
        loading: false,
      };
    case FETCH_BOOKS_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.error,
      };
    default:
      return state;
  }
};

export default booksReducer;