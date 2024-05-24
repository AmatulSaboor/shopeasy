import { useState, useEffect, useCallback } from "react"
import CustomerProductCard from '../../components/customerProductCard/CustomerProductCard'
import serverURL from "../../config/configFile"
import { Link } from "react-router-dom"
import Pagination from "../../components/pagination/Pagination"
import { useAuth } from "../../context/AuthContext"
import useFetch from "../../custom hooks/useFetch"


const CustomerProductDisplay = () => {
    const [productsList, setProductsList] = useState([])
    const {user} = useAuth()
    const cartUrl = `cart/getList/${user.id}`
    const wishlistUrl = `wishlist/getList/${user.id}`
    const productUrl = `product/getList`
    const { data: cartData, error: cartError, loading: cartLoading} = useFetch(cartUrl)
    const { data : wishlistData, error : wishlistError, loading : wishlistLoading} = useFetch(wishlistUrl)
    const { data : productData, error : productError, loading : productLoading} = useFetch(productUrl)
    const [wishList, setWishList] = useState([])
    const [cart, setCart] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 2;
    const [searchQuery, setSearchQuery] = useState('')
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
        console.log('isinaddwishlist', wishlistEntry)
        const copyWishlist = [...wishList];
        copyWishlist.push(wishlistEntry);
        setWishList(copyWishlist)
    }
    const handleUpdateCart = (cartEntry) => {
        console.log('isinaddcart', cartEntry)
        const copyCart = [...cart];
        copyCart.push(cartEntry);
        setCart(copyCart)
    }

    const handleRemoveWL = (removedEntry) => {
        console.log('isinremovewishlist', removedEntry)
        setWishList(wishList.filter(i => i.productID._id !== removedEntry))
    }
    const handleRemoveCT = (removedEntry) => {
        console.log('isinremovewcart', removedEntry)
        setCart(cart.filter(i => i.productID._id !== removedEntry))
    }
    const isInWishlist = (productId) => {
        return wishList.some(item => { 
            console.log('isinwishlist', item.productID._id, productId)
            return item.productID._id === productId});
        };
    const isInCart = (productId) => {
        return cart.some(item => { 
            console.log('isincart', item.productID._id, productId)
            return item.productID._id === productId}
        );
    };
    const getProducts = () => {
        try{
            fetch(serverURL + `product/getList`)
            .then(response => {
                return response.json()})
            .then(data => {
                setProductsList(data.productsList)
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
                console.log(data.cart)
                setCart(data.cart)
            })
            .catch(e => console.error(e))
        }catch(e){
            console.error(e)
        }
    },[user.id])
    
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
        if(cartData)
            setCart(cartData.cart)
        if(wishlistData)
            setWishList(wishlistData.wishList)  
        if(productData)
            setProductsList(productData.productsList)
        // getProducts()
        // getWishlist()
        // getCart()
    }, [cartData, wishlistData, productData])

    if (cartLoading || wishlistLoading || productLoading) return <div>Loading...</div>;
    if (cartError || wishlistError || productError) return <div>Error fetching data</div>;

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