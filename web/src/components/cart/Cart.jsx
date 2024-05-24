import { useCallback, useEffect, useState } from "react"
import serverURL from "../../config/configFile"
import { Link } from "react-router-dom"
import { Pagination } from "react-bootstrap"
import { useAuth } from "../../context/AuthContext"
import useFetch from "../../custom hooks/useFetch"

const Cart = () => {
    
    const { user } = useAuth()
    const url = `cart/getList/${user.id}`;
    const { data, error, loading} = useFetch(url)
    const [cart, setCart] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 2;
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const [searchQuery, setSearchQuery] = useState("");
    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    }
    // const currentCart = cart
    //     .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    //     .slice(indexOfFirstProduct,indexOfLastProduct);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const increaseQuantity = async (item) => {
        if (item.quantity < (item.productID.quantity - item.productID.sold))
            {const updatedCart = cart.map(cartItem => 
                cartItem.productID._id === item.productID._id
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem
              );
              setCart(updatedCart);

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
    const decreaseQuantity = async (item) => {
            const updatedCart = cart.map(cartItem => 
                cartItem.productID._id === item.productID._id
                  ? { ...cartItem, quantity: Math.max(cartItem.quantity - 1, 1) }
                  : cartItem
              );
              setCart(updatedCart);

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
            // fetch(serverURL + `cart/remove/${item._id}/${user.id}`,
            fetch(serverURL + `cart/removeOne/${item.productID._id}/${user.id}`,
            {
              mode: 'cors',
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json' 
              },
              // body: JSON.stringify({productID: product._id, customerID : user.id}),
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

    // const getCart = useCallback(() => {
    //         try{
    //             console.log(user.id)
    //             fetch(serverURL + `cart/getList/${user.id}`)
    //             .then(response => response.json())
    //             .then(data => {
    //                 setCart(data.cart)
    //             })
    //             .catch(e => console.error(e))
    //         }catch(e){
    //             console.error(e)
    //         }

    // }, [user.id])
    useEffect(() => {
        if(data)
            setCart(data.cart)
        // getCart()
    }, [data])


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return(
        <>
            <div>
                <label htmlFor="search" >search :</label>
                <input type="text" id="search" onChange={handleSearch} />
            </div>
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
            {/* <Pagination productsPerPage = {productsPerPage} totalProducts = {cart.length} paginate = {paginate}/> */}
            <Link to='/checkout'>Checkout</Link>
        </>
    )
}

export default Cart