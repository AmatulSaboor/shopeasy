import { useEffect, useState } from "react"
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

    // get current posts
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    // const currentProducts = productsList.slice(indexOfFirstProduct,indexOfLastProduct);
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

    const handleEdit = (item) => {
        setProductsList(productsList.filter( i => {
            if (i._id === item._id){
                i.name = item.name;
                i.price = item.price;
            }
            return item;
        }))
    }

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
        // try{
        //     fetch(serverURL + `product/getList`)
        //     .then(response => {
        //         // if (!response.ok) throw new Error('Network response was not ok');
        //         return response.json()})
        //     .then(data => {
        //         setProductsList(data)
        //         // console.log(productsList)
        //     })
        //     .catch(e => console.error(e))
        // }catch(e){
        //     console.error(e)
        // }
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
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Image</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {currentProducts && currentProducts.map((item, key) => {
                    return(
                        <tr key={key}>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.category?.name}</td>
                            <td><img src={serverURL + `uploads/` + item.image} height={200} width={200} alt="not available" /></td>
                            <td><EditModal item={item} handleEdit={handleEdit} /></td>
                            <td><button onClick={() => handleDelete(item._id)}>Delete</button></td>
                        </tr>
                    )})}
                </tbody>
            </table>
            <Pagination postsPerPage = {productsPerPage} totalPosts = {productsList.length} paginate = {paginate}/>
        </>
    )
}

export default Product