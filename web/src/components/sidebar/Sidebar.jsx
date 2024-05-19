import { Link, useNavigate } from 'react-router-dom'
import serverURL from '../../config/configFile'


const Sidebar = ({loggedInCustomerName, loggedInCustomerEmail, setLoggedInCustomerEmail, setLoggedInCustomerName}) => {
    const customerImage = ''
    const navigate = useNavigate()

    const logout = () => {
        fetch(serverURL + `auth/logout`, {credentials : `include`})
        .then(res => res.json())
        .then(res => {if(res.logout) {
            setLoggedInCustomerName(null)
            setLoggedInCustomerEmail(null)
            navigate('/login')
        }})
        .catch( err => console.log(err))
    }
    return(
        <div>
            <ul>
                <li><img src={customerImage} alt="user" /></li>
                <li>User Name: {loggedInCustomerName}</li>
                <li>Email: {loggedInCustomerEmail}</li>
                <li><Link to = '/dashboard'> Go To Home</Link></li>
                <li><Link to = '/wishlist'> My Wishlist</Link></li>
                <li><Link to = 'cart'> My Cart </Link></li>
                <li><Link to = '/order'> My Orders</Link></li>
                <li><button onClick = {logout}>Log Out</button></li>
           </ul>
        </div>
    )
}

export default Sidebar