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

// Action Types for Reviews
const ADD_REVIEW_REQUEST = 'ADD_REVIEW_REQUEST';
const ADD_REVIEW_SUCCESS = 'ADD_REVIEW_SUCCESS';
const ADD_REVIEW_FAILURE = 'ADD_REVIEW_FAILURE';


//fetching reviews 
const FETCH_REVIEWS_REQUEST = 'FETCH_REVIEWS_REQUEST';
const FETCH_REVIEWS_SUCCESS = 'FETCH_REVIEWS_SUCCESS';
const FETCH_REVIEWS_FAILURE = 'FETCH_REVIEWS_FAILURE';


//search bar
const SEARCH_BOOKS_REQUEST = 'SEARCH_BOOKS_REQUEST';
const SEARCH_BOOKS_SUCCESS = 'SEARCH_BOOKS_SUCCESS';
const SEARCH_BOOKS_FAILURE = 'SEARCH_BOOKS_FAILURE';



const searchBooksRequest = () => ({
  type: SEARCH_BOOKS_REQUEST,
});

const searchBooksSuccess = (books) => ({
  type: SEARCH_BOOKS_SUCCESS,
  books,
});

const searchBooksFailure = (error) => ({
  type: SEARCH_BOOKS_FAILURE,
  error,
});



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

// Action Creators for Adding Reviews
const addReviewRequest = () => ({
  type: ADD_REVIEW_REQUEST,
});

const addReviewSuccess = (review) => ({
  type: ADD_REVIEW_SUCCESS,
  review,
});

const addReviewFailure = (error) => ({
  type: ADD_REVIEW_FAILURE,
  error,
});

// fetching reviews

const fetchReviewsRequest = () => ({
  type: FETCH_REVIEWS_REQUEST,
});

const fetchReviewsSuccess = (reviews) => ({
  type: FETCH_REVIEWS_SUCCESS,
  reviews,
});

const fetchReviewsFailure = (error) => ({
  type: FETCH_REVIEWS_FAILURE,
  error,
});

//search bar
// Search books action
export const searchBooks = (query, genre) => async (dispatch) => {
  if (!query.trim()) {
    // Do nothing if the query is empty (this will be handled by fetchBooks)
    return;
  }

  dispatch(searchBooksRequest());
  try {
    const url = `/api/books/books/search?tag=${query}&genre=${genre || ''}`;
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Error: ${response.status} - ${errorData}`);
    }
    const data = await response.json();
    dispatch(searchBooksSuccess(data)); // Dispatch success action with the fetched books
  } catch (error) {
    console.error('Error searching books:', error);
    dispatch(searchBooksFailure({ server: error.message }));
  }
};
// Fetch all books action
export const fetchBooks = () => async (dispatch) => {
  dispatch(fetchBooksRequest());
  try {
    const response = await fetch(`/api/books/books`);
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Error: ${response.status} - ${errorData}`);
    }
    const data = await response.json();
    dispatch(fetchBooksSuccess(data)); // Dispatch success action with the fetched books
  } catch (error) {
    console.error('Error fetching books:', error);
    dispatch(fetchBooksFailure({ server: error.message }));
  }
};

export const fetchReviews = (bookId) => async (dispatch) => {
  dispatch(fetchReviewsRequest());
  try {
    const response = await fetch(`/api/books/books/${bookId}/reviews`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Error: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    dispatch(fetchReviewsSuccess(data)); // Dispatch success action with the fetched reviews
  } catch (error) {
    console.error('Error fetching reviews:', error);
    dispatch(fetchReviewsFailure({ server: error.message }));
  }
};

// Thunk Action Creator for Adding a Review
export const addReview = (bookId, review) => async (dispatch) => {
  dispatch(addReviewRequest());
  try {
    const response = await fetch(`/api/books/books/${bookId}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(review),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Error: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    dispatch(addReviewSuccess(data.review)); // Dispatch success action with the added review
  } catch (error) {
    console.error('Error adding review:', error);
    dispatch(addReviewFailure({ server: error.message }));
  }
};

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

// export const fetchBooks = () => async (dispatch) => {
//   dispatch(fetchBooksRequest());
//   try {
//       const response = await fetch('/api/books/books');

//       // Check if the response is not OK (status code outside the range 200-299)
//       if (!response.ok) {
//           const errorData = await response.text();
//           throw new Error(`Error: ${response.status} - ${errorData}`);
//       }

//       const data = await response.json();
//       console.log('Fetched books data:', data); // Log the fetched data for debugging

//       // Dispatch success action with the fetched data
//       dispatch(fetchBooksSuccess(data));
//   } catch (error) {
//       console.error('Error fetching books:', error);
//       // Dispatch failure action with the error message
//       dispatch(fetchBooksFailure({ server: error.message }));
//   }
// };

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

// Action Types
const RESET_SEARCH = 'RESET_SEARCH';

// Action Creator for resetting search
export const resetSearch = () => ({
    type: RESET_SEARCH,
});


// Initial State
const initialState = {
  userBooks: [],
  userProfile: {},
  books: [],
  loading: false,
  errors: null,
  selectedBook: null,
  reviews: [],
  selectedGenre: '', // New property for selected genre
  searchQuery: '', // New property for search query
};


// Reducer
const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKS_REQUEST:
    case SEARCH_BOOKS_REQUEST:
      return { ...state, loading: true, errors: null };

    case FETCH_BOOKS_SUCCESS:
    case SEARCH_BOOKS_SUCCESS:
      return { ...state, loading: false, books: action.books }; // Update books with search results

    case FETCH_BOOKS_FAILURE:
    case SEARCH_BOOKS_FAILURE:
      return { ...state, loading: false, errors: action.error };

    case 'FETCH_REVIEWS_SUCCESS':
      return {
        ...state,
        loading: false,
        reviews: action.reviews, // Update reviews for the specific book
      };

    case 'FETCH_REVIEWS_FAILURE':
      return {
        ...state,
        loading: false,
        errors: action.error,
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

    case ADD_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
        errors: null,
      };

    case ADD_REVIEW_SUCCESS:
      return {
        ...state,
        reviews: [...state.reviews, action.review], // Add the new review to the state
        loading: false,
      };

    case ADD_REVIEW_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.error, // Store the error if adding the review fails
      };

    case RESET_SEARCH: // Handle the reset search action
      return {
        ...state,
        selectedGenre: '', // Reset selected genre
        searchQuery: '', // Reset search query
        books: initialState.books, // Reset books to initial state if needed
      };

    default:
      return state;
  }
};

export default booksReducer;