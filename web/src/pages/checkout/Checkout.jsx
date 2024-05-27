import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import serverURL from "../../config/configFile"
import './Checkout.css'
import { useAuth } from '../../context/AuthContext';
import useFetch from "../../custom hooks/useFetch";
import Button from 'react-bootstrap/Button'

const Checkout = () => {

    const navigate = useNavigate()
    const {customer} = useAuth()
    const cartUrl = `cart/getList/${customer.id}`
    const customerUrl = `customer/getById/${customer.id}`
    const [emailBody, setEmailBody] = useState('')
    const emailData = {to: customer.email, subject : `Confirm Order`, body :emailBody}
    const { data: cartData, error: cartError, loading: cartLoading} = useFetch(cartUrl)
    const { data : customerData, error : customerError, loading : customerLoading} = useFetch(customerUrl)
    const [cart, setCart] = useState([])
    const [customerDetails, setCustomerDetails] = useState({name:'', email: '', houseNumber: ''})
    const [orderSummary, setOrderSummary] = useState({})
    const [paymentMethod, setPaymentMethod] = useState('cash on delivery');
    const paymentMethods = ['cash on delivery', 'card on delivery (not available)', 'card (not available)', 'easy paisa (not available)'];
    const handlePaymentChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const sendEmail = () => {
        try {
            fetch(serverURL + "email/send-email",
            {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(emailData),
                credentials: 'include'
            })
            .then((response) => response.json())
            .then(response => {
                console.log(`email has been sent successfully`)
            })
      .catch(err => console.log(err));
        } catch (error) {
            console.log(error)
        }
    }
    const handleConfirmOrder = () => {
        console.log('in confirm order')
        try {
            fetch(serverURL + "order/add",
            {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({customer,orderSummary, cart}),
                credentials: 'include'
            })
            .then((response) => response.json())
            .then(response => {
                sendEmail(emailData)
                navigate('/success')
            })
      .catch(err => console.log(err));
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if(cartData)
            setCart(cartData.cart)
        if(customerData)
            setCustomerDetails(customerData.customer)
  
    }, [cartData, customerData])
    useEffect(() => {
        if (cart.length > 0) {
            const subTotal = cart.reduce((acc, current) => acc + (current.productID.price *  current.quantity), 0)
            const tax = (subTotal * 5)/100
            const shippingCharges = 200
            const grandTotal = subTotal + tax + shippingCharges

        setOrderSummary({subTotal, tax, shippingCharges, grandTotal, paymentMethod: 'cash on delivery'})
        const emailtext = `Dear ${customer.name}, \nyour order has been placed. Details are given below: 
        \nSub total: ${subTotal} \n Tax : ${tax} \n Shipping Charges : ${shippingCharges} \n Grand Total : ${grandTotal}`
        setEmailBody(emailtext);
        }
    }, [cart, paymentMethod, customer.name]);
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCustomerDetails((prevCustomer) => ({
            ...prevCustomer,
            [name]: value,
        }));
        console.log(customer)
    };

    if (cartLoading || customerLoading ) return <div className="mt-4 fw-bold fs-1">Loading...</div>;
    if (cartError || customerError ) return <div className="mt-4 fw-bold fs-3">Error fetching data</div>;

    return(
        <div className="checkout-page">
            <div className="section personal-info">
                <h2>Personal Info</h2>
                <p>{customerDetails.name}</p>
                <p>{customerDetails.email}</p>
                <p>{customerDetails.phone}</p>
            </div>
            <div className="section shipping-address">
                <h2>Shipping Address</h2>
                <p><input className="shipping me-2" type="text" placeholder="house number" name="houseNumber" value={customerDetails.houseNumber ? customerDetails.houseNumber : ''} onChange={handleInputChange}/>
                <input className="shipping" type="text" name="street" placeholder="street" value={customerDetails.street ? customerDetails.street : ''} onChange={handleInputChange}/></p>
                <p><input className="shipping me-2" type="text" name="city" placeholder="city" value={customerDetails.city ? customerDetails.city : ''} onChange={handleInputChange}/>
                <input className="shipping me-2" type="text" name="country" placeholder="country" value={customerDetails.country ? customerDetails.country : ''} onChange={handleInputChange}/>
                <input className="shipping" type="text" name="postalCode" placeholder="postal code" value={customerDetails.postalCode ? customerDetails.postalCode : ''} onChange={handleInputChange}/></p>
            </div>
            <div className="section order-items">
                <h2>Order Items</h2>
                <ul className="d-flex justify-content-evenly">
                    {cart && cart.length > 0 ? cart.map((item, key) => {
                        return(
                            <li key={key}>
                            <li>{(item.productID.image !== '' && item.productID.image != null) ? <img src={serverURL + '/uploads/products/' + item.productID.image} alt='' width={50} height={50} /> : ''}</li>

                                <br/>
                                Quantity: {item.quantity}
                                <br/>
                                {item.productID.name} <br></br>Rs. {item.quantity * item.productID.price}
                            </li>
                        )
                    }) : <p>Your cart is empty</p>}
                </ul>
                <p>Note : Products marked as <b>NOT AVAILABLE</b> may or may not be delivered depending on the availibility at the time of delivery</p>
            </div>
            <div className="section payment-method">
                <h2>Payment Method</h2>
                <select value={paymentMethod} onChange={handlePaymentChange} className="pay-meth py-2">
                {paymentMethods.map((method) => (
                    <option key={method} value={method} disabled={method !== 'cash on delivery'}>{method}</option>
                ))}
                </select>
            </div>   
            <div className="section order-summary">
                <h2>Order Summary</h2>
                <p><span>Sub Total : </span> Rs. {orderSummary.subTotal}</p>
                <p><span>Tax : </span> Rs. {orderSummary.tax}</p>
                <p><span>Shipping Charges : </span> Rs. {orderSummary.shippingCharges}</p>
                <p><b><span>Grand Total : </span> Rs. {orderSummary.grandTotal}</b></p>
                <p>Estimated Delivery: 3-5 business days</p>
            </div>
            <div className="m-auto">
            <Button onClick={() => handleConfirmOrder()} className="btn-warning col-md-4 back-to-cart me-3">Confirm Order</Button>
            <Button className="back-to-cart btn-dark">
                <Link to='/cart'className="link-back" >back to cart</Link>
            </Button>

            </div>
        </div>
    )
}

export default Checkout