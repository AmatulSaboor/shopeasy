import React, { createContext, useState, useEffect, useContext } from 'react';
import serverURL from '../config/configFile';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [customer, setCustomer] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
    const fetchCustomer = async () => {
      await fetch(serverURL + 'auth/session', {
        credentials: 'include'
      })
    .then((res => res.json()))
    .then(res => {console.log(res); 
        if(res.isAuthenticated){
          setLoading(false)
          setIsAuthenticated(res.isAuthenticated)
          setCustomer({id : res.id, name:res.name,  email:res.email, role : res.role})
        }
    })
    .catch(err => {console.log(err);
    })
      // // Replace this with your actual authentication check and fetching customer data
      // const customerData = {
      //   id: 1,
      //   name: 'John Doe',
      //   email: 'john@example.com',
      // };

      // setCustomer(customerData);
      // setIsAuthenticated(authStatus);
      // setLoading(false);
    };

    fetchCustomer();
  }, []);

  return (
    <AuthContext.Provider value={{ customer, isAuthenticated, loading, setCustomer, setLoading, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
