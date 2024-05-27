import Pagination from "../../components/pagination/Pagination"
import dateFormater from "../../utils/dateFormater"
import { useAuth } from "../../context/AuthContext"
import useFetch from "../../custom hooks/useFetch"
import { useEffect, useState } from "react"
import React, { Fragment } from 'react'
import Table from 'react-bootstrap/Table'
import './CustomerOrder.css'
const CustomerOrder = () => {
    const {customer} = useAuth()
    const orderUrl = `order/getList/${customer.email}`
    const { data, error, loading} = useFetch(orderUrl)
    const [orders, setOrders] = useState([])
    const [orderItems, setOrderItems] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const ordersPerPage = 3
    const indexOfLastOrder = currentPage * ordersPerPage
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
    const currentOrders = orders
        .slice(indexOfFirstOrder,indexOfLastOrder)
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    useEffect(() => {
        console.log(`data` ,data)
        if(data){
            setOrders(data.orders)
            setOrderItems(data.orderItems)
        }
    },[data])

    if(loading) return <div className="mt-4 fw-bold fs-1">Loading...</div>
    if(error) return <div className="mt-4 fw-bold fs-3">Error : {error}</div>

    return(
        <div>
            <h4 className="mt-4 mb-4">My Orders</h4>
            {currentOrders.length === 0 ? (<div className="mt-4">You have not ordered anything yet!!</div>) : (
                <div className="container mt-4">
            <Table bordered hover>

                {currentOrders && currentOrders.map((item, key) => {
                    return(
                        <Fragment key={key}>
                        <thead>
                    <tr>
                        <th>S. No.</th>
                        <th>Order Number</th>
                        <th>Order Date</th>
                        <th>Sub Total</th>
                        <th>Total</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                        <tr>
                            <td className="fw-bold fs-1">{key + 1}</td>
                            <td>{item._id}</td>
                            <td>{dateFormater(item.createdAt)}</td>
                            <td>Rs. {item.subTotal}</td>
                            <td>Rs. {item.grandTotal}</td>
                            <td>{item.status === 'pending' ? <span className="text-danger">pending</span> : <span className="text-success">completed</span>}</td>
                        </tr>
                        <tr><td className="text-warning">Details are below</td></tr>
                        <tr>
                            <th></th>
                            <th>Product Name</th>
                            <th>Unit Price</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                        </tr>
                        
                                {orderItems && orderItems.map((i, k) => {
                                    if(item._id === i.orderID)
                                    return(
                                        <tr key={k}>
                                            <td></td>
                                            <td>{i.productName}</td>
                                            <td>{i.price}</td>
                                            <td>{i.quantity}</td>
                                            <td>{i.price * i.quantity}</td>
                                        </tr>
                                    )
                                    else return null
                                })}
                        <br></br>
                                    <br />
                </tbody>
                    </Fragment>)}
                )}
            </Table>
           <Pagination itemsPerPage = {ordersPerPage} totalItems = {orders.length} paginate = {paginate}/>
            </div>)}
        </div>
    )
}

export default CustomerOrder
