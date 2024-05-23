import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/authentication/login/Login';
import Register from './components/authentication/register/Register';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Wishlist from './components/wishlist/Wishlist';
import Cart from './components/cart/Cart';
// import Cart from './components/cart/CartCopy';
import Order from './components/order/Order';
import Checkout from './pages/checkout/Checkout';
import NotFound from './components/notfound/NotFound';
import AdminProductDisplay from './pages/adminProductDisplay/AdminProductDisplay';
import CustomerProductDisplay from './pages/customerProductDisplay/CustomerProductDisplay';
import Success from './components/success/Success';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './context/ProtectedRoute';

function App() {

  const [error] = useState(null)

  return(
    <div className="App">
    {/* TODO:  remove this error diva nd its state variable if not needed */}
      {error && <div className="validationError m-4">{error}</div>}

      <AuthProvider>
        <BrowserRouter>
        <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<AdminProductDisplay />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/customerProductDisplay" element={<CustomerProductDisplay />} />
              <Route path="/adminProductDisplay" element={<AdminProductDisplay />} />
              <Route path="/order" element={<Order />} />
              <Route path="/success" element={<Success />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        {/* <Footer /> */}
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App;

// const [isAuthenticated, setIsAuthenticated] = useState(null);
  // const [loggedInCustomerName, setLoggedInCustomerName] = useState(null)
  // const [loggedInCustomerEmail, setLoggedInCustomerEmail] = useState(null)
  // const [loggedInCustomerId, setLoggedInCustomerId] = useState(null)

  // <Route path="/login" component={Login} />
  // <ProtectedRoute path="/dashboard" component={Cart} /> 
  // useEffect(() => {
  //   fetch(serverURL + 'auth/session', 
  //   {credentials: 'include'})
  //   .then(res => res.json())
  //   .then(res => setIsAuthenticated(res.isAuthenticated))
  //   .catch(err => console.log(err))

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
  // }, [])
  // return (
  //   <div className="App">
  //     {/* <Header loggedInCustomerName={loggedInCustomerName} loggedInCustomerEmail={loggedInCustomerEmail} setLoggedInCustomerEmail={setLoggedInCustomerEmail} setLoggedInCustomerName={setLoggedInCustomerName} /> */}
  //     <BrowserRouter>
  //       <Routes>
  //         <Route path='/' element={<CustomerProductDisplay loggedInCustomerId={loggedInCustomerId} setLoggedInCustomerId={setLoggedInCustomerId} setLoggedInCustomerEmail={setLoggedInCustomerEmail} setLoggedInCustomerName={setLoggedInCustomerName} />} />
  //         {/* <Route path='/' element={<Product setLoggedInCustomerId={setLoggedInCustomerId} setLoggedInCustomerEmail={setLoggedInCustomerEmail} setLoggedInCustomerName={setLoggedInCustomerName} />} /> */}
  //         <Route path='/login' element={<Login setLoggedInCustomerId={setLoggedInCustomerId} setLoggedInCustomerEmail={setLoggedInCustomerEmail} setLoggedInCustomerName={setLoggedInCustomerName} />} />
  //         <Route path='/register' element={<Register setLoggedInCustomerId={setLoggedInCustomerId} setLoggedInCustomerEmail={setLoggedInCustomerEmail} setLoggedInCustomerName={setLoggedInCustomerName} />} />
  //         <Route path='/dashboard' element={<Product loggedInCustomerName={loggedInCustomerName} loggedInCustomerEmail={loggedInCustomerEmail} setLoggedInCustomerEmail={setLoggedInCustomerEmail} setLoggedInCustomerName={setLoggedInCustomerName} />} />
  //         <Route path='/wishlist' element={<Wishlist loggedInCustomerName={loggedInCustomerName} loggedInCustomerEmail={loggedInCustomerEmail} setLoggedInCustomerEmail={setLoggedInCustomerEmail} setLoggedInCustomerName={setLoggedInCustomerName} />} />
  //         <Route path='/cart' element={<Cart loggedInCustomerName={loggedInCustomerName} loggedInCustomerEmail={loggedInCustomerEmail} setLoggedInCustomerId={setLoggedInCustomerId} setLoggedInCustomerEmail={setLoggedInCustomerEmail} setLoggedInCustomerName={setLoggedInCustomerName} />} />
  //         <Route path='/order' element={<Order loggedInCustomerId={loggedInCustomerId} loggedInCustomerName={loggedInCustomerName} loggedInCustomerEmail={loggedInCustomerEmail} setLoggedInCustomerEmail={setLoggedInCustomerEmail} setLoggedInCustomerName={setLoggedInCustomerName} />} />
  //         <Route path='/checkout' element={<Checkout loggedInCustomerId={loggedInCustomerId} loggedInCustomerName={loggedInCustomerName} loggedInCustomerEmail={loggedInCustomerEmail} setLoggedInCustomerId={setLoggedInCustomerId} setLoggedInCustomerEmail={setLoggedInCustomerEmail} setLoggedInCustomerName={setLoggedInCustomerName} />} />
  //         <Route path='/success' element={<Success loggedInCustomerId={loggedInCustomerId} loggedInCustomerName={loggedInCustomerName} loggedInCustomerEmail={loggedInCustomerEmail} setLoggedInCustomerId={setLoggedInCustomerId} setLoggedInCustomerEmail={setLoggedInCustomerEmail} setLoggedInCustomerName={setLoggedInCustomerName} />} />
  //         <Route path = "*" element={<NotFound />} />
  //       </Routes>
  //     </BrowserRouter>
  //     {/* <Footer /> */}
  //   </div>
  // );

