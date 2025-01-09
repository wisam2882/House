// src/Layout.jsx
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ModalProvider, Modal } from "../context/Modal";
import { UserProvider } from "../context/UserContext"; // Import UserProvider
import { thunkAuthenticate } from "../redux/session";
import Navigation from "../components/Navigation/Navigation";

export default function Layout() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const authenticateUser = async () => {
      await thunkAuthenticate(); // Call the thunk to authenticate the user
      setIsLoaded(true);
    };
    authenticateUser();
  }, []);

  return (
    <UserProvider> {/* Wrap the layout with UserProvider */}
      <ModalProvider>
        <Navigation /> {/* No need to pass userId as prop */}
        {isLoaded && <Outlet />}
        <Modal />
      </ModalProvider>
    </UserProvider>
  );
}