import { useEffect, useState } from "react"
import { Card, Row, Col } from "react-bootstrap"
import serverURL from '../../config/configFile'
import EditModal from "./EditModal"
import AddModal from "./AddModal"
import Pagination from '../../components/pagination/Pagination';
import { useNavigate } from "react-router-dom";
import useFetch from "../../custom hooks/useFetch"

const AdminProducts = () => {
    const url = `product/getList`
    const {data, error, loading} = useFetch(url)
    const [productsList, setProductsList] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 2;
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
    // get products
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

    useEffect(() => {
        // getProducts()
        if(data)
            setProductsList(data.productsList)
    }, [data])


    if ( loading ) return <div>Loading...</div>;
    if ( error ) return <div>Error fetching data</div>;
    return(
        <>  
            <AddModal handleCreate = {handleCreate}/>
            <div>
                <label htmlFor="search" >search :</label>
                <input type="text" id="search" onChange={handleSearch} />
            </div>
            <Row>
                <Col sm={3}> 
                {currentProducts && currentProducts.map((item, key) => {
                    return(
                    <Card key={key} style={{ width: '18rem', margin: '10px' }}>
                        <Card.Body >
                            <Card.Title>{item.category?.name}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{item.name}</Card.Subtitle>
                            <Card.Text>{item.quantity}</Card.Text>
                            <Card.Img variant="top" src={serverURL + `uploads/products/` + item.image} width={200} height={200} />
                            <Card.Text>{item.description}</Card.Text>
                            <Card.Text>Rs. {item.price}</Card.Text>
                            <Card.Text>Sold: {item.sold}</Card.Text>
                            <EditModal item={item} handleEdit={handleEdit} />
                            <button onClick={() => handleDelete(item._id)}>Delete</button>
                        </Card.Body>
                    </Card>)})}
                </Col>
            </Row>
            <Pagination productsPerPage = {productsPerPage} totalProducts = {productsList.length} paginate = {paginate}/>
            <button onClick = {logout}>Log Out</button>
        </>
    )
}

export default AdminProducts
