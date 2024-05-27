import { useEffect, useState } from "react"
import serverURL from "../../config/configFile"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import useFetch from "../../custom hooks/useFetch"
import Pagination from "../../components/pagination/Pagination"
import dateFormater from "../../utils/dateFormater"
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Cart from '../../assets/cart.png'
import Form from 'react-bootstrap/Form'

const Wishlist = () => {
    
    const { customer } = useAuth()
    const url = `wishlist/getList/${customer.id}`;
    const { data, error, loading} = useFetch(url)
    const [wishlist, setWishlist] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const [searchQuery, setSearchQuery] = useState("");
    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1)
    }
    const currentWishlist = wishlist
        .filter(item => item.productID.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice(indexOfFirstProduct,indexOfLastProduct);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleRemoveProductFromWishlist = (item) => {
        try {
            console.log(item)
            fetch(serverURL + `wishlist/removeOne/${item.productID._id}/${customer.id}`,
            {
              mode: 'cors',
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json' 
              },
              credentials: 'include'
            })
            .then(res => res.json())
            .then(res => {
              console.log(res)
              setWishlist(wishlist.filter(i => i.productID._id !== item.productID._id))
                setCurrentPage(1)
            })
            .catch(e => console.log(e))
          } catch (error) {
            console.log(error)
          }
    }
    const handleAddToCart = (item) => {
        try {
            console.log(item)
            fetch(serverURL + `cart/add`,
            {
              mode: 'cors',
              method: 'POST',
              headers: {
                'Content-Type': 'application/json' 
              },
              body:JSON.stringify({productID: item.productID._id, customerID : customer.id}),
              credentials: 'include'
            })
            .then(res => res.json())
            .then(res => {
              console.log(res)
              setWishlist(wishlist.filter(i => i.productID._id !== item.productID._id))
            })
            .catch(e => console.log(e))
          } catch (error) {
            console.log(error)
          }
          handleRemoveProductFromWishlist(item)
    }
    useEffect(() => {
        if(data)
            setWishlist(data.wishlist)
    }, [data])


    if (loading) return <div className="mt-4 fw-bold fs-1">Loading...</div>;
    if (error) return <div className="mt-4 fw-bold fs-3">Error: {error.message}</div>;

    return(
      <>
      <h4 className="mt-4 mb-4">My Wishlist</h4>
      <div className="d-flex justify-content-center">
                 <Form className="d-flex justify-content-center col-md-3">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    onChange={handleSearch}
                  />
                  {/* <Button variant="outline-success" className="bg-warning">Search</Button> */}
                </Form>
            </div>
            {currentWishlist.length === 0 ? (<div className="mt-4">You don't have anything in your wishlist</div>) : (
        <div className="container mt-4">
        <Table striped bordered hover>
          <thead>
            <tr>
            <th></th>
               <th>Name</th>
               <th>Price</th>
               <th>In stock</th>
               <th>Availability</th>
               <th>Added On</th>
               <th></th>
               <th></th>
            </tr>
          </thead>
          <tbody>
          {currentWishlist && currentWishlist.map((item,key)=> {
              return (
                <tr key={key}>
                  <td>{(item.productID.image !== '' && item.productID.image != null) ? <img src={serverURL + '/uploads/products/' + item.productID.image} alt='' width={50} height={50} /> : ''}</td>
                  <td>{item.productID.name}</td>
                  <td>Rs. {item.productID.price}</td>
                  <td>{item.productID.quantity - item.productID.sold}</td>
                  <td>{item.productID.isAvailable ? <span className="text-success fw-bold">Available</span>: <span className="text-danger fw-bold">Not Available</span>  }</td>
                  <td>{dateFormater(item.productID.createdAt)}</td>
                  <td><Button onClick={() => handleRemoveProductFromWishlist(item)} className="bg-danger">remove</Button></td>
                  <td><Button onClick={() => handleAddToCart(item)} className="bg-warning text-dark"><img src={Cart} className="me-2" alt=""/></Button></td>
                </tr>
              )
          })}
           
          </tbody>
          </Table>
          <Pagination productsPerPage = {productsPerPage} totalProducts = {wishlist.length} paginate = {paginate}/>
          </div>)}
        </>
        // <>
        //     <div>
        //         <label htmlFor="search" >search :</label>
        //         <input type="text" id="search" onChange={handleSearch} />
        //     </div>
        //     {currentWishlist.length === 0 ? (<div>no data available </div>) : (
        //     <>
        //     <table>
        //         <thead>
        //             <tr>
        //                 <th></th>
        //                 <th>Name</th>
        //                 <th>Price</th>
        //                 <th>In stock</th>
        //                 <th>Available</th>
        //                 <th>Added On</th>
        //                 <th></th>
        //                 <th></th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {currentWishlist && currentWishlist.map((item, key) => {
        //                 return(
        //                       <tr key={key}>
        //                         <td><img src={serverURL + '/uploads/products/' + item.productID.image} alt="not available" width={50} height={50} /></td>
        //                         <td>{item.productID.name}</td>
        //                         <td>Rs. {item.productID.price}</td>
        //                         <td>{item.productID.quantity - item.productID.sold}</td>
        //                         <td>{item.productID.isAvailable ? 'Available' : 'Not available'  }</td>
        //                         <td>{dateFormater(item.productID.createdAt)}</td>
        //                         <td><button onClick={() => handleRemoveProductFromWishlist(item)}>delete</button></td>
        //                         <td><button onClick={() => handleAddToCart(item)}>add to cart</button></td>
        //                       </tr>)
        //                 })}
        //         </tbody>
        //     </table>
        //     <Pagination productsPerPage = {productsPerPage} totalProducts = {wishlist.length} paginate = {paginate}/></>)}
        //     <Link to='/'>Go back</Link>
        // </>
    )
}

export default Wishlist