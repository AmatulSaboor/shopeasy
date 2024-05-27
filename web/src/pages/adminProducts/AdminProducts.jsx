import { useEffect, useState } from "react"
import { Card } from "react-bootstrap"
import serverURL from '../../config/configFile'
import EditModal from "./EditModal"
import AddModal from "./AddModal"
import Pagination from '../../components/pagination/Pagination';
import { useNavigate } from "react-router-dom";
import useFetch from "../../custom hooks/useFetch"
import { useAuth } from "../../context/AuthContext"
import ADMIN_ROLE from "../../utils/constants"
import Form from 'react-bootstrap/Form'
import Parcel from '../../assets/parcel.png'

const AdminProducts = () => {
    const { customer } = useAuth()
    const url = `product/getList`
    const {data, error, loading} = useFetch(url)
    const [productsList, setProductsList] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate()

    const logout = () => {
        fetch(serverURL + `auth/logout`, {credentials : `include`})
        .then(res => res.json())
        .then(res => {if(res.logout) {
            navigate('/login')
        }})
        .catch( err => console.log(err))
    }
    // get current products
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = productsList
        .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice(indexOfFirstProduct,indexOfLastProduct);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    }
    const handleCreate = (product) => {
        const copyProdcuts = [...productsList];
        copyProdcuts.push(product);
        setProductsList(copyProdcuts)
    }

    const handleEdit = (editedItem) => {
        setProductsList(prevList => {
            const updatedList = prevList.filter(item => {
                if (item._id === editedItem._id) {
                    Object.assign(item, editedItem);
                }
                return true;
            });
            return updatedList;
        });
    };
    
    const handleDelete = (id)=>{
        fetch(serverURL + `product/delete/${id}`, {method:'DELETE'})
        .then( response => response.json())
        .then (response => {
                setProductsList(productsList.filter(i => i._id !== id));
            })
        .catch(e => console.log(e));
    }

    useEffect(() => {
    if (customer.role !== ADMIN_ROLE) (navigate('/'))

        // getProducts()
        if(data)
            setProductsList(data.productsList)
    }, [data, customer.role, navigate])


    if ( loading ) return <div className="mt-4 fw-bold fs-1">Loading...</div>;
    if ( error ) return <div className="mt-4 fw-bold fs-3">Error fetching data</div>;

    return(
    

<>  
<h4 className="mt-4 mb-4">All Products</h4>

            <AddModal handleCreate = {handleCreate}/>
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
            <div className="row">
                {currentProducts.length === 0 ? (<div className="mt-4">We don't have any product in the inventory!</div>) : ( currentProducts.map((item , key) => {
                    return (
                        <div key={key} className="col-md-3 d-flex justify-content-center">
                            <Card style={{ width: '18rem', margin: '10px' }}>
                                <Card.Body >
                                    <Card.Title>{item.category?.name}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{item.name}</Card.Subtitle>
                                    <Card.Text>Rs. {item.price}</Card.Text>
                                    <Card.Img variant="top" src={item.image ? serverURL + `uploads/products/` + item.image : Parcel} width={200} height={200} />
                                    <Card.Text>{item.description}</Card.Text>
                                    <Card.Text>Qty : {item.quantity}</Card.Text>
                                    <Card.Text>Sold: {item.sold}</Card.Text>
                                    
                                    <EditModal item={item} handleEdit={handleEdit} />
                                </Card.Body>
                            </Card>
                        </div>
                    )
                }))}  
            </div>

            <Pagination productsPerPage = {productsPerPage} totalProducts = {productsList.length} paginate = {paginate}/>
        </>
//         <>  
//             <AddModal handleCreate = {handleCreate}/>
//             <div>
//                 <label htmlFor="search" >search :</label>
//                 <input type="text" id="search" onChange={handleSearch} />
//             </div>
//             <div className="row">
//                 {currentProducts && currentProducts.map((item , key) => {
//                     return (
//                         <div key={key} className="col-md-3">
//                             <Card  style={{ width: '18rem', margin: '10px' }}>
//                                 <Card.Body >
//                                     <Card.Title>{item.category?.name}</Card.Title>
//                                     <Card.Subtitle className="mb-2 text-muted">{item.name}</Card.Subtitle>
//                                     <Card.Text>{item.quantity}</Card.Text>
//                                     <Card.Img variant="top" src={serverURL + `uploads/products/` + item.image} width={200} height={200} />
//                                     <Card.Text>{item.description}</Card.Text>
//                                     <Card.Text>Rs. {item.price}</Card.Text>
//                                     <Card.Text>Sold: {item.sold}</Card.Text>
//                                     <EditModal item={item} handleEdit={handleEdit} />
//                                     <button onClick={() => handleDelete(item._id)}>Delete</button>
//                                 </Card.Body>
//                             </Card>
//                         </div>
//                     )
//                 })}  
//             </div>

//             <Pagination productsPerPage = {productsPerPage} totalProducts = {productsList.length} paginate = {paginate}/>
//             <button onClick = {logout}>Log Out</button>
//         </>


    )
    // return(
    //     <>  
    //         <AddModal handleCreate = {handleCreate}/>
    //         <div>
    //             <label htmlFor="search" >search :</label>
    //             <input type="text" id="search" onChange={handleSearch} />
    //         </div>
    //         <Row>
    //             <Col sm={3}> 
    //             {currentProducts && currentProducts.map((item, key) => {
    //                 return(
    //                 <Card key={key} style={{ width: '18rem', margin: '10px' }}>
    //                     <Card.Body >
    //                         <Card.Title>{item.category?.name}</Card.Title>
    //                         <Card.Subtitle className="mb-2 text-muted">{item.name}</Card.Subtitle>
    //                         <Card.Text>{item.quantity}</Card.Text>
    //                         <Card.Img variant="top" src={serverURL + `uploads/products/` + item.image} width={200} height={200} />
    //                         <Card.Text>{item.description}</Card.Text>
    //                         <Card.Text>Rs. {item.price}</Card.Text>
    //                         <Card.Text>Sold: {item.sold}</Card.Text>
    //                         <EditModal item={item} handleEdit={handleEdit} />
    //                         <button onClick={() => handleDelete(item._id)}>Delete</button>
    //                     </Card.Body>
    //                 </Card>)})}
    //             </Col>
    //         </Row>
    //         <Pagination productsPerPage = {productsPerPage} totalProducts = {productsList.length} paginate = {paginate}/>
    //         <button onClick = {logout}>Log Out</button>
    //     </>
    // )
    
    
}

export default AdminProducts
