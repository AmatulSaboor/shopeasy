import { useEffect, useState } from "react"
import serverURL from "../../config/configFile"
import { useNavigate } from "react-router-dom"
import { Pagination } from "react-bootstrap"

const Cart = ({loggedInCustomerId, setLoggedInCustomerId, setLoggedInCustomerEmail, setLoggedInCustomerName}) => {

    const navigate = useNavigate()
    const [cart, setCart] = useState([])
    const [currentCart, setCurrentCart] = useState([])
    useEffect(() => {
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
            }
        })
        .catch(err => console.log(err))
    }, [navigate, setLoggedInCustomerId, setLoggedInCustomerName, setLoggedInCustomerEmail])

    useEffect(() => {
        try{
            console.log(loggedInCustomerId)
            fetch(serverURL + `cart/getList/${loggedInCustomerId}`)
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                setCart(data.cart)
            })
            .catch(e => console.error(e))
        }catch(e){
            console.error(e)
        }
    }, [loggedInCustomerId])

    return(
        <>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        {/* <th></th>
                        <th></th>
                        <th></th> */}
                    </tr>
                </thead>
                <tbody>
                    {cart && cart.map((item, key) => {
                        return(
                              <tr key={key}>
                                <th>{item.customerID}</th>
                                <th>{item.productID}</th>
                              </tr>)
                        })}
                </tbody>
            </table>
        </>
    )
}

export default Cart