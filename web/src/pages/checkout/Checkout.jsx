import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import serverURL from "../../config/configFile"
import './Checkout.css'
import { useAuth } from '../../context/AuthContext';
import useFetch from "../../custom hooks/useFetch";

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
        // getCart()
        // getCustomer()
    }, [cartData, customerData])
    useEffect(() => {
        if (cart.length > 0) {
            const subTotal = cart.reduce((acc, current) => acc + (current.productID.price *  current.quantity), 0)
            const tax = (subTotal * 5)/100
            const shippingCharges = 200
            const grandTotal = subTotal + tax + shippingCharges

        setOrderSummary({subTotal, tax, shippingCharges, grandTotal, paymentMethod: 'cash on delivery'})
        const emailtext = `Dear ${customer.name}, \nyour order has been placed. Details are given below: \nSub total: ${subTotal}`
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

    if (cartLoading || customerLoading ) return <div>Loading...</div>;
    if (cartError || customerError ) return <div>Error fetching data</div>;

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
                <p>House # <input type="text" name="houseNumber" value={customerDetails.houseNumber ? customerDetails.houseNumber : ''} onChange={handleInputChange}/>, 
                street {customerDetails.street} <input type="text" name="street" value={customerDetails.street ? customerDetails.street : ''} onChange={handleInputChange}/></p>
                <p><input type="text" name="city" placeholder="city" value={customerDetails.city ? customerDetails.city : ''} onChange={handleInputChange}/>
                <input type="text" name="country" placeholder="country" value={customerDetails.country ? customerDetails.country : ''} onChange={handleInputChange}/>
                <input type="text" name="postalCode" placeholder="postal code" value={customerDetails.postalCode ? customerDetails.postalCode : ''} onChange={handleInputChange}/></p>
                {/* <textarea name="description" TODO: add aditional comments section */}
            </div>
            <div className="section order-items">
                <h2>Order Items</h2>
                <ul>
                    {cart && cart.map((item, key) => {
                        return(
                            <li key={key}>
                                {item.quantity}
                                <img src={serverURL + '/uploads/products/' + item.productID.image} alt="not available" width={30} height={30} />
                                {item.productID.name} Rs. {item.quantity * item.productID.price}
                            </li>
                        )
                    })}
                </ul>
                <p>Note : Products marked as <b>NOT AVAILABLE</b> may or may not be delivered depending on the availibility at the time of delivery</p>
            </div>
            <div className="section payment-method">
                <h2>Payment Method</h2>
                <select value={paymentMethod} onChange={handlePaymentChange}>
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
            <Link to='/cart' >back to cart</Link>
            <button onClick={() => handleConfirmOrder()}>Confirm Order</button>
        </div>
    )
}

export default Checkout