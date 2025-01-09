// src/context/UserContext.jsx
import React, { createContext, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkAuthenticate } from '../redux/session'; 

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user); // Get the user object from Redux state

  useEffect(() => {
    const fetchUserId = async () => {
      await dispatch(thunkAuthenticate());
    };
    fetchUserId();
  }, [dispatch]);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};