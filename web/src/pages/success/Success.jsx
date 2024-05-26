import { Link } from 'react-router-dom' 
import './Success.css'

const Success = () => {
  return (
    <div className="success-message">
      <div className="circle">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green" width="48px" height="48px">
          <path d="M0 0h24v24H0z" fill="none"/>
          <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
        </svg>
      </div>
      <h3>Congratulations! An email has been sent with the order summary!</h3>
      <Link to="/">
        <button className="back-button">Keep Shopping</button>
      </Link>
    </div>
  )
}

export default Success
