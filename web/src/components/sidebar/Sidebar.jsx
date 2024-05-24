import { Link } from 'react-router-dom'
import serverURL from '../../config/configFile'
import { useAuth } from '../../context/AuthContext'

const Sidebar = () => {
    const customerImage = ''
    const { user } = useAuth()
    const logout = () => {
        fetch(serverURL + `auth/logout`, {credentials : `include`})
        .then(res => res.json())
        .then(res => {if(res.logout) {
        }})
        .catch( err => console.log(err))
    }
    return(
        <div>
            <ul>
                <li><img src={customerImage} alt="user" /></li>
                <li>Welcome {user.name}</li>
                <li>{user.email}</li>
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