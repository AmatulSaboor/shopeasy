import NotAvailable from '../../assets/notAvailable.jpg'
import serverURL from '../../config/configFile'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import './CustomerProductCard.css'

const CustomerProductCard = ({
    product, 
    customerID, 
    isInCart, 
    isInWishlist, 
    handleAddWishlistEntry, 
    handleDeleteWL, 
    handleAddCartEntry, 
    handleDeleteCT}) => {

    // handlers for add/remove from cart/wishlist
    const handleAddToWishList = () => {
        try {
            fetch(serverURL + `wishlist/add`,
            {
                mode: 'cors',
                method: 'POST',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({productID: product._id, customerID}),
            })
            .then(res => res.json())
            .then(res => handleAddWishlistEntry(res.wishlistEntry))
            .catch(e => console.log(e))
            } catch (error) {
                console.log(error)
        }
    }

    const handleAddToCart = () => {
        try {
            fetch(serverURL + `cart/add`,
            {
                mode: 'cors',
                method: 'POST',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({productID: product._id, customerID}),
            })
            .then(res => res.json())
            .then(res => handleAddCartEntry(res.createdCart))
            .catch(e => console.log(e))
            } catch (error) {
                console.log(error)
        }
    }

    const handleRemoveFromWishList = () => {
        try {
            fetch(serverURL + `wishlist/removeOne/${product._id}/${customerID}`,
            {
                mode: 'cors',
                method: 'DELETE',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
            })
            .then(res => res.json())
            .then(res => handleDeleteWL(product._id))
            .catch(e => console.log(e))
            } catch (error) {
                console.log(error)
        }
    }

    const handleRemoveFromCart = () => {
        try {
            fetch(serverURL + `cart/removeOne/${product._id}/${customerID}`,
            {
                mode: 'cors',
                method: 'DELETE',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
            })
            .then(res => res.json())
            .then(res => handleDeleteCT(product._id))
            .catch(e => console.log(e))
        } catch (error) {
            console.log(error)
        }
    }

    // RETURN JSX
    return (
        <>    
            <Card className='my-4 '>
                <div className="d-flex justify-content-between">
                    <div className="available mt-3">
                        <p className="px-2">{product.isAvailable ? 
                        <span className='text-success fw-bold' >Available</span>: 
                        <span className='text-danger fw-bold'>Not Available</span>}</p>
                    </div>
                    <div className="price me-2 mt-3 fw-bold">Rs. {product.price}</div>
                </div>
                <div className='d-flex justify-content-center'>
                    <Card.Img variant="top" src={product.image ? serverURL + `uploads/products/` + product.image : NotAvailable} className="p-3 img-card"/>
                </div>
                <Card.Body>
                    <div className=" fs-medium fw-bold text-center">{product.name}</div>
                    <div className="fs-small">{product.category.name}</div>
                    <div>{product.description}</div>
                    {isInWishlist(product._id) ? 
                        <Button onClick={handleRemoveFromWishList} className="my-2 bg-warning">Remove from Whishlist</Button> : 
                        <Button onClick={handleAddToWishList} className="mt-2 bg-warning">Add to Whishlist</Button> }
                        <br></br>
                    {isInCart(product._id) ?          
                        <Button variant="warning" onClick={handleRemoveFromCart} className="my-2">Remove from cart</Button> : 
                        <Button variant="warning" onClick={handleAddToCart} className="mt-2">Add to cart</Button>
                    }
                </Card.Body>
            </Card>
        </>
    );
}

export default CustomerProductCard;