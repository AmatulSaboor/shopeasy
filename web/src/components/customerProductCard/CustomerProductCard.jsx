import serverURL from '../../config/configFile'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import './CustomerProductCard.css'
import { useState } from 'react'

const CustomerProductCard = ({product, isInWishlist, isInCart, customerID, handleUpdateWishList, handleRemoveWL, handleUpdateCart, handleRemoveCT}) => {
  const handleAddToWishList = () => {
    console.log(product._id, ' : ', customerID)
    try {
      fetch(serverURL + `wishlist/add`,
      {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({productID: product._id, customerID : customerID}),
        credentials: 'include'
      })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        handleUpdateWishList(res.wishlistEntry)
      })
      .catch(e => console.log(e))
    } catch (error) {
      console.log(error)
    }
  }

  const handleAddToCart = () => {
    console.log(product._id, ' : ', customerID)
    try {
      fetch(serverURL + `cart/add`,
      {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({productID: product._id, customerID : customerID}),
        credentials: 'include'
      })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        handleUpdateCart(res.createdCart)
      })
      .catch(e => console.log(e))
    } catch (error) {
      console.log(error)
    }
  }

  const handleRemoveFromWishList = () => {
    console.log(product._id, ' : ', customerID)
    try {
      fetch(serverURL + `wishlist/removeOne/${product._id}/${customerID}`,
      {
        mode: 'cors',
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json' 
        },
        // body: JSON.stringify({productID: product._id, customerID : customerID}),
        credentials: 'include'
      })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        handleRemoveWL(product._id)
      })
      .catch(e => console.log(e))
    } catch (error) {
      console.log(error)
    }
  }

  const handleRemoveFromCart = () => {
    console.log(product._id, ' : ', customerID)
    try {
      fetch(serverURL + `cart/removeOne/${product._id}/${customerID}`,
      {
        mode: 'cors',
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        // body: JSON.stringify({productID: product._id, customerID : customerID}),
        credentials: 'include'
      })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        handleRemoveCT(product._id)
      })
      .catch(e => console.log(e))
    } catch (error) {
      console.log(error)
    }
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
        <div>description : {product.description}</div>
        {isInWishlist(product._id) ? 
        <Button onClick={handleRemoveFromWishList}>Remove from Whishlist</Button> : 
        <Button onClick={handleAddToWishList}>Add to Whishlist</Button> }
      <br />
          {isInCart(product._id) ?          
          <Button variant="primary" onClick={handleRemoveFromCart}>Remove from cart</Button> :
          <Button variant="primary" onClick={handleAddToCart}>Add to cart</Button>
          }
      </Card.Body>
  </Card>
  );
}

export default CustomerProductCard;