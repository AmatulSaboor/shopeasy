import { useAuth } from '../../context/AuthContext';

const Cart = () => {
    
    const {user} = useAuth();
    console.log(user)
    return(
        <>
            in test
        </>
    )
}

export default Cart