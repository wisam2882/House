

// Action Types
const FETCH_BOOKS_REQUEST = 'FETCH_BOOKS_REQUEST';
const FETCH_BOOKS_SUCCESS = 'FETCH_BOOKS_SUCCESS';
const FETCH_BOOKS_FAILURE = 'FETCH_BOOKS_FAILURE';

const FETCH_BOOK_REQUEST = 'FETCH_BOOK_REQUEST';
const FETCH_BOOK_SUCCESS = 'FETCH_BOOK_SUCCESS';
const FETCH_BOOK_FAILURE = 'FETCH_BOOK_FAILURE';

const FETCH_USER_PROFILE_REQUEST = 'FETCH_USER_PROFILE_REQUEST';
const FETCH_USER_PROFILE_SUCCESS = 'FETCH_USER_PROFILE_SUCCESS';
const FETCH_USER_PROFILE_FAILURE = 'FETCH_USER_PROFILE_FAILURE';

const DELETE_BOOK_REQUEST = 'DELETE_BOOK_REQUEST';
const DELETE_BOOK_SUCCESS = 'DELETE_BOOK_SUCCESS';
const DELETE_BOOK_FAILURE = 'DELETE_BOOK_FAILURE';

const FETCH_USER_BOOKS_REQUEST = 'FETCH_USER_BOOKS_REQUEST'; // Added action type
const FETCH_USER_BOOKS_SUCCESS = 'FETCH_USER_BOOKS_SUCCESS'; // Added action type
const FETCH_USER_BOOKS_FAILURE = 'FETCH_USER_BOOKS_FAILURE'; // Added action type

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

const fetchBookRequest = () => ({
  type: FETCH_BOOK_REQUEST,
});

const fetchBookSuccess = (book) => ({
  type: FETCH_BOOK_SUCCESS,
  book,
});

const fetchBookFailure = (error) => ({
  type: FETCH_BOOK_FAILURE,
  error,
});

const fetchUserProfileRequest = () => ({
  type: FETCH_USER_PROFILE_REQUEST,
});

const fetchUserProfileSuccess = (profile) => ({
  type: FETCH_USER_PROFILE_SUCCESS,
  profile,
});

const fetchUserProfileFailure = (error) => ({
  type: FETCH_USER_PROFILE_FAILURE,
  error,
});

const deleteBookRequest = () => ({
  type: DELETE_BOOK_REQUEST,
});

const deleteBookSuccess = (bookId) => ({
  type: DELETE_BOOK_SUCCESS,
  bookId,
});

const deleteBookFailure = (error) => ({
  type: DELETE_BOOK_FAILURE,
  error,
});

// Action Creators for User Books
const fetchUserBooksRequest = () => ({
  type: FETCH_USER_BOOKS_REQUEST,
});

const fetchUserBooksSuccess = (books) => ({
  type: FETCH_USER_BOOKS_SUCCESS,
  books,
});

const fetchUserBooksFailure = (error) => ({
  type: FETCH_USER_BOOKS_FAILURE,
  error,
});

// Thunk Action Creator for Fetching User Books
export const fetchUserBooks = (userId) => async (dispatch) => {
  dispatch(fetchUserBooksRequest());
  try {
    const response = await fetch(`/api/profile/users/${userId}/books`);
    console.log('Response:', response); // Log the response

    if (!response.ok) {
      const errorData = await response.text();
      console.error(`Error fetching user books: ${response.status} - ${errorData}`);
      throw new Error(`Error: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    dispatch(fetchUserBooksSuccess(data));
    
  } catch (error) {
    console.error('Error fetching user books:', error);
    dispatch(fetchUserBooksFailure({ server: error.message }));
  }
};



// Thunk Action Creator for Fetching User Profile
export const fetchUserProfile = (userId) => async (dispatch) => {
  dispatch(fetchUserProfileRequest());
  try {
    const response = await fetch(`/api/profile/users/${userId}`);
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Error: ${response.status} - ${errorData}`);
    }
    const data = await response.json();
    dispatch(fetchUserProfileSuccess(data));
  } catch (error) {
    console.error('Error fetching user profile:', error);
    dispatch(fetchUserProfileFailure({ server: error.message }));
  }
};

// Thunk Action Creator for Deleting a Book
export const deleteBook = (bookId) => async (dispatch) => {
  dispatch(deleteBookRequest());
  try {
    const response = await fetch(`/api/books/${bookId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Error: ${response.status} - ${errorData}`);
    }
    dispatch(deleteBookSuccess(bookId));
  } catch (error) {
    console.error('Error deleting book:', error);
    dispatch(deleteBookFailure({ server: error.message }));
  }
};

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

// Thunk Action Creator for Fetching a Single Book
export const fetchBook = (id) => async (dispatch) => {
  dispatch(fetchBookRequest());
  try {
    const response = await fetch(`/api/books/books/${id}`);
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Error: ${response.status} - ${errorData}`);
    }
    const data = await response.json();
    console.log('Fetched book data:', data); // Log the fetched data
    dispatch(fetchBookSuccess(data));
  } catch (error) {
    console.error('Error fetching book:', error);
    dispatch(fetchBookFailure({ server: error.message }));
  }
};

// Initial State
const initialState = {
  userBooks: [], // Ensure this is initialized as an empty array
  userProfile: {}, // New property for user profile
  books: [],
  loading: false,
  errors: null,
  selectedBook: null, // New property for the selected book
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
    case FETCH_BOOK_REQUEST:
      return {
        ...state,
        loading: true,
        errors: null,
      };
    case FETCH_BOOK_SUCCESS:
      return {
        ...state,
        selectedBook: action.book, // Store the fetched book
        loading: false,
      };
    case FETCH_BOOK_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.error,
      };
    case FETCH_USER_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        errors: null,
      };
    case FETCH_USER_PROFILE_SUCCESS:
      return {
        ...state,
        userProfile: action.profile, // Store the fetched user profile
        loading: false,
      };
    case FETCH_USER_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.error,
      };
    case FETCH_USER_BOOKS_REQUEST:
      return {
        ...state,
        loading: true,
        errors: null,
      };
    case FETCH_USER_BOOKS_SUCCESS:
      return {
        ...state,
        userBooks: action.books, // Store the fetched user books
        loading: false,
      };
    case FETCH_USER_BOOKS_FAILURE:
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