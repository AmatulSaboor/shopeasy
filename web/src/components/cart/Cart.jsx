import { useEffect, useState } from "react"
import serverURL from "../../config/configFile"
import { useNavigate, Link } from "react-router-dom"
// import { Pagination } from "react-bootstrap"
import { useAuth } from "../../context/AuthContext"
const Cart = () => {
    
    const navigate = useNavigate()
    const [cart, setCart] = useState([])
    const { user } = useAuth()
    // const [currentCart, setCurrentCart] = useState([])
    // const [quantity, setQuantity] = useState(1)
    const increaseQuantity = (item) => {
        if (item.quantity < (item.productID.quantity - item.productID.sold))
            {const updatedCart = cart.map(cartItem => 
                cartItem.productID._id === item.productID._id
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem
              );
              setCart(updatedCart);}
    }
    const decreaseQuantity = (item) => {
        // if (item.quantity > 0)
            const updatedCart = cart.map(cartItem => 
                cartItem.productID._id === item.productID._id
                  ? { ...cartItem, quantity: Math.max(cartItem.quantity - 1, 1) }
                  : cartItem
              );
              setCart(updatedCart);
    }

    const handleRemoveProductFromCart = (item) => {
        try {
            console.log(item)
            // fetch(serverURL + `cart/remove/${item._id}/${loggedInCustomerId}`,
            fetch(serverURL + `cart/remove/${item._id}`,
            {
              mode: 'cors',
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json' // Specify content type as JSON
              },
              // body: JSON.stringify({productID: product._id, customerID : loggedInCustomerId}),
              credentials: 'include'
            })
            .then(res => res.json())
            .then(res => {
              console.log(res)
              setCart(cart.filter(i => i.productID !== item._id))
            })
            .catch(e => console.log(e))
          } catch (error) {
            console.log(error)
          }
    }
    useEffect(() => {
        const getCart = () => {
            try{
                console.log(user.id)
                // fetch(serverURL + `cart/getList/${loggedInCustomerId}`)
                fetch(serverURL + `cart/getList/${user.id}`)
                .then(response => response.json())
                .then(data => {
                    // console.log(data)
                    setCart(data.cart)
                    // const updatedCart = cart.map(item => ({
                    //     ...item,
                    //     productID: {
                    //         ...item.productID,
                    //         cartQuantity: 1,  // Default quantity value, adjust as 
                    //     }  // Default quantity value, adjust as needed
                    // }));
                    // setCart(updatedCart)
                })
                .catch(e => console.error(e))
            }catch(e){
                console.error(e)
            }
        }

        getCart()
        // fetch(serverURL + 'auth/session', {
        //     credentials : 'include'
        // })
        // .then(res => res.json())
        // .then(res => {
        //     if(!res.isAuthenticated)
        //         return navigate('/login')
        //     else{
                
        //         getCart()           
        //     }
        // })
        // .catch(err => console.log(err))
    }, [navigate, user.id])


    return(
        <>
            <table>
                <thead>
                    <tr>
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
                    {cart && cart.map((item, key) => {
                        return(
                              <tr key={key}>
                                <td><img src={serverURL + '/uploads/products/' + item.productID.image} alt="not available" width={50} height={50} /></td>
                                <td>{item.productID.name}</td>
                                <td>{item.productID.price}</td>
                                <td>{item.productID.quantity - item.productID.sold}</td>
                                <td>{item.productID.isAvailable ? 'Available' : 'Not available'  }</td>
                                <td>
                                    <div className="row text-center">
                                        <div className="col-md-4 fs-small border"><button onClick={() => decreaseQuantity(item)}>-</button></div>
                                        <div className="col-md-4">{item.quantity}</div>
                                        <div className="col-md-4 border"><button onClick={() => increaseQuantity(item)}>+</button></div>
                                    </div>
                                </td>
                                <td>{item.productID.price * item.quantity}</td>
                                <td><button onClick={() => handleRemoveProductFromCart(item)}>delete</button></td>
                              </tr>)
                        })}
                </tbody>
            </table>
            <Link to='/checkout'>Checkout</Link>
        </>
    )
}

export default Cart