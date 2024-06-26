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
import NotAvailable from '../../assets/notAvailable.jpg'

const AdminProducts = () => {
    const { customer } = useAuth()
    const url = `product/getList`
    const {data, error, loading} = useFetch(url)
    const [productsList, setProductsList] = useState([])
    const [searchQuery, setSearchQuery] = useState("");

    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;
    const navigate = useNavigate()
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = productsList
        .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice(indexOfFirstProduct,indexOfLastProduct);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // handlers
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

    useEffect(() => {
        // only admin page
        if (customer.role !== ADMIN_ROLE) (navigate('/'))
        if(data) 
            setProductsList(data.productsList)
        }, [data, customer.role, navigate])


    if ( loading ) return <div className="mt-4 fw-bold fs-1">Loading...</div>;
    if ( error ) return <div className="mt-4 fw-bold fs-3">Error fetching data</div>;

    // RETURN JSX
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
                </Form>
            </div>
            <div className="row">
                {currentProducts.length === 0 ? (<div className="mt-4">We don't have any product in the inventory!</div>
                ) : ( currentProducts.map((item , key) => {
                return (
                <div key={key} className="col-md-3 d-flex justify-content-center">
                    <Card style={{ width: '18rem', margin: '10px' }}>
                        <Card.Body >
                            <Card.Title>{item.category?.name}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{item.name}</Card.Subtitle>
                            <Card.Text>Rs. {item.price}</Card.Text>
                            <Card.Img variant="top" src={item.image ? serverURL + `uploads/products/` + item.image : NotAvailable} width={200} height={200} />
                            <Card.Text>{item.description}</Card.Text>
                            <Card.Text>Qty : {item.quantity}</Card.Text>
                            <Card.Text>Sold: {item.sold}</Card.Text>
                            
                            <EditModal item={item} handleEdit={handleEdit} />
                        </Card.Body>
                    </Card>
                </div>
            )}
            ))}  
            </div>
            <Pagination itemsPerPage = {productsPerPage} totalItems = {productsList.length} paginate = {paginate}/>
        </>
    ) 
}

export default AdminProducts
