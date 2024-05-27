import { useState, useEffect } from "react"
import CustomerProductCard from '../../components/customerProductCard/CustomerProductCard'
import { Link } from "react-router-dom"
import Pagination from "../../components/pagination/Pagination"
import { useAuth } from "../../context/AuthContext"
import useFetch from "../../custom hooks/useFetch"
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
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;
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
            // console.log('isincart', item.productID._id, productId)
            return item.productID._id === productId}
        );
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
                  {/* <Button variant="outline-success" className="bg-warning">Search</Button> */}
                </Form>
            </div>
            <div className="d-flex justify-content-center">
                {currentProductsList.length === 0 ? (<div className="mt-4">We don't have any product yet! Please bear with us</div>) :( currentProductsList.map((product, key) => {
                    return(
                        <CustomerProductCard key={key} 
                        product={product}
                        isInWishlist={isInWishlist} 
                        customerID={customer.id} 
                        handleUpdateWishList={handleUpdateWishList} 
                        handleRemoveWL={handleRemoveWL} 
                        isInCart={isInCart} 
                        handleUpdateCart={handleUpdateCart} 
                        handleRemoveCT={handleRemoveCT} />     
                    )
                }))}
            </div>
            <Pagination productsPerPage = {productsPerPage} totalProducts = {productsList.length} paginate = {paginate}/>
        </>
    )
}

export default CustomerProducts