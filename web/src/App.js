import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Product from './pages/product/Product';
import './App.css';
import { Login } from './components/authentication/login/Login';
import { Register } from './components/authentication/register/Register';
import serverURL from './config/configFile';
import {useEffect, useState} from 'react';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Wishlist from './components/wishlist/Wishlist';
import Cart from './components/cart/Cart';
import Order from './components/order/Order';
import NotFound from './components/notfound/NotFound';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [error] = useState(null)
  const [loggedInCustomerName, setLoggedInCustomerName] = useState(null)
  const [loggedInCustomerEmail, setLoggedInCustomerEmail] = useState(null)

  useEffect(() => {
    fetch(serverURL + 'auth/session', 
    {credentials: 'include'})
    .then(res => res.json())
    .then(res => setIsAuthenticated(res.isAuthenticated))
    .catch(err => console.log(err))

    // fetch(serverURL , {
    //   credentials: 'include'
    // })
    // .then( response => {
    //   if (!response.ok){
    //     console.log(`custom error`);
    //     throw new Error(`There is some error!!`);
    //   }
    //   return response.json()})
    // .then(jsonData => {
    //   console.log(jsonData)})
    // .catch(err => {
    //   // setError(err.message);
    // });
  }, [])
  return (
    <div className="App">
      {error && <div className="validationError m-4">{error}</div>}
      <Header loggedInCustomerName={loggedInCustomerName} loggedInCustomerEmail={loggedInCustomerEmail} setLoggedInCustomerEmail={setLoggedInCustomerEmail} setLoggedInCustomerName={setLoggedInCustomerName} />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Product setLoggedInCustomerEmail={setLoggedInCustomerEmail} setLoggedInCustomerName={setLoggedInCustomerName} />} />
          <Route path='/login' element={<Login setLoggedInCustomerEmail={setLoggedInCustomerEmail} setLoggedInCustomerName={setLoggedInCustomerName} />} />
          <Route path='/register' element={<Register setLoggedInCustomerEmail={setLoggedInCustomerEmail} setLoggedInCustomerName={setLoggedInCustomerName} />} />
          <Route path='/dashboard' element={<Product loggedInCustomerName={loggedInCustomerName} loggedInCustomerEmail={loggedInCustomerEmail} setLoggedInCustomerEmail={setLoggedInCustomerEmail} setLoggedInCustomerName={setLoggedInCustomerName} />} />
          <Route path='/wishlist' element={<Wishlist loggedInCustomerName={loggedInCustomerName} loggedInCustomerEmail={loggedInCustomerEmail} setLoggedInCustomerEmail={setLoggedInCustomerEmail} setLoggedInCustomerName={setLoggedInCustomerName} />} />
          <Route path='/cart' element={<Cart loggedInCustomerName={loggedInCustomerName} loggedInCustomerEmail={loggedInCustomerEmail} setLoggedInCustomerEmail={setLoggedInCustomerEmail} setLoggedInCustomerName={setLoggedInCustomerName} />} />
          <Route path='/order' element={<Order loggedInCustomerName={loggedInCustomerName} loggedInCustomerEmail={loggedInCustomerEmail} setLoggedInCustomerEmail={setLoggedInCustomerEmail} setLoggedInCustomerName={setLoggedInCustomerName} />} />
          <Route path = "*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
