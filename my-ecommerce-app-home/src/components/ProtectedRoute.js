import React from "react";
import { Navigate } from "react-router-dom";

/**
 * A component to protect routes by checking user authentication.
 * @param {React.ReactNode} children - The child components to render if authenticated.
 * @returns {React.ReactNode} - Protected children or a redirect to login.
 */
const ProtectedRoute = ({ children }) => {
  // Check if the user is logged in by checking LocalStorage
  const isLoggedIn = localStorage.getItem("userEmail");

  // If not logged in, redirect to the login page
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
