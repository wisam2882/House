import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editReview } from '../../redux/reviewredux';
import './EditReviewForm.css';

const EditReviewForm = ({ review, closeEditPopup }) => {
  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState(review.comment);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedReview = { rating, comment };
    await dispatch(editReview(review.id, updatedReview));
    closeEditPopup();
  };

  return (
    <form className="edit-review-form" onSubmit={handleSubmit}>
      <h2>Edit Review</h2>
      <div className="form-group">
        <label>Rating:</label>
        <select
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value, 10))}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <div className="form-group">
        <label>Comment:</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <button type="submit" className="save-changes-button">Save Changes</button>
    </form>
  );
};

export default EditReviewForm;