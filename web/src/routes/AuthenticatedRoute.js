import React, { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthenticatedRoutes = ({ element: Element, ...rest }) => {
    const { isAuthenticated, loading} = useAuth();
    useEffect(() => {
        console.log(isAuthenticated)
    },[isAuthenticated])

    if (loading) {
        return <div>Loading...</div>;
    }
    return isAuthenticated ? <Outlet {...rest} /> : <Navigate to="/login" />;
    };

export default AuthenticatedRoutes;