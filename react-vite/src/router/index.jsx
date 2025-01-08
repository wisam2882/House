import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import HomePage from '../components/BookPages/HomePage'; // Import HomePage
// import BookDetailPage from '../pages/BookDetailPage'; // Import BookDetailPage
// import UserProfilePage from '../pages/UserProfilePage'; // Import UserProfilePage
// import AddEditBookPage from '../pages/AddEditBookPage'; // Import AddEditBookPage

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
      // {
      //   path: "books/:bookId", // Route for Book Detail Page
      //   element: <BookDetailPage />,
      // },
      // {
      //   path: "profile", // Route for User Profile Page
      //   element: <UserProfilePage />,
      // },
      // {
      //   path: "add-edit-book", // Route for Add/Edit Book Page
      //   element: <AddEditBookPage />,
      // },
    ],
  },
]);