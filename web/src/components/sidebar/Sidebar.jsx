import { Link, useNavigate } from 'react-router-dom'
import serverURL from '../../config/configFile'
import { useAuth } from '../../context/AuthContext'

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
        <div>
            <ul>
                <li><img src={customerImage} alt="customer" /></li>
                <li>Welcome {customer.name}</li>
                <li>{customer.email}</li>
                <li><Link to = '/'> Go To Home</Link></li>
                <li><Link to = '/wishlist'> My Wishlist</Link></li>
                <li><Link to = '/cart'> My Cart </Link></li>
                <li><Link to = '/order'> My Orders</Link></li>
                <li><button onClick = {logout}>Log Out</button></li>
           </ul>
        </div>
    )
}

export default Sidebar