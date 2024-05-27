import { useEffect, useState } from "react"
import { useAuth } from "../../context/AuthContext"
import useFetch from "../../custom hooks/useFetch"
import Pagination from "../../components/pagination/Pagination"
import dateFormater from "../../utils/dateFormater"
import AddCategoryModal from "./AddCategoryModal"
import ADMIN_ROLE from "../../utils/constants"
import { useNavigate } from "react-router-dom"
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'


const Category = () => {

    const { customer } = useAuth()
    const navigate = useNavigate()
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

    const handleCreate = (category) => {
        const copyCategories = [...categories];
        copyCategories.push(category);
        setCategories(copyCategories)
    }
    useEffect(() => {
        if (customer.role !== ADMIN_ROLE) (navigate('/'))

        if(data)
            setCategories(data.categories)
    }, [data, customer.role, navigate])


    if (loading) return <div className="mt-4 fw-bold fs-1">Loading...</div>;
    if (error) return <div className="mt-4 fw-bold fs-3">Error: {error.message}</div>;

    return(
<>
<h4 className="mt-4 mb-4">Categories List</h4>
            <AddCategoryModal handleCreate = {handleCreate} />
<div className="d-flex justify-content-center ">
                 <Form className="d-flex justify-content-center col-md-3">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    onChange={handleSearch}
                  />
                </Form>
            </div>
            {currentCategories.length === 0 ? (<div className="mt-4">No categories have been added yet! </div>) : (
            <>
            <div className="mt-4 container">
            <Table striped bordered hover>
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
            </Table>

            </div>
            <Pagination itemsPerPage = {productsPerPage} totalItems = {categories.length} paginate = {paginate}/></>)}
        </>
    )
}

export default Category