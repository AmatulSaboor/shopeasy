import Pagination from "../../components/pagination/Pagination"
import { useAuth } from "../../context/AuthContext"
import InputGroup from 'react-bootstrap/InputGroup'
import useFetch from "../../custom hooks/useFetch"
import serverURL from "../../config/configFile"
import Button from 'react-bootstrap/Button'
import { useEffect, useState } from "react"
import Table from 'react-bootstrap/Table'
import { Link } from "react-router-dom"
import Form from 'react-bootstrap/Form'
import './Cart.css'

const Cart = () => {
    const { customer } = useAuth()
    const url = `cart/getList/${customer.id}`
    const { data, error, loading} = useFetch(url)
    const [cart, setCart] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const productsPerPage = 6
    const indexOfLastProduct = currentPage * productsPerPage
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage
    const [searchQuery, setSearchQuery] = useState('')
    const currentCart = cart
        .filter(item => item.productID.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice(indexOfFirstProduct,indexOfLastProduct)
    const paginate = (pageNumber) => setCurrentPage(pageNumber)
    
    // handle search
    const handleSearch = (event) => {
        setSearchQuery(event.target.value)
        setCurrentPage(1)
    }

    // increase quantity
    const increaseQuantity = async (item) => {
        if (item.quantity < (item.productID.quantity - item.productID.sold))
            {const updatedCart = cart.map(cartItem => 
                cartItem.productID._id === item.productID._id
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem
              )
              setCart(updatedCart)

              await fetch(serverURL + `cart/changeItemQty`,
                {
                    mode: 'cors',
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json' 
                    },
                    body: JSON.stringify({id:item._id, quantity:item.quantity+1}),
                    credentials: 'include' 
                }
              )
            }
    }

    // decrease quatity
    const decreaseQuantity = async (item) => {
            const updatedCart = cart.map(cartItem => 
                cartItem.productID._id === item.productID._id
                  ? { ...cartItem, quantity: Math.max(cartItem.quantity - 1, 1) }
                  : cartItem
              )
              setCart(updatedCart)

              await fetch(serverURL + `cart/changeItemQty`,
                {
                    mode: 'cors',
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json' 
                    },
                    body: JSON.stringify({id:item._id, quantity:item.quantity-1}),
                    credentials: 'include' 
                }
              )
    }


    const handleRemoveProductFromCart = (item) => {
        try {
            console.log(item)
            fetch(serverURL + `cart/removeOne/${item.productID._id}/${customer.id}`,
            {
              mode: 'cors',
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json' 
              },
              credentials: 'include'
            })
            .then(res => res.json())
            .then(res => {
              console.log(res)
              setCart(cart.filter(i => i.productID._id !== item.productID._id))
            })
            .catch(e => console.log(e))
          } catch (error) {
            console.log(error)
          }
    }
    useEffect(() => {
        if(data)
            setCart(data.cart)
    }, [data])


    if (loading) return <div className="mt-4 fw-bold fs-1">Loading...</div>;
    if (error) return <div className="mt-4 fw-bold fs-3">Error: {error.message}</div>;

    // RETURN JSX
    return(
      <>
      <h4 className="mt-4 mb-4">My Cart</h4>
          <div className="d-flex justify-content-center">
                 <Form className="d-flex justify-content-center col-md-3">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    onChange={handleSearch}
                  />
                </Form>
            </div>
            {currentCart.length === 0 ? (<div className="mt-4">You don't have anything in your cart</div>) : (
            <>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Unit Price</th>
                  <th>In stock</th>
                  <th>Available</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                  <th>delete</th>
                </tr>
              </thead>
              <tbody>
              {currentCart && currentCart.map((item,key)=> {
                  return (
                    <tr key={key}>
                      <td><img src={serverURL + '/uploads/products/' + item.productID.image} alt="not available" width={50} height={50} /></td>
                      <td>{item.productID.name}</td>
                      <td>{item.productID.price}</td>
                      <td>{item.productID.quantity - item.productID.sold}</td>
                      <td>{item.productID.isAvailable ? <span className="text-success fw-bold">Available</span>: <span className="text-danger fw-bold">Not Available</span>  }</td>
                      <td>
                      <InputGroup className="mb-3 col-md-3">
                        <InputGroup.Text onClick={() => decreaseQuantity(item)}>-</InputGroup.Text>
                        <Form.Control value={item.quantity} onChange={() => {}}/>
                        <InputGroup.Text onClick={() => increaseQuantity(item)}>+</InputGroup.Text>
                      </InputGroup>
                      </td>
                      <td>{item.productID.price * item.quantity}</td>
                      <td><Button onClick={() => handleRemoveProductFromCart(item)} className="bg-danger">remove</Button></td>
                    </tr>
                  )
              })}
               
              </tbody>
              </Table>
              <p>Note : Products marked as <b>NOT AVAILABLE</b> may or may not be delivered depending on the availibility at the time of delivery</p>
              <Pagination productsPerPage = {productsPerPage} totalProducts = {cart.length} paginate = {paginate}/>
              </>)}
              {currentCart.length !== 0 &&
              <Button className="btn-dark mt-4">
                <Link to='/checkout' className="checkout">Checkout</Link>
             </Button>}
      </>
    )
}

export default Cart