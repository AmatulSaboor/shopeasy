import { useEffect, useState } from "react"
import serverURL from '../../config/configFile'
import EditModal from "./EditModal"
import AddModal from "./AddModal"

let Product = () => {
    const [productsList, setProductsList] = useState([])

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
        try{
            fetch(serverURL + `product/getList`)
            .then(response => {
                // if (!response.ok) throw new Error('Network response was not ok');
                return response.json()})
            .then(data => 
                setProductsList(data))
            .catch(e => console.error(e))
        }catch(e){
            console.error(e)
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    return(
        <>  
            <AddModal handleCreate = {handleCreate}/>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {productsList && productsList.map((item, key) => {
                    return(
                        <tr key={key}>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td><EditModal item={item} handleEdit={handleEdit} /></td>
                            <td><button onClick={() => handleDelete(item._id)}>Delete</button></td>
                        </tr>
                    )})}
                </tbody>
            </table>
        </>
    )
}

export default Product