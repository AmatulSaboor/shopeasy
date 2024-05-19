import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.social}>
        <a href="https://www.facebook.com" style={styles.icon}><FaFacebookF /></a>
        <a href="https://www.twitter.com" style={styles.icon}><FaTwitter /></a>
        <a href="https://www.instagram.com" style={styles.icon}><FaInstagram /></a>
      </div>
      <p style={styles.copyright}>&copy; 2024 Your Website</p>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#333',
    color: '#fff',
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
    color: '#fff',
    margin: '0 10px',
    textDecoration: 'none',
  },
  copyright: {
    fontSize: '14px',
  },
};

export default Footer;
