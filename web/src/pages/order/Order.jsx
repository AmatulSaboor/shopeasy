import { useEffect, useState } from "react"
import { useAuth } from "../../context/AuthContext"
import useFetch from "../../custom hooks/useFetch"

const Order = () => {

    const {customer} = useAuth()
    const orderUrl = `order/getList/${customer.email}`
    const { data, error, loading} = useFetch(orderUrl)
    const [order, setOrder] = useState([])
    const [orderItems, setOrderItems] = useState([])

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      };

    useEffect(() => {
        console.log(`data` ,data)
        if(data){
            setOrder(data.orders)
            setOrderItems(data.orderItems[0])
        }
    },[data])

    if(loading) return <div>....Loading</div>
    if(error) return <div>{error}</div>

    return(
        <div>
            <p>My Orders</p>
            {order && console.log(orderItems)}
            {order && order.map((item, key) => {
                return(
                        <table key={key}>
                            <thead>
                                <tr>
                                    <th>Order Number</th>
                                    <th>Order Date</th>
                                    <th>Status</th>
                                    <th>Sub Total</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{item._id}</td>
                                    <td>{formatDate(item.createdAt)}</td>
                                    <td>{item.status}</td>
                                    <td>Rs. {item.subTotal}</td>
                                    <td>Rs. {item.grandTotal}</td>
                                </tr>
                                {/* <a href="/">see item details</a> */}
                                {orderItems && orderItems.map((i, k) => {
                                    if(item._id === i.orderID)
                                    return(
                                        <tr key={k}>
                                            <td>{i.productName}</td>
                                            <td>{i.price}</td>
                                            <td>{i.quantity}</td>
                                            <td>{i.price * i.quantity}</td>
                                        </tr>
                                    )
                                    else return null
                                })}
                            </tbody>
                        </table>
                    )}
                )}
        </div>
    )
}

export default Order