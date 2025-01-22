// Action Types for Reviews by Current User
const FETCH_USER_REVIEWS_REQUEST = 'FETCH_USER_REVIEWS_REQUEST';
const FETCH_USER_REVIEWS_SUCCESS = 'FETCH_USER_REVIEWS_SUCCESS';
const FETCH_USER_REVIEWS_FAILURE = 'FETCH_USER_REVIEWS_FAILURE';

// Action Types for Editing a Review
const EDIT_REVIEW_REQUEST = 'EDIT_REVIEW_REQUEST';
const EDIT_REVIEW_SUCCESS = 'EDIT_REVIEW_SUCCESS';
const EDIT_REVIEW_FAILURE = 'EDIT_REVIEW_FAILURE';

// Action Types for Deleting a Review
const DELETE_REVIEW_REQUEST = 'DELETE_REVIEW_REQUEST';
const DELETE_REVIEW_SUCCESS = 'DELETE_REVIEW_SUCCESS';
const DELETE_REVIEW_FAILURE = 'DELETE_REVIEW_FAILURE';


// Action Creators for Fetching User Reviews
const fetchUserReviewsRequest = () => ({
    type: FETCH_USER_REVIEWS_REQUEST,
  });
  
  const fetchUserReviewsSuccess = (reviews) => ({
    type: FETCH_USER_REVIEWS_SUCCESS,
    reviews,
  });
  
  const fetchUserReviewsFailure = (error) => ({
    type: FETCH_USER_REVIEWS_FAILURE,
    error,
  });
  
  // Action Creators for Editing a Review
  const editReviewRequest = () => ({
    type: EDIT_REVIEW_REQUEST,
  });
  
  const editReviewSuccess = (review) => ({
    type: EDIT_REVIEW_SUCCESS,
    review,
  });
  
  const editReviewFailure = (error) => ({
    type: EDIT_REVIEW_FAILURE,
    error,
  });
  
  // Action Creators for Deleting a Review
  const deleteReviewRequest = () => ({
    type: DELETE_REVIEW_REQUEST,
  });
  
  const deleteReviewSuccess = (reviewId) => ({
    type: DELETE_REVIEW_SUCCESS,
    reviewId,
  });
  
  const deleteReviewFailure = (error) => ({
    type: DELETE_REVIEW_FAILURE,
    error,
  });
  


  // Fetching Reviews by the Current User
export const fetchUserReviews = (userId) => async (dispatch) => {  // <---- Accept userId
    dispatch(fetchUserReviewsRequest());
    try {
      const response = await fetch(`/api/reviews/users/${userId}/reviews`, { // Included userId
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${response.status} - ${errorData.error || 'An error occurred'}`);
      }
      const data = await response.json();
      dispatch(fetchUserReviewsSuccess(data));
    } catch (error) {
      console.error('Error fetching user reviews:', error);
      dispatch(fetchUserReviewsFailure({ server: error.message }));
    }
  };
  
  // Editing a Review
  export const editReview = (reviewId, reviewData) => async (dispatch) => {
    dispatch(editReviewRequest());
    try {
      const response = await fetch(`/api/reviews/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });
      if (!response.ok) {
          const errorData = await response.json();
        throw new Error(`Error: ${response.status} - ${errorData.error || 'An error occurred'}`);
      }
      const data = await response.json();
      dispatch(editReviewSuccess(data.review));
    } catch (error) {
      console.error('Error editing review:', error);
      dispatch(editReviewFailure({ server: error.message }));
    }
  };
  
  // Deleting a Review
  export const deleteReview = (reviewId) => async (dispatch) => {
    dispatch(deleteReviewRequest());
    try {
      const response = await fetch(`/api/reviews/reviews/${reviewId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
         const errorData = await response.json();
          throw new Error(`Error: ${response.status} - ${errorData.error || 'An error occurred'}`);
      }
      dispatch(deleteReviewSuccess(reviewId));
    } catch (error) {
      console.error('Error deleting review:', error);
      dispatch(deleteReviewFailure({ server: error.message }));
    }
  };
  

  const initialState = {
    userReviews: [],
    loading: false,
    errors: null,
  };
  
  // Reducer for Reviews
  const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_USER_REVIEWS_REQUEST:
        return { ...state, loading: true, errors: null };
  
      case FETCH_USER_REVIEWS_SUCCESS:
        return { ...state, loading: false, userReviews: action.reviews };
  
      case FETCH_USER_REVIEWS_FAILURE:
        return { ...state, loading: false, errors: action.error };
  
      case EDIT_REVIEW_REQUEST:
        return { ...state, loading: true, errors: null };
  
      case EDIT_REVIEW_SUCCESS:
        return {
          ...state,
          loading: false,
          userReviews: state.userReviews.map((review) =>
            review.id === action.review.id ? action.review : review
          ),
        };
  
      case EDIT_REVIEW_FAILURE:
        return { ...state, loading: false, errors: action.error };
  
      case DELETE_REVIEW_REQUEST:
        return { ...state, loading: true, errors: null };
  
      case DELETE_REVIEW_SUCCESS:
        return {
          ...state,
          loading: false,
          userReviews: state.userReviews.filter(
            (review) => review.id !== action.reviewId
          ),
        };
  
      case DELETE_REVIEW_FAILURE:
        return { ...state, loading: false, errors: action.error };
  
      default:
        return state;
    }
  };
  
  export default reviewsReducer;