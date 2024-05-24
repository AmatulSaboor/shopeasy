import { useCallback, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import serverURL from "../../config/configFile"
import './Checkout.css'
import { useAuth } from '../../context/AuthContext';
import useFetch from "../../custom hooks/useFetch";

const Checkout = () => {

    const navigate = useNavigate()
    const {user} = useAuth()
    const cartUrl = `cart/getList/${user.id}`
    const customerUrl = `customer/getById/${user.id}`
    const { data: cartData, error: cartError, loading: cartLoading} = useFetch(cartUrl)
    const { data : customerData, error : customerError, loading : customerLoading} = useFetch(customerUrl)
    const [cart, setCart] = useState([])
    const [customer, setCustomer] = useState({name:'', email: '', houseNumber: ''})
    const [orderSummary, setOrderSummary] = useState({})
    const [paymentMethod, setPaymentMethod] = useState('cash on delivery');
    const paymentMethods = ['cash on delivery', 'card on delivery (not available)', 'card (not available)', 'easy paisa (not available)'];
    const handlePaymentChange = (e) => {
        setPaymentMethod(e.target.value);
    };
    const getCart = useCallback(() => {
        try{
            fetch(serverURL + `cart/getList/${user.id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setCart(data.cart)
            })
            .catch(e => console.error(e))
        }catch(e){
            console.error(e)
        }
    }, [user.id])


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
                navigate('/success')
            })
      .catch(err => console.log(err));
        } catch (error) {
            console.log(error)
        }
    }

    const getCustomer = useCallback(() => {
        try{
            fetch(serverURL + `customer/getById/${user.id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setCustomer(data.customer)
            })
            .catch(e => console.error(e))
        }catch(e){
            console.error(e)
        }
    }, [user.id])
    useEffect(() => {
        if(cartData)
            setCart(cartData.cart)
        if(customerData)
            setCustomer(customerData.customer)
        // getCart()
        // getCustomer()
    }, [cartData, customerData])
    useEffect(() => {
        if (cart.length > 0) {
            const subTotal = cart.reduce((acc, current) => acc + current.productID.price *  current.productID.quantity, 0)
            const tax = (subTotal * 5)/100
            const shippingCharges = 200
            const grandTotal = subTotal + tax + shippingCharges

        setOrderSummary({subTotal, tax, shippingCharges, grandTotal, paymentMethod: 'cash on delivery'})
        }
    }, [cart, paymentMethod]);
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCustomer((prevCustomer) => ({
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
                <p>{customer.name}</p>
                <p>{customer.email}</p>
                <p>{customer.phone}</p>
            </div>
            <div className="section shipping-address">
                <h2>Shipping Address</h2>
                <p>House # <input type="text" name="houseNumber" value={customer.houseNumber ? customer.houseNumber : ''} onChange={handleInputChange}/>, 
                street {customer.street} <input type="text" name="street" value={customer.street ? customer.street : ''} onChange={handleInputChange}/></p>
                <p><input type="text" name="city" placeholder="city" value={customer.city ? customer.city : ''} onChange={handleInputChange}/>
                <input type="text" name="country" placeholder="country" value={customer.country ? customer.country : ''} onChange={handleInputChange}/>
                <input type="text" name="postalCode" placeholder="postal code" value={customer.postalCode ? customer.postalCode : ''} onChange={handleInputChange}/></p>
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