import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Wishlist from './pages/wishlist/Wishlist';
import Cart from './pages/cart/Cart';
import Order from './pages/order/Order';
import Checkout from './pages/checkout/Checkout';
import NotFound from './pages/notfound/NotFound';
import CustomerProducts from './pages/customerProducts/CustomerProducts';
import AdminProducts from './pages/adminProducts/AdminProducts';
import Success from './pages/success/Success';
import { AuthProvider } from './context/AuthContext';
import AuthenticatedRoutes from './routes/AuthenticatedRoute';
import { useAuth } from './context/AuthContext';
function App() {

  const [error] = useState(null)
  // const { customer : user} = useAuth()
  // console.log(user)
  const ADMIN_ROLE = '664ada4ddde187ee1c525220'     // TODO: populate the table and get
  const CUSTOMER_ROLE = '664ada57dde187ee1c525222' // the names of roles instead of their ID 
  return(
    <div className="App">
    {/* TODO:  remove this error div and its state variable if not needed */}
      {error && <div className="validationError m-4">{error}</div>}
      <AuthProvider>
        <BrowserRouter>
        <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<AuthenticatedRoutes />}>
              {/* <Route path="/" element={user.role === ADMIN_ROLE ? <AdminProducts /> : user.role === CUSTOMER_ROLE ? <CustomerProducts /> : <Login/>} /> */}
              <Route path="/" element={ ADMIN_ROLE ? <AdminProducts /> :  CUSTOMER_ROLE ? <CustomerProducts /> : <Login/>} />
              <Route path="/customer" element={<Navigate to="/customer/products" />} />
              <Route path="/customer/products" element={<CustomerProducts />} />
              <Route path="/admin" element={<Navigate to="/admin/products" />} />
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
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
