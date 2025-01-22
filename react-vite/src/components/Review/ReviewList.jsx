import { useEffect, useState, useMemo, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserReviews, deleteReview } from '../../redux/reviewredux';
import { useParams } from 'react-router-dom';
import EditReviewForm from './EditReview';
import BookCard from '../Book/BookCard';
import { fetchBook } from '../../redux/booksSlice';
import './ReviewList.css';

const ReviewsList = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const reviewsData = useSelector(state => state.reviews);
    const userReviews = useMemo(() => reviewsData?.userReviews || [], [reviewsData]);
    const loading = useMemo(() => reviewsData?.loading, [reviewsData]);
    const errors = useMemo(() => reviewsData?.errors, [reviewsData]);
    const bookData = useSelector(state => state.books);
    const [books, setBooks] = useState({});
    const [selectedReview, setSelectedReview] = useState(null);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
    const [reviewToDelete, setReviewToDelete] = useState(null);
    const editPopupRef = useRef(null);
      const deletePopupRef = useRef(null);


    useEffect(() => {
      if (userId) {
          dispatch(fetchUserReviews(userId));
        }
     }, [dispatch, userId]);


     useEffect(() => {
          if (userReviews && userReviews.length > 0) {
               const fetchBooks = async () => {
                    const bookIds = userReviews.map((review) => review.book_id);
                    const uniqueBookIds = [...new Set(bookIds)];
                   const fetchedBooks = {};
                   for (const bookId of uniqueBookIds) {
                      try {
                            const response = await dispatch(fetchBook(bookId));
                           if (response) {
                                fetchedBooks[bookId] = response;
                          } else {
                              console.error(`No payload received for book ID: ${bookId}`);
                         }
                   } catch (error) {
                      console.error("Error fetching book with id:", bookId, error);
                      }
                   }
                   setBooks(fetchedBooks);
               };
                fetchBooks();
          }
      }, [dispatch, userReviews]);

      const openEditPopup = (review) => {
        setSelectedReview(review);
        setIsEditPopupOpen(true);
      };

    const closeEditPopup = () => {
        setIsEditPopupOpen(false);
        setSelectedReview(null)
    };

    const openDeletePopup = (reviewId) => {
        setReviewToDelete(reviewId);
        setIsDeletePopupOpen(true);
    };


    const closeDeletePopup = () => {
        setIsDeletePopupOpen(false);
        setReviewToDelete(null)
    };

    const handleConfirmDelete = (reviewId) => {
        dispatch(deleteReview(reviewId));
        setIsDeletePopupOpen(false);
        setReviewToDelete(null)
    };


    // Event listener to close popup on outside click
     useEffect(() => {
        const handleClickOutside = (event) => {
           if (isEditPopupOpen && editPopupRef.current && !editPopupRef.current.contains(event.target)) {
                closeEditPopup();
            }
            if (isDeletePopupOpen && deletePopupRef.current && !deletePopupRef.current.contains(event.target)) {
                 closeDeletePopup();
            }
        };
         document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
         };
   }, [isEditPopupOpen, isDeletePopupOpen]);

    if (loading) return <p>Loading reviews...</p>;
    if (errors) return <p>Error: {errors.server}</p>;

    return (
        <div className="review-list-container">
            <h2>User Reviews</h2>
            {userReviews.length === 0 ? (
                <p>No reviews found.</p>
            ) : (
                <ul className="reviews-list">
                    {userReviews.map((review) => {
                         const book = books[review.book_id];
                       return (
                        <li key={review.id} className="review-item">
                            {book && <BookCard book={book} />}
                            <div className="review-content">
                                <h3>Rating: {review.rating}</h3>
                                <p>Comment: {review.comment}</p>
                            </div>
                             <div className="review-actions">
                                 <button className="edit-button" onClick={() => openEditPopup(review)}>Edit</button>
                                <button className="delete-button" onClick={() => openDeletePopup(review.id)}>Delete</button>
                             </div>
                        </li>
                    );
                    })}
                </ul>
            )}
                {isEditPopupOpen && selectedReview && (
                    <div className="overlay" >
                        <div className="popup edit-popup"  ref={editPopupRef}>
                            {/* <button className="close-button" onClick={closeEditPopup}>×</button> */}
                            <EditReviewForm review={selectedReview} closeEditPopup={closeEditPopup} />
                       </div>
                   </div>
                )}
               {isDeletePopupOpen && (
                    <div className="overlay">
                        <div className="popup" ref={deletePopupRef}>
                            <button className="close-button" onClick={closeDeletePopup}>×</button>
                             <h3>Confirm Delete</h3>
                            <p>Are you sure you want to delete this review?</p>
                             <div className="popup-buttons">
                                <button className="confirm-delete-button" onClick={() => handleConfirmDelete(reviewToDelete)}>Yes, Delete</button>
                                <button className="cancel-delete-button" onClick={closeDeletePopup}>Cancel</button>
                            </div>
                       </div>
                    </div>
                 )}
        </div>
    );
};

export default ReviewsList;