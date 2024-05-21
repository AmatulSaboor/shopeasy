import React, { useState } from 'react';
import { FaBars, FaHome, FaSignOutAlt } from 'react-icons/fa';
import Logo from '../../logo.svg';
import Sidebar from '../sidebar/Sidebar'

const Header = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <header style={styles.header}>
      <div style={styles.leftSection}>
        <FaBars style={styles.icon} onClick={toggleSidebar} />
        <img src={Logo} alt="Logo" style={styles.logo} />
        <div style={styles.brand}>
          <h1>ShopEasy</h1>
          <p>Your ease is our price</p>
        </div>
      </div>
      <div style={styles.rightSection}>
        <a href="/home" style={styles.iconLink}><FaHome /></a>
        <a href="/logout" style={styles.iconLink}><FaSignOutAlt /></a>
      </div>
      {showSidebar && (
        <div style={styles.sidebar}>
          {/* <Sidebar /> */}
          {/* Add your sidebar content here */}
        </div>
      )}
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative', // Added
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    zIndex: 1, // Added
  },
  logo: {
    width: '50px',
    marginRight: '10px',
  },
  brand: {
    display: 'flex',
    flexDirection: 'column',
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    fontSize: '24px',
    color: '#fff',
    cursor: 'pointer',
    marginRight: '10px',
    zIndex: 1, // Added
  },
  iconLink: {
    fontSize: '20px',
    color: '#fff',
    textDecoration: 'none',
    margin: '0 10px',
  },
  sidebar: {
    position: 'fixed',
    top: '0',
    left: '0',
    height: '100%',
    width: '200px',
    backgroundColor: '#555',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    zIndex: 2, // Added
  },
};

export default Header;
