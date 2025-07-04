import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const PrivateRoute = ({ children }) => {
  const { currentUser,loading } = useAuth();
  console.log("PrivateRoute - currentUser:", currentUser);

  if(loading){
    return <div>Loading ....</div>
  }

  if (currentUser) {
    return children;
  }

  return <Navigate to="/login" replace />;
};

export default PrivateRoute;
