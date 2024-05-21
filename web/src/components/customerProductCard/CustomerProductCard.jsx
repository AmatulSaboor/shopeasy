import serverURL from '../../config/configFile'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import './CustomerProductCard.css'
import { useState } from 'react'

const CustomerProductCard = ({product, isInWishlist, loggedInCustomerId}) => {
  const [quantity, setQuantity] = useState(1)
  const increaseQuantity = () => {
    if (quantity < product.quantity- product.sold)
      setQuantity(prevCount => prevCount + 1)
  }
  const decreaseQuantity = () => {
    if (quantity > 0)
      setQuantity(prevCount => prevCount - 1)
  }
  const handleAddToWishList = () => {
    console.log(product._id, ' : ', loggedInCustomerId)
    try {
      fetch(serverURL + `wishlist/add`,
      {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' // Specify content type as JSON
        },
        body: JSON.stringify({productID: product._id, customerID : loggedInCustomerId}),
        credentials: 'include'
      })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        
      })
      .catch(e => console.log(e))
    } catch (error) {
      console.log(error)
    }
  }

  const handleRemoveFromWishList = () => {

  }

  return (
    <Card className="card d-flex justify-content-center">
      <Card.Img variant="top" src={serverURL + `uploads/products/` + product.image} className="p-5"/>
      <Card.Body>
        <div className="row text-center">
          <div className="col-md-6 fs-small">{product.isAvailable ? 'Available' : 'Not Availabe'}</div>
          <div className="col-md-4">{product.quantity - product.sold > 0 ? `${product.quantity - product.sold} in stock` : 'Out of stock'}</div>
          <div className="col-md-6 fs-small">{product.name}</div>
          <div className="col-md-6">{product.category.name}</div>
          <div className="col-md-6">RS. {product.price}</div>
        </div>
        <div className="row text-center">
          <div className="col-md-4 fs-small border"><button onClick={decreaseQuantity}>-</button></div>
          <div className="col-md-4">{quantity}</div>
          <div className="col-md-4 border"><button onClick={increaseQuantity}>+</button></div>
        </div>
        <div>description : {product.description}</div>
        {isInWishlist(product._id) ? 
        <Button onClick={handleRemoveFromWishList}>Remove from Whishlist</Button> : 
        <Button onClick={handleAddToWishList}>Add to Whishlist</Button> }
      <br />
        <Button variant="primary">Add to cart</Button>
      </Card.Body>
  </Card>
  );
}

export default CustomerProductCard;