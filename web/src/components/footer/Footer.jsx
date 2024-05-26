import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import './Footer.css'
const Footer = () => {
  return (
    <footer className="footer mt-5 py-4">
      <div>
        <a href="https://www.facebook.com" className="s-icon"><FaFacebookF /></a>
        <a href="https://www.twitter.com" className="s-icon ms-3"><FaTwitter /></a>
        <a href="https://www.instagram.com" className="s-icon ms-3"><FaInstagram /></a>
      </div>
      <p>&copy; 2024 Your Website</p>
    </footer>
    // <footer style={styles.footer}>
    //   <div style={styles.social}>
    //     <a href="https://www.facebook.com" style={styles.icon}><FaFacebookF /></a>
    //     <a href="https://www.twitter.com" style={styles.icon}><FaTwitter /></a>
    //     <a href="https://www.instagram.com" style={styles.icon}><FaInstagram /></a>
    //   </div>
    //   <p style={styles.copyright}>&copy; 2024 Your Website</p>
    // </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#ffc107',
    color: 'grey',
    padding: '20px',
    textAlign: 'center',
    position: 'fixed',
    bottom: '0',
    width: '100%',
  },
  social: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10px',
  },
  icon: {
    fontSize: '24px',
    color: 'grey',
    margin: '0 10px',
    textDecoration: 'none',
  },
  copyright: {
    fontSize: '14px',
  },
};

export default Footer;
