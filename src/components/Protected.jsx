import React from 'react';
import { Navigate } from 'react-router-dom';

// Protected component responsible for handling access to protected routes
function Protected({ children, user }) {
  // If user is authenticated (truthy), render the children (protected content)
  // If user is not authenticated, navigate to the home page
  return user ? (
    // If user is authenticated, render the protected content (children)
    children
  ) : (
    // If user is not authenticated, redirect to the home page
    <Navigate to="/" />
  );
}

export default Protected;
