import CustomerProductCard from '../../components/customerProductCard/CustomerProductCard'
import Pagination from "../../components/pagination/Pagination"
import { useAuth } from "../../context/AuthContext"
import useFetch from "../../custom hooks/useFetch"
import { useState, useEffect } from "react"
import Form from 'react-bootstrap/Form'


const CustomerProducts = () => {
    const [productsList, setProductsList] = useState([])
    const {customer} = useAuth()
    const cartUrl = `cart/getList/${customer.id}`
    const wishlistUrl = `wishlist/getList/${customer.id}`
    const productUrl = `product/getList`
    const { data: cartData, error: cartError, loading: cartLoading} = useFetch(cartUrl)
    const { data : wishlistData, error : wishlistError, loading : wishlistLoading} = useFetch(wishlistUrl)
    const { data : productData, error : productError, loading : productLoading} = useFetch(productUrl)
    const [wishList, setWishList] = useState([])
    const [cart, setCart] = useState([])

    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;
    const [searchQuery, setSearchQuery] = useState('')
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProductsList = productsList
        .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice(indexOfFirstProduct,indexOfLastProduct);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // handlers for add/remove from cart/wishlist
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
        setWishList(wishList.filter(i => i.productID._id !== removedEntry))
    }
    const handleRemoveCT = (removedEntry) => {
        setCart(cart.filter(i => i.productID._id !== removedEntry))
    }

    // check if the item is already in cart/wishlist
    const isInWishlist = (productId) => {
        return wishList.some(item => { 
            return item.productID._id === productId});
    };
    const isInCart = (productId) => {
        return cart.some(item => { 
            return item.productID._id === productId});
    };
            
    useEffect(() => {
        if(cartData)
            setCart(cartData.cart)
        if(wishlistData)
            setWishList(wishlistData.wishlist)  
        if(productData)
            setProductsList(productData.productsList)
    }, [cartData, wishlistData, productData])

    if (cartLoading || wishlistLoading || productLoading) return <div className="mt-4 fw-bold fs-1">Loading...</div>;
    if (cartError || wishlistError || productError) return <div className="mt-4 fw-bold fs-3">Error fetching data</div>;

    // RETURN JSX
    return(
        <>
            <h4 className="mt-4 mb-4">Products List</h4>
            <div className="d-flex justify-content-center">
                <Form className="d-flex justify-content-center col-md-3">
                    <Form.Control
                        type="search"
                        placeholder="Search by name"
                        className="me-2"
                        aria-label="Search"
                        onChange={handleSearch}
                    />
                </Form>
            </div>
            <div className="row d-flex justify-content-center">
                {currentProductsList.length === 0 ? (<div className="mt-4">We don't have any product yet! Please bear with us</div>) :( currentProductsList.map((product, key) => {
                    return(
                        <CustomerProductCard key={key} 
                            product={product}
                            customerID={customer.id} 
                            isInCart={isInCart} 
                            isInWishlist={isInWishlist} 
                            handleAddWishlistEntry={handleUpdateWishList} 
                            handleDeleteWL={handleRemoveWL} 
                            handleAddCartEntry={handleUpdateCart} 
                            handleDeleteCT={handleRemoveCT} />     
                        )}
                    ))
                }
            </div>
            <Pagination itemsPerPage = {productsPerPage} totalItems = {productsList.length} paginate = {paginate}/>
        </>
    )
}

export default CustomerProducts