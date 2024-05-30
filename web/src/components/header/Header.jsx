import { useState } from 'react'
import Sidebar from '../sidebar/Sidebar'
import serverURL from '../../config/configFile'
import { useAuth } from '../../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import Hamburger from '../../assets/hamburger.png'
import Logout from '../../assets/logout.png'
import Heart from '../../assets/heart.png'
import Cart from '../../assets/cart.png'
import Home from '../../assets/home.png'
import Logo from '../../assets/logo.png'
import './Header.css'

const Header = () => {
	const navigate = useNavigate()
	const [show, setShow] = useState(false)
	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)
	const { isAuthenticated, setCustomer, setIsAuthenticated, setLoading} = useAuth()
	
	// logout function
	const logout = () => {
		fetch(serverURL + `auth/logout`, {credentials : `include`})
		.then(res => res.json())
		.then(res => {
			if(res.logout) {
				setCustomer(null)
				setIsAuthenticated(false)
				setLoading(false)
				navigate('/login')
		}})
		.catch( err => console.log(err)
		)}

	// RETURN JSX
	return (
		<>
			<Navbar>
				<Container className="d-flex justify-content-start">
					<Navbar.Brand href="" className="d-flex justify-content-start">
						{isAuthenticated && 
						<Button onClick={handleShow} className="btn-light">
							<img src={Hamburger} alt="menu" className="menu-icon" />
						</Button>}
						<Offcanvas show={show} onHide={handleClose} className="sidebar">
							<Offcanvas.Header closeButton></Offcanvas.Header>
							<Offcanvas.Body>{isAuthenticated &&  <Sidebar handleClose = {handleClose} />}</Offcanvas.Body>
						</Offcanvas>
					</Navbar.Brand>
					<Navbar.Brand href="" className="logo d-flex justify-content-start" >
						<img src={Logo} alt="shopEasy" />
						<h3 className="m-auto shopeasy-deading">ShopEasy</h3>
					</Navbar.Brand>
				</Container>
				<Navbar.Brand href="" className="me-5" >
					<Button className="btn-warning me-3">
						<Link to='/' className="add-to-cart"><img src={Home} className="me-2" alt=''/>Go to Home</Link>
					</Button>
					<Button className="btn-warning me-3">
						<Link to='/wishlist' className="add-to-cart"><img src={Heart} className="me-2" alt='' />Go to Whishlist</Link>
					</Button>
					<Button className="btn-warning me-3">
						<Link to='/cart' className="add-to-cart"><img src={Cart} className="me-2" alt='' />Go to Cart</Link>
					</Button>
					<img src={Logout} alt="logout" className="logout" onClick={logout}/>
				</Navbar.Brand>
			</Navbar> 
		</>
    )
}


export default Header
