import Pagination from "../../components/pagination/Pagination"
import dateFormater from "../../utils/dateFormater"
import { useAuth } from "../../context/AuthContext"
import useFetch from "../../custom hooks/useFetch"
import { useEffect, useState } from "react"
import React, { Fragment } from 'react'
import Table from 'react-bootstrap/Table'
import './AdminOrder.css'
import { useNavigate } from "react-router-dom"
import ADMIN_ROLE from '../../utils/constants'

const CustomerOrder = () => {
    const {customer} = useAuth()
    const orderUrl = `order/getList`
    const { data, error, loading} = useFetch(orderUrl)
    const navigate = useNavigate()
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
if (customer.role !== ADMIN_ROLE) (navigate('/'))

        console.log(`data` ,data)
        if(data){
            setOrders(data.orders)
            setOrderItems(data.orderItems)
        }
    },[data, customer.role, navigate])

    if(loading) return <div className="mt-4 fw-bold fs-1">Loading...</div>
    if(error) return <div className="mt-4 fw-bold fs-3">Error : {error}</div>

    return(
        <div>
            <h4 className="mt-4 mb-4">All Orders</h4>
            {currentOrders.length === 0 ? (<div className="mt-4">You have not ordered anything yet!!</div>) : (
                <div className="container mt-4">
            <Table bordered hover>
                {/* <thead>
                    <tr>
                        <th>S. No.</th>
                        <th>Order Number</th>
                        <th>Order Date</th>
                        <th>Status</th>
                        <th>Sub Total</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody> */}
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
           <Pagination productsPerPage = {ordersPerPage} totalProducts = {orders.length} paginate = {paginate}/>
            
            </div>)}

        </div>
        // <div>
        //     <h4>My Orders</h4>
        //     {currentOrders.length === 0 ? (<div>no data available </div>) : (
        //     <><table>
        //         <thead>
        //             <tr>
        //                 <th>S. No. </th>
        //                 <th>Order Number</th>
        //                 <th>Order Date</th>
        //                 <th>Sub Total</th>
        //                 <th>Total</th>
        //                 <th>Status</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //         {}
        //         {currentOrders && currentOrders.map((item, key) => {
        //             return(
        //                 <Fragment key={key}><tr>
        //                     <td>{key + 1}</td>
        //                     <td>{item._id}</td>
        //                     <td>{dateFormater(item.createdAt)}</td>
        //                     <td>Rs. {item.subTotal}</td>
        //                     <td>Rs. {item.grandTotal}</td>
        //                     <td>{item.status ? 'pending' : 'completed' }</td>
        //                 </tr>
        //                 <tr>
        //                     <th>Product Name</th>
        //                     <th>Unit Price</th>
        //                     <th>Quantity</th>
        //                     <th>Total Price</th>
        //                 </tr>
                        
        //                         {orderItems && orderItems.map((i, k) => {
        //                             console.log(k, item._id, i.orderID)
        //                             if(item._id === i.orderID)
        //                             return(
        //                                 <tr key={k}>
        //                                     <td>{i.productName}</td>
        //                                     <td>Rs. {i.price}</td>
        //                                     <td>{i.quantity}</td>
        //                                     <td>Rs. {i.price * i.quantity}</td>
        //                                 </tr>
        //                             )
        //                             else return null
        //                         })}
        //             </Fragment>)}
        //         )}
        //         </tbody>
        //     </table>
        //     <Pagination productsPerPage = {ordersPerPage} totalProducts = {orders.length} paginate = {paginate}/>
        //     </>)}
        // </div>
    )
}

export default CustomerOrder
