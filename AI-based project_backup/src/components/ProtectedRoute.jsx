import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
const ProtectedRoute = ({
  children,
  requiredUserType
}) => {
  const {
    user,
    isLoggedIn
  } = useAuth();
  if (!isLoggedIn) {
    // Redirect to login if not logged in
    return <Navigate to="/login" />;
  }
  // If requiredUserType is specified, check if user has the required type
  if (requiredUserType && user.userType !== requiredUserType) {
    // Redirect to appropriate dashboard based on user type
    if (user.userType === 'admin') {
      return <Navigate to="/admin" />;
    } else if (user.userType === 'delivery') {
      return <Navigate to="/delivery" />;
    } else {
      return <Navigate to="/customer" />;
    }
  }
  // If user is authenticated and has the required user type (or no specific type is required),
  // render the protected component
  return children;
};
export default ProtectedRoute;