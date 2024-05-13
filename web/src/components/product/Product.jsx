import { useEffect, useState } from "react"
import serverURL from '../../config/configFile'
import {Link} from 'react-router-dom'

let Product = () => {
    const [productsList, setProductsList] = useState([])
    
    // get products
    const getProducts = () => {
        try{
            fetch(serverURL + `getProductsList`)
            .then(response => {
                // if (!response.ok) throw new Error('Network response was not ok');
                return response.json()})
            .then(data => {
                setProductsList(data);console.log(productsList);})
            .catch(e => console.log(e))
        }catch(e){
            console.error(e)
        }
    }

    // on component render
    useEffect(() => {
        getProducts()
    }, [])
    return(
        <>  
        
            <Link to='/addProduct'>Add a product</Link>
            {productsList.length > 0 ? productsList.map((item, key) => {
                return(
                    <>
                        <p key={key}>{item.name}</p>
                    </>
                )
            }):
            <p>No product is available</p>
            }
        </>
    )
}

export default Product