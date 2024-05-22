import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import serverURL from "../../config/configFile"
import './Checkout.css'

const Checkout = ({loggedInCustomerId, loggedInCustomerName, loggedInCustomerEmail, setLoggedInCustomerId, setLoggedInCustomerEmail, setLoggedInCustomerName}) => {

    const navigate = useNavigate()
    const [cart, setCart] = useState([])
    const [customer, setCustomer] = useState({})
    const [orderSummary, setOrderSummary] = useState({})
    const [paymentMethod, setPaymentMethod] = useState('cash on delivery');
    const paymentMethods = ['cash on delivery', 'card on delivery (not available)', 'card (not available)', 'easy paisa (not available)'];
    const handlePaymentChange = (e) => {
        setPaymentMethod(e.target.value);
    };
    const getCart = () => {
        try{
            // fetch(serverURL + `cart/getList/${loggedInCustomerId}`)
            fetch(serverURL + `cart/getList/664adb51dde187ee1c52523a`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setCart(data.cart)
            })
            .catch(e => console.error(e))
        }catch(e){
            console.error(e)
        }
    }

    const getCustomer = () => {
        try{
            // fetch(serverURL + `customer/getById/${loggedInCustomerId}`)
            fetch(serverURL + `customer/getById/664adb51dde187ee1c52523a`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setCustomer(data.customer)
            })
            .catch(e => console.error(e))
        }catch(e){
            console.error(e)
        }
    }

    const getOrderSummary = () => {
        const subTotal = cart.reduce((acc, current) => acc + current.productID.price, 0,)
        const tax = (subTotal * 5)/100
        const shippingCharges = 200
        const grandTotal = subTotal + tax + shippingCharges
        setOrderSummary({subTotal, tax, shippingCharges, grandTotal})
    }

    const handleConfirmOrder = () => {
        console.log('in confirm order')
    }
    useEffect(() => {
        try {
            fetch(serverURL + 'auth/session', {
                credentials : 'include'
            })
            .then(res => res.json())
            .then(res => {
                if(!res.isAuthenticated)
                    return navigate('/login')
                else{
                    setLoggedInCustomerId(res.id)
                    setLoggedInCustomerEmail(res.email)
                    setLoggedInCustomerName(res.username)
                    getCart()
                    getCustomer()
                    getOrderSummary()
                }
            }
        )
        } catch (error) {
            console.log(error)
        }
            }, [navigate, setLoggedInCustomerId, setLoggedInCustomerName, setLoggedInCustomerEmail])
    return(
            <div className="checkout-page">
            <div className="section personal-info">
                <h2>Personal Info</h2>
                <p>{customer.name}</p>
                <p>{customer.email}</p>
                <p>{customer.phone}</p>
            </div>
            <div className="section shipping-address">
                <h2>Shipping Address</h2>
                <p>House # {customer.houseNumber}, street {customer.street}</p>
                <p>{customer.city} {customer.country} {customer.postalCode}</p>
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
                <p><span><b>Grand Total : </b></span> Rs. {orderSummary.grandTotal}</p>
                <p>Estimated Delivery: 3-5 business days</p>
            </div>
            <Link to='/cart' >back to cart</Link>
            <button onClick={handleConfirmOrder}>Confirm Order</button>
        </div>
    )
}

export default Checkout