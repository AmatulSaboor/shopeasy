import Pagination from "../../components/pagination/Pagination"
import dateFormater from "../../utils/dateFormater"
import { useAuth } from "../../context/AuthContext"
import useFetch from "../../custom hooks/useFetch"
import { useNavigate } from "react-router-dom"
import ADMIN_ROLE from '../../utils/constants'
import serverURL from "../../config/configFile"
import { useEffect, useState } from "react"
import Table from 'react-bootstrap/Table'
import { Button } from "react-bootstrap"
import React, { Fragment } from 'react'
import './AdminOrder.css'

const CustomerOrder = () => {
    const {customer} = useAuth()
    const orderUrl = `order/getList`
    const { data, error, loading} = useFetch(orderUrl)
    const navigate = useNavigate()
    const [orders, setOrders] = useState([])
    const [orderItems, setOrderItems] = useState([])

    // for pagination
    const [currentPage, setCurrentPage] = useState(1)
    const ordersPerPage = 3
    const indexOfLastOrder = currentPage * ordersPerPage
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
    const currentOrders = orders
        .slice(indexOfFirstOrder,indexOfLastOrder)
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    // order mark as completed function for front end
    const handleChangeOrderStatus = (completedOrder) => {
        setOrders(prevOrders => {
            const updatedOrders = prevOrders.filter(item => {
                if (item._id === completedOrder._id) {
                    Object.assign(item, completedOrder);
                }
                return true;
            });
            return updatedOrders;
        });
    };
    const handleMarkCompleted = (order) => {
        fetch(serverURL + `order/markCompleted/${order._id}`,
            {
                mode: 'cors',
                method: 'PUT',
                headers: { 'Content-Type':'application/json' },
                credentials: 'include',
            }
        )
        .then(response => response.json())
        .then(response => handleChangeOrderStatus(response.isMarkCompleted))
        .catch(e => console.log(e))
    }

    useEffect(() => {

        // only admin page
        if (customer.role !== ADMIN_ROLE) (navigate('/'))
        if(data){
            setOrders(data.orders)
            setOrderItems(data.orderItems)
        }
    },[data, customer.role, navigate])

    if(loading) return <div className="mt-4 fw-bold fs-1">Loading...</div>
    if(error) return <div className="mt-4 fw-bold fs-3">Error : {error}</div>

    // RETURN JSX
    return(
        <div>
            <h4 className="mt-4 mb-4">All Orders</h4>
            {currentOrders.length === 0 ? (<div className="mt-4">You have not ordered anything yet!!</div>
            ) : (
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
                                <td className="fw-bold fs-1">{(key + 1) + ((currentPage - 1)*ordersPerPage)}</td>
                                <td>{item._id}</td>
                                <td>{dateFormater(item.createdAt)}</td>
                                <td>Rs. {item.subTotal}</td>
                                <td>Rs. {item.grandTotal}</td>
                                <td>{item.status === 'in process' ? <span className="text-danger">{item.status}
                                    <Button className="bg-warning mx-4" onClick={() => handleMarkCompleted(item)}>mark completed</Button>
                                    </span> : <span className="text-success">{item.status}</span>}</td>
                            </tr>
                            <tr>
                                <td className="text-warning">Details are below</td>
                            </tr>
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
                                <tr><td colSpan="6" style={{ height: '40px' }}></td></tr>
                        </tbody>
                    </Fragment>)}
                )}
            </Table>
            <Pagination itemsPerPage = {ordersPerPage} totalItems = {orders.length} paginate = {paginate}/>
            </div>
            )}
        </div>
    )
}

export default CustomerOrder
