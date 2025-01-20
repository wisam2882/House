import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ModalProvider, Modal } from "../context/Modal";
import { UserProvider } from "../context/UserContext"; // Import UserProvider
import { thunkAuthenticate } from "../redux/session"; // Import thunkAuthenticate
import { useDispatch } from "react-redux"; // Import useDispatch
import { fetchBooks } from "../redux/booksSlice"; // Import fetchBooks
import Navigation from "../components/Navigation/Navigation";
import Footer from "../components/Book/Footer";

export default function Layout() {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch(); // Initialize dispatch

  useEffect(() => {
    const authenticateUser = async () => {
      await thunkAuthenticate(); // Call the thunk to authenticate the user
      setIsLoaded(true);
    };
    authenticateUser();
  }, []);

  const handleHomeClick = () => {
    console.log("Home button clicked"); // Debugging log
    dispatch(fetchBooks()); // Fetch all books when home is clicked
  };

  return (
    <UserProvider> {/* Wrap the layout with UserProvider */}
      <ModalProvider>
        <Navigation onHomeClick={handleHomeClick} /> {/* Pass the function to Navigation */}
        {isLoaded && <Outlet />}
        <Footer />
        <Modal />
      </ModalProvider>
    </UserProvider>
  );
}