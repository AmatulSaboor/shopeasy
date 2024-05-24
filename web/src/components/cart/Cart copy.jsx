
import React, { useCallback, useEffect, useState } from 'react';
import useFetch from '../../custom hooks/useFetch';
import { useAuth } from "../../context/AuthContext"
import serverURL from '../../config/configFile';
const CartComponent = () => {
    const { user } = useAuth()

  const url = `${serverURL}cart/getList/${user.id}`;
  const { data, loading, error } = useFetch(url, [user.id]);
    const [myCart, setMyCart] = useState([])

//   const setCart = useCallback((cartData) => {
//     setMyCart(cartData)
//   }, []);

  useEffect(() => {
    console.log(data, loading, error)
    if (data) {
        console.log(data)
    //   setMyCart(data.cart);
    }
  }, [data, setMyCart, error, loading]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Unit Price</th>
                        <th>In stock</th>
                        <th>Available</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {myCart && myCart.map((item, key) => {
                        return(
                              <tr key={key}>
                                <td><img src={serverURL + '/uploads/products/' + item.productID.image} alt="not available" width={50} height={50} /></td>
                                <td>{item.productID.name}</td>
                                <td>{item.productID.price}</td>
                                <td>{item.productID.quantity - item.productID.sold}</td>
                                <td>{item.productID.isAvailable ? 'Available' : 'Not available'  }</td>
                                <td>{item.productID.price * item.quantity}</td>
                              </tr>)
                        })}
                </tbody>
            </table>
    </div>
  );
};

export default CartComponent;
