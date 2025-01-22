import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import HomePage from '../components/BookPages/HomePage'; // Import HomePage
import BookDetailPage from '../components/BookPages/BookDetailPage'; // Import BookDetailPage
import UserProfilePage from '../components/BookPages/UserProfilePage'; // Import UserProfilePage

import UserReviews from '../components/Review/ReviewList';


export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />, // Updated to use HomePage component
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "books/:bookId", // Route for Book Detail Page
        element: <BookDetailPage />,
      },
      {
        path: "profile/:userId", // Updated route for User Profile Page to include userId
        element: <UserProfilePage />,
      },
         {
            path: "reviews/:userId",
            element: <UserReviews />,
         },

    ],
  },
]);