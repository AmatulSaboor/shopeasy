import React, { createContext, useState, useEffect, useContext } from 'react';
import serverURL from '../config/configFile';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
    const fetchUser = async () => {
      await fetch(serverURL + 'auth/session', {
        credentials: 'include'
      })
    .then((res => res.json()))
    .then(res => {console.log(res); 
        if(res.isAuthenticated){
          setLoading(false)
          setIsAuthenticated(res.isAuthenticated)
          setUser({id : res.id, name:res.name,  email:res.email})
        }
    })
    .catch(err => {console.log(err);
    })
      // // Replace this with your actual authentication check and fetching user data
      // const userData = {
      //   id: 1,
      //   name: 'John Doe',
      //   email: 'john@example.com',
      // };

      // setUser(userData);
      // setIsAuthenticated(authStatus);
      // setLoading(false);
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, setUser, setLoading, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
