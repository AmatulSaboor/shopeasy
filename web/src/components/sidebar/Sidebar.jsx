import { Link, useNavigate } from 'react-router-dom'
import serverURL from '../../config/configFile'
import { useAuth } from '../../context/AuthContext'
import Button from 'react-bootstrap/Button';
import './Sidebar.css'
import Cart from '../../assets/cart.png'
import Home from '../../assets/home.png'
import Heart from '../../assets/heart.png'
import Order from '../../assets/order.png'
import User from '../../assets/user.png'

const Sidebar = () => {
    const customerImage = ''
    const { customer, setCustomer, setIsAuthenticated, setLoading } = useAuth()
    const navigate = useNavigate()

    const logout = () => {
        fetch(serverURL + `auth/logout`, {credentials : `include`})
        .then(res => res.json())
        .then(res => {if(res.logout) {
            setCustomer(null) 
            setIsAuthenticated(false)
            setLoading(false)
            navigate('/login')
        }})
        .catch( err => console.log(err))
    }
    return(
        <div className="text-center">
            <ul>
                <li className="text-decortation-none"><img src={customerImage ? customerImage : User} alt="customer" className="user" /></li>
                <li>Welcome, {customer.name}</li>
                <li>{customer.email}</li>
                <li className="list"><Link to = '/' className="list"> <img src={Home} className="me-2" alt=''/>Go To Home</Link></li>
                <li className="list"><Link to = '/wishlist' className="list"> <img src={Heart} className="me-2" alt=''/>My Wishlist</Link></li>
                <li className="list"><Link to = '/cart' className="list"> <img src={Cart} className="me-2" alt='' />My Cart </Link></li>
                <li className="list"><Link to = '/order' className="list"><img src={Order} className="me-2" alt=''/> My Orders</Link></li>
                <li className="list"><Link to = '/category' className="list"> <img src={Heart} className="me-2" alt=''/>All Categories</Link></li>
                <li className="list"><Button className="bg-warning border" onClick = {logout}>Log Out</Button></li>
           </ul>
        </div>
        // <div>
        //     <ul>
        //         <li><img src={customerImage} alt="customer" /></li>
        //         <li>Welcome {customer.name}</li>
        //         <li>{customer.email}</li>
        //         <li><Link to = '/'> Go To Home</Link></li>
        //         <li><Link to = '/wishlist'> My Wishlist</Link></li>
        //         <li><Link to = '/cart'> My Cart </Link></li>
        //         <li><Link to = '/order'> My Orders</Link></li>
        //         <li><button onClick = {logout}>Log Out</button></li>
        //    </ul>
        // </div>
    )
}

export default Sidebar