import { useState, useEffect, useCallback } from "react"
import CustomerProductCard from '../../components/customerProductCard/CustomerProductCard'
import serverURL from "../../config/configFile"
import { Link, useNavigate } from "react-router-dom"
import Pagination from "../../components/pagination/Pagination"
import { useAuth } from "../../context/AuthContext"

const CustomerProductDisplay = () => {
    const [productsList, setProductsList] = useState([])
    const {user} = useAuth()
    const [wishList, setWishList] = useState([])
    const [cart, setCart] = useState([])
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

    const handleUpdateWishList = (wishlistEntry) => {
        const copyWishlist = [...wishList];
        copyWishlist.push(wishlistEntry);
        setWishList(copyWishlist)
    }
    const handleUpdateCart = (cartEntry) => {
        const copyCart = [...cart];
        copyCart.push(cartEntry);
        setCart(copyCart)
    }

    const handleRemoveWL = (removedEntry) => {
        setWishList(wishList.filter(i => i.productID !== removedEntry))
    }
    const handleRemoveCT = (removedEntry) => {
        setCart(wishList.filter(i => i.productID !== removedEntry))
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
    
    const getCart = useCallback(() => {
        try{
            fetch(serverURL + `cart/getList/${user.id}`)
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                setCart(data.cart)
            })
            .catch(e => console.error(e))
        }catch(e){
            console.error(e)
        }
    },[user.id])
    
    const isInWishlist = (productId) => {
        return wishList.some(item => { 
            // console.log(item.productID); 
            return item.productID === productId});
        };
    const isInCart = (productId) => {
        return cart.some(item => { 
            // console.log(item.productID); 
            return item.productID === productId}
        );
    };
    const getWishlist = useCallback(() => {
        try{
            fetch(serverURL + `wishlist/getList/${user.id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data.wishList)
                setWishList(data.wishList)
            })
            .catch(e => console.error(e))
        }catch(e){
            console.error(e)
        }
    },[user.id])
            
            useEffect(() => {      
                getProducts()
                getWishlist()
                getCart()
            }, [user.id, getWishlist, getCart])

    return(
        <>
            <button ><Link to='/cart'>Go to cart</Link></button>
            <div>
                <label htmlFor='search'>search : </label>
                <input type='text' id='search' onChange={handleSearch} />
            </div>
            <div>
                {currentProductsList && currentProductsList.map((product, key) => {
                    return(
                        <CustomerProductCard key={key} product={product} isInWishlist={isInWishlist} userID={user.id} handleUpdateWishList={handleUpdateWishList} handleRemoveWL={handleRemoveWL} isInCart={isInCart} handleUpdateCart={handleUpdateCart} handleRemoveCT={handleRemoveCT} />
                    )
                })}
            </div>
            <Pagination productsPerPage = {productsPerPage} totalProducts = {productsList.length} paginate = {paginate}/>
        </>
    )
}

export default CustomerProductDisplay