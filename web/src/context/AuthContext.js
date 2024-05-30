import { createContext, useState, useEffect, useContext } from 'react';
import serverURL from '../config/configFile';

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [customer, setCustomer] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    
    // checking if the customer is signed in
    useEffect(() => {
    const fetchCustomer = async () => {
      await fetch(serverURL + 'auth/session', {
        credentials: 'include'
      })
    .then((res => res.json()))
    .then(res => { 
        if(res.isAuthenticated){
          setLoading(false)
          setIsAuthenticated(res.isAuthenticated)
          setCustomer({id : res.id, name:res.name,  email:res.email, role : res.role})
        }
    })
    .catch(
      err => {console.log(err);
    })
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
