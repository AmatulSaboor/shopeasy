import React, { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthenticatedRoutes = ({ element: Element, ...rest }) => {
  const { isAuthenticated, loading} = useAuth();
  useEffect(() => {
    console.log(isAuthenticated)
  },[isAuthenticated])
    console.log(isAuthenticated)
    if (loading) {
      return <div>Loading...</div>;
    }
  
    return isAuthenticated ? <Outlet {...rest} /> : <Navigate to="/login" />;
  };

export default AuthenticatedRoutes;
// const ProtectedRoute = ({ component: Component, ...rest }) => {
//   const { isAuthenticated, loading } = useAuth();

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
    // <Route
    //   {...rest}
    //   render={(props) =>
    //     isAuthenticated ? <Component {...props} /> : <Navigate to="/login" />
    //   }
    // />
    // <Route
    //   {...rest}
    //   element={
    //     isAuthenticated ? Component : <Navigate to="/login" />
    //   }
    // />
