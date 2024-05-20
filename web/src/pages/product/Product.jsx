import { useEffect, useState } from "react"
import { Card, Row, Col } from "react-bootstrap"
import serverURL from '../../config/configFile'
import EditModal from "./EditModal"
import AddModal from "./AddModal"
import Pagination from '../../components/pagination/Pagination';
import { useNavigate } from "react-router-dom";

const Product = ({setLoggedInCustomerEmail, setLoggedInCustomerName}) => {
    const [productsList, setProductsList] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 2;
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate()
    const logout = () => {
        fetch(serverURL + `auth/logout`, {credentials : `include`})
        .then(res => res.json())
        .then(res => {if(res.logout) {
            setLoggedInCustomerName(null)
            setLoggedInCustomerEmail(null)
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

    const handleSearchChange = (event) => {
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
    
    // const handleEdit = (item) => {
    //     console.log(item)
    //     setProductsList(productsList.filter( i => {
    //         if (i._id === item._id){
    //             console.log('i : ', i)
    //             console.log('item : ', item)
    //             i = item
    //         }
    //         return item;
    //     }))
    // }

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
                // if (!response.ok) throw new Error('Network response was not ok');
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
        fetch(serverURL + 'auth/session', {
            credentials: 'include'
        })
        .then((res => res.json()))
        .then(res => {console.log(res); 
            if(!res.isAuthenticated){
                return navigate('./login');
            }else{
                setLoggedInCustomerEmail(res.email)
                setLoggedInCustomerName(res.username)
                getProducts()
            }
        })
        .catch(err => {console.log(err);
        })
    }, [navigate, setLoggedInCustomerName, setLoggedInCustomerEmail])


    return(
        <>  
            <AddModal handleCreate = {handleCreate}/>
            <div>
                <label htmlFor="search" >search :</label>
                <input type="text" name="search" onChange={handleSearchChange} />
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
            <Pagination postsPerPage = {productsPerPage} totalPosts = {productsList.length} paginate = {paginate}/>
            <button onClick = {logout}>Log Out</button>
        </>
    )
}

export default Product
