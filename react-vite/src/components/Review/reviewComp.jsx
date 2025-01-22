import { useState } from 'react';
import ReviewsList from './ReviewList';
import EditReviewForm from './EditReview';

const App = () => {
  const [selectedReview, setSelectedReview] = useState(null);

  const handleEditClick = (review) => {
    setSelectedReview(review);
  };

  return (
    <div>
      <h1>Reviews Management</h1>
      <ReviewsList onEditClick={handleEditClick} />
      {selectedReview && (
        <EditReviewForm review={selectedReview} />
      )}
    </div>
  );
};

export default App;