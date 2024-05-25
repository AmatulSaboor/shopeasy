import React, { useState } from 'react';
import { FaBars, FaHome, FaSignOutAlt, FaWallet } from 'react-icons/fa';
// import Logo from '../../logo.svg';
import Sidebar from '../sidebar/Sidebar'
import serverURL from '../../config/configFile';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaShop } from 'react-icons/fa6';
import './Header.css'
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './Header.css';
import Logout from '../../assets/logout.png'
import Hamburger from '../../assets/hamburger.png'
import Logo from '../../assets/logo.png'
const Header = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const [show, setShow] = useState(false);
  const navigate = useNavigate()
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { isAuthenticated, setCustomer, setIsAuthenticated, setLoading} = useAuth();
  const logout = () => {
    fetch(serverURL + `auth/logout`, {credentials : `include`})
    .then(res => res.json())
    .then(res => {if(res.logout) {
      setCustomer(null)
      setIsAuthenticated(false)
      setLoading(false)
      console.log('in logout console')
      navigate('/login')
    }})
    .catch( err => console.log(err))}
  return (
    // return (
      <>
        <Navbar>
          <Container className="d-flex justify-content-start">
            <Navbar.Brand href="#home" className="d-flex justify-content-start">
            {isAuthenticated && <Button onClick={handleShow} className="btn-light">
                <img src={Hamburger} alt="menu" className="menu-icon" />
            </Button>}
              <Offcanvas show={show} onHide={handleClose} className="sidebar">
                <Offcanvas.Header closeButton>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  {isAuthenticated &&  <Sidebar />}
                </Offcanvas.Body>
              </Offcanvas>
            </Navbar.Brand>
          <Navbar.Brand href="./cards" className="logo d-flex justify-content-start" >
              <img src={Logo} alt="shopEasy" />
            </Navbar.Brand>
          </Container>
            <Navbar.Brand href="#" className="me-5" >
              <img src={Logout} alt="logout" className="logout" />
            </Navbar.Brand>
        </Navbar>       
      </>
    )
  
    // <header style={styles.header}>
    //   <div style={styles.leftSection}>
    //     {isAuthenticated && <FaBars style={styles.icon} onClick={toggleSidebar} />}
    //     <img src={Logo} alt="Logo" style={styles.logo} />
    //     <div style={styles.brand}>
    //       <h1>ShopEasy</h1>
    //       <p>Your ease is our price</p>
    //     </div>
    //   </div>
    //   <div style={styles.rightSection}>
    //     <Link to="/wishlist" style={styles.iconLink}><FaShop /></Link>
    //     <Link to="/cart" style={styles.iconLink}><FaWallet /></Link>
    //     <Link to="/" style={styles.iconLink}><FaHome /></Link>
    //     <button onClick={() => logout()} style={styles.iconLink}><FaSignOutAlt /></button>
    //   </div>
    //   {isAuthenticated && showSidebar && (
    //     <div style={styles.sidebar}>
    //       <Sidebar />
    //     </div>
    //   )}
    // </header>
};


export default Header;
