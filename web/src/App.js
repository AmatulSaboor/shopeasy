import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AuthProvider } from './context/AuthContext'
import AuthenticatedRoutes from './routes/AuthenticatedRoute'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import CustomerProducts from './pages/customerProducts/CustomerProducts'
import CustomerOrder from './pages/customerOrder/CustomerOrder'
import AdminProducts from './pages/adminProducts/AdminProducts'
import AdminOrder from './pages/adminOrder/AdminOrder'
import NotFound from './pages/notfound/NotFound'
import Register from './pages/register/Register'
import Wishlist from './pages/wishlist/Wishlist'
import Checkout from './pages/checkout/Checkout'
import Category from './pages/category/Category'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Success from './pages/success/Success'
import Login from './pages/login/Login'
import Cart from './pages/cart/Cart'

function App() { 
  return(
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
        <Header />
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<AuthenticatedRoutes />}>
                <Route path="/" element={ <CustomerProducts />} />
                <Route path="/orders" element={<CustomerOrder />} />
                <Route path="/admin-products" element={<AdminProducts />} />
                <Route path="/admin-orders" element={<AdminOrder />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/category" element={<Category />} />
                <Route path="/success" element={<Success />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
        <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App
