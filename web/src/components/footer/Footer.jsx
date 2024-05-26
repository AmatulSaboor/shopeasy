import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'
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
  )
}

export default Footer
