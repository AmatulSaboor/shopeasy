import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import './Footer.css'

const Footer = () => {
  return (
    <footer className="d-flex justify-content-evenly align-items-center mt-5 footer" >
      <div className="">
        <a href="https://www.facebook.com"className="px-2" ><FaFacebookF /></a>
        <a href="https://www.twitter.com" className="px-2"><FaTwitter /></a>
        <a href="https://www.instagram.com" className="px-2"><FaInstagram /></a>
      </div>
      <div>
      <p className="mt-3">&copy; 2024 Your Website</p>
      </div>
    </footer>
  );
};


export default Footer;