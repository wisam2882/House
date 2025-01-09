import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserBooks, fetchUserProfile } from '../../redux/booksSlice'; 

const UserProfilePage = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.books.userProfile);
  const userBooks = useSelector((state) => state.books.userBooks);
  const loading = useSelector((state) => state.books.loading);
  const errors = useSelector((state) => state.books.errors);

  console.log('User ID:', userId); // Log the userId
  console.log('Params:', useParams()); // Log the entire params object

  useEffect(() => {
    if (userId && userId !== 'undefined') {
      dispatch(fetchUserProfile(userId));
      dispatch(fetchUserBooks(userId));
    }
  }, [dispatch, userId]);

  if (!userId || userId === 'undefined') {
    return <div>Error: User ID is not available.</div>;
  }

  if (loading) return <div>Loading...</div>;
  if (errors) {
    console.error('Errors:', errors);
    return <div>Error: {errors.server || 'Failed to fetch user data'}</div>;
  }

  return (
    <div>
      <header>
        <h1>User Profile</h1>
      </header>
      <div className="profile-info">
        <h2>{userProfile.username}</h2>
        <p>Email: {userProfile.email}</p>
      </div>
      <h3>Books Added by User</h3>
      <ul>
        {userBooks.length > 0 ? (
          userBooks.map((book) => (
            <li key={book.id}>
              <h4>{book.title}</h4>
              <p>{book.author}</p>
            </li>
          ))
        ) : (
          <li>No books found.</li>
        )}
      </ul>
    </div>
  );
};

export default UserProfilePage;