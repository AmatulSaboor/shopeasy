import { useState, useEffect } from "react"
import CustomerProductCard from '../../components/customerProductCard/CustomerProductCard'
import serverURL from "../../config/configFile"
import { useNavigate } from "react-router-dom"
import Pagination from "../../components/pagination/Pagination"

const CustomerProductDisplay = ({loggedInCustomerId, setLoggedInCustomerId, setLoggedInCustomerEmail, setLoggedInCustomerName}) => {
    const [productsList, setProductsList] = useState([])
    const [wishList, setWishList] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 2;
    const [searchQuery, setSearchQuery] = useState('')
    const navigate = useNavigate()
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProductsList = productsList
        .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice(indexOfFirstProduct,indexOfLastProduct);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // handlers
    const handleSearch = (e) => {
        setSearchQuery(e.target.value)
    }

    const handleAddWishList = () => {
        
    }
    const getProducts = () => {
        try{
            fetch(serverURL + `product/getList`)
            .then(response => {
                return response.json()})
            .then(data => {
                setProductsList(data.productsList)
                // console.log(productsList)
            })
            .catch(e => console.error(e))
        }catch(e){
            console.error(e)
        }
    }

    // const getWishlist = () => {
        // try{
        //     fetch(serverURL + `wishlist/getList/${loggedInCustomerId}`)
        //     .then(response => response.json())
        //     .then(data => {
        //         // console.log(data)
        //         setWishList(data.wishList)
        //     })
        //     .catch(e => console.error(e))
        // }catch(e){
        //     console.error(e)
        // }
        // }
        
        
    const isInWishlist = (productId) => {
        return wishList.some(item => { 
            console.log(item.productID); 
            return item.productID === productId});
    };
    useEffect(() => {
        fetch(serverURL + 'auth/session', {
            credentials : 'include'
        })
        .then(res => res.json())
        .then(res => {
            if(!res.isAuthenticated)
                return navigate('./login')
            else{
                setLoggedInCustomerId(res.id)
                setLoggedInCustomerEmail(res.email)
                setLoggedInCustomerName(res.username)
                getProducts()
                // getWishlist()
                try{
                    fetch(serverURL + `wishlist/getList/${loggedInCustomerId}`)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data.wishList)
                        setWishList(data.wishList)
                    })
                    .catch(e => console.error(e))
                }catch(e){
                    console.error(e)
                }
            }
        })
        .catch(err => console.log(err))
    }, [navigate, loggedInCustomerId, setLoggedInCustomerId, setLoggedInCustomerName, setLoggedInCustomerEmail])
    
    return(
        <>
            <div>
                <label htmlFor='search'>search : </label>
                <input type='text' id='search' onChange={handleSearch} />
            </div>
            <div>
                {currentProductsList && currentProductsList.map((product, key) => {
                    return(
                        <CustomerProductCard key={key} product={product} isInWishlist={isInWishlist} loggedInCustomerId={loggedInCustomerId}/>
                    )
                })}
            </div>
            <Pagination productsPerPage = {productsPerPage} totalProducts = {productsList.length} paginate = {paginate}/>
        </>
    )
}

export default CustomerProductDisplay