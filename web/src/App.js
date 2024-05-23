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
