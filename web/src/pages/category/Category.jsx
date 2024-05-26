import { useEffect, useState } from "react"
import serverURL from "../../config/configFile"
import { useAuth } from "../../context/AuthContext"
import useFetch from "../../custom hooks/useFetch"
import Pagination from "../../components/pagination/Pagination"
import dateFormater from "../../utilityFunctions/dateFormater"
import AddCategoryModal from "./AddCategoryModal"
const Category = () => {

    const { customer } = useAuth()
    const url = `category/getList`;
    const { data, error, loading} = useFetch(url)
    const [categories, setCategories] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const [searchQuery, setSearchQuery] = useState("");
    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1)
    }
    const currentCategories = categories
        .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice(indexOfFirstProduct,indexOfLastProduct);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // const handleAddToCart = (item) => {
    //     try {
    //         console.log(item)
    //         fetch(serverURL + `cart/add`,
    //         {
    //           mode: 'cors',
    //           method: 'POST',
    //           headers: {
    //             'Content-Type': 'application/json' 
    //           },
    //           body:JSON.stringify({productID: item.productID._id, customerID : customer.id}),
    //           credentials: 'include'
    //         })
    //         .then(res => res.json())
    //         .then(res => {
    //           console.log(res)
    //           setWishlist(wishlist.filter(i => i.productID._id !== item.productID._id))
    //         })
    //         .catch(e => console.log(e))
    //       } catch (error) {
    //         console.log(error)
    //       }
    // }

    const handleCreate = (category) => {
        const copyCategories = [...categories];
        copyCategories.push(category);
        setCategories(copyCategories)
    }
    useEffect(() => {
        if(data)
            setCategories(data.categories)
    }, [data])


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return(
<>
            <div>
                <label htmlFor="search" >search :</label>
                <input type="text" id="search" onChange={handleSearch} />
            </div>
            <AddCategoryModal handleCreate = {handleCreate} />
            {currentCategories.length === 0 ? (<div>no data available </div>) : (
            <>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Created On</th>
                    </tr>
                </thead>
                <tbody>
                    {currentCategories && currentCategories.map((item, key) => {
                        return(
                              <tr key={key}>
                                <td>{item.name}</td>
                                <td>{dateFormater(item.createdAt)}</td>
                              </tr>)
                        })}
                </tbody>
            </table>
            <Pagination productsPerPage = {productsPerPage} totalProducts = {categories.length} paginate = {paginate}/></>)}
        </>
    )
}

export default Category