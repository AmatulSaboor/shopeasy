import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import serverURL from '../../config/configFile'
import ADMIN_ROLE from '../../utils/constants'
import Button from 'react-bootstrap/Button';
import Heart from '../../assets/heart.png'
import Order from '../../assets/order.png'
import Cart from '../../assets/cart.png'
import Home from '../../assets/home.png'
import User from '../../assets/user.png'
import './Sidebar.css'

const Sidebar = ({handleClose}) => {
    const customerImage = ''
    const { customer, setCustomer, setIsAuthenticated, setLoading } = useAuth()
    const isAdmin = customer.role === ADMIN_ROLE
    const navigate = useNavigate()

    // logout function
    const logout = () => {
        fetch(serverURL + `auth/logout`, {credentials : `include`})
        .then(res => res.json())
        .then(res => {
            if(res.logout) {
                setIsAuthenticated(false)
                setLoading(false)
                setCustomer(null) 
                handleClose()
                navigate('/login')
        }})
        .catch( err => console.log(err))
    }

    // RETURN JSX
    return(
        <div className="text-center">
            <ul>
                <li className="text-decortation-none"><img src={customerImage ? customerImage : User} alt="customer" className="user" /></li>
                <li>Welcome, {customer.name}</li>
                <li>{customer.email}</li>
                <li className="list">
                    <Link to = '/' className="list" onClick={handleClose}> 
                    <img src={Home} className="me-2" alt=''/>Go To Home</Link></li>
                <li className="list">
                    <Link to = '/wishlist' className="list" onClick={handleClose}>
                    <img src={Heart} className="me-2" alt=''/>My Wishlist</Link></li>
                <li className="list">
                    <Link to = '/cart' className="list" onClick={handleClose}> 
                    <img src={Cart} className="me-2" alt='' />My Cart </Link></li>
                <li className="list">
                    <Link to = '/orders' className="list" onClick={handleClose}>
                    <img src={Order} className="me-2" alt=''/>My Orders</Link></li>
                {isAdmin && <>
                    <li className="list"><Link to = '/admin-products' className="list" onClick={handleClose}> 
                        Manage Products</Link></li>
                    <li className="list"><Link to = '/admin-orders' className="list" onClick={handleClose}> 
                        Manage Orders</Link></li>
                    <li className="list"><Link to = '/category' className="list" onClick={handleClose}> 
                        Manage Categories</Link></li>
                </>}
                <li className="list"><Button className="bg-warning border" onClick = {logout}>Log Out</Button></li>
           </ul>
        </div>
    )
}

export default Sidebar