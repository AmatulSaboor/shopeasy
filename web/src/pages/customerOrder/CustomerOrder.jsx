import { useEffect, useState } from "react"
import { useAuth } from "../../context/AuthContext"
import useFetch from "../../custom hooks/useFetch"
import React, { Fragment } from 'react';
import dateFormater from "../../utils/dateFormater";
const CustomerOrder = () => {

    const {customer} = useAuth()
    const orderUrl = `order/getList/${customer.email}`
    const { data, error, loading} = useFetch(orderUrl)
    const [order, setOrder] = useState([])
    const [orderItems, setOrderItems] = useState([])

    useEffect(() => {
        console.log(`data` ,data)
        if(data){
            setOrder(data.orders)
            setOrderItems(data.orderItems)
        }
    },[data])

    if(loading) return <div>....Loading</div>
    if(error) return <div>{error}</div>

    return(
        <div>
            <p>My Orders</p>
            {order && console.log(orderItems)}
            <table>
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
                {order && order.map((item, key) => {
                    return(
                        <Fragment key={key}><tr>
                            <td>{item._id}</td>
                            <td>{dateFormater(item.createdAt)}</td>
                            <td>{item.status}</td>
                            <td>Rs. {item.subTotal}</td>
                            <td>Rs. {item.grandTotal}</td>
                        </tr>
                        {/* <button>see more</button> */}
                        <tr>
                            <th>Product Name</th>
                            <th>Unit Price</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                        </tr>
                        
                                {orderItems && orderItems.map((i, k) => {
                                    console.log(k, item._id, i.orderID)
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
                    </Fragment>)}
                )}
                </tbody>
            </table>
        </div>
    )
}

export default CustomerOrder