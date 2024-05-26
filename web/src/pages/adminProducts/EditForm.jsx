
import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from 'react';
import serverURL from "../../config/configFile";
import useFetch from "../../custom hooks/useFetch";
const EditForm = ({item, handleEdit, handleClose}) => {
      console.log(`in edit from`, item)
      const [name, setName] = useState(item.name);
      const [price, setPrice] = useState(item.price);
      const [quantity, setQunatity] = useState(item.quantity);
      const [description, setDescription] = useState(item.description);
      const [isAvailable, setIsAvailable] = useState(item.isAvailable);
      const [category, setCategory] = useState(item.category._id);
      const [image, setImage] = useState('')
      const [categoriesList, setCategoriesList] = useState([]);
      const url = `category/getList`
      const {data, error, loading} = useFetch(url)
      const formData = new FormData();
      const fields = { _id : item._id ,name, price, image, category, quantity, isAvailable, description };
      Object.entries(fields).forEach(([key, value]) => formData.append(key, value));
      const handleSubmit =  (e) => {
         e.preventDefault();
         console.log('in handle edit submit')
         fetch(serverURL + "product/update",
         {
            mode : 'cors',
            method : 'PUT',
            body : formData,
            credentials: 'include'
        })
        .then((response) => response.json())
        .then(response => {
         console.log('in handle edit ', response.updatedProduct)
            handleEdit(response.updatedProduct)
            handleClose();
        })
        .catch(err => console.log(err))
   }

   useEffect(() => {
     if(data)
      setCategoriesList(data.categories)
   }, [data])

   if(loading) return <div>Loading....</div>
   if(error) return <div>{error}</div>
   return (
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
         {/* {validationError && <div className='validationError m-4'>{validationError}</div>} */}  
         <Form.Group>
            <div>
               <label className="form-label">Name: <span className="mandatory"> *</span></label>
               <Form.Control
               className="select-form"
                  type="text"
                  placeholder="name"
                  name="name"
                  value={name}
                  onChange = { (e) => setName(e.target.value)}
                  />
            </div>
         </Form.Group>
         <Form.Group>
            <div>
               <label className="form-label">Price: <span className="mandatory"> *</span></label>
               <Form.Control
               className="select-form"
                  type="number"
                  placeholder="price"
                  name="price"
                  value={price}
                  onChange = { (e) => setPrice(e.target.value)}
                  />
            </div>
         </Form.Group>
         <Form.Group>
         <div>
            <label className="form-label">Qunatity: <span className="mandatory"> *</span></label>
            <Form.Control
             className="select-form"
               type="number"
               placeholder="quantity"
               name="quantity"
               value={quantity}
               onChange = { (e) => setQunatity(e.target.value)}
               min="0"
            />
         </div>
      </Form.Group>
         <Form.Group>
         <div>
            <label className="form-label">Category : <span className="mandatory"> *</span></label>
            <select
            className="select-form"
            name="category"
            value={category}
            onChange={e => setCategory(e.target.value)}
         >
         {console.log(`hi `, categoriesList)}
         {categoriesList && categoriesList.map((category, key) => (<option key={key} value={category._id}>{category.name}</option>))}
         </select>
         </div>
      </Form.Group>
         <img src={serverURL + `uploads/products/` + item.image} height={200} width={200} alt="not available" />
         <Form.Group>
            <div>
               <label className="form-label">Image: <span className="mandatory"> *</span></label>
               <Form.Control
               className="select-form"
                  type="file"
                  name="image"
                  onChange = { (e) => setImage(e.target.files[0])}
                  />
            </div>
         </Form.Group>
         <Form.Group>
      <div>
        {/* <label className="form-label">Is Available?</label> */}
        <Form.Check
          type="checkbox"
          label="Available"
          checked={isAvailable}
          onChange={e => setIsAvailable(e.target.checked)}
        />
      </div>
    </Form.Group>
      <Form.Group>
         <div>
            <label className="form-label">Description: </label>
            <Form.Control
             className="select-form"
               type="textarea"
               placeholder="description"
               name="description"
               value={description}
               onChange = { (e) => setDescription(e.target.value)}
            />
         </div>
      </Form.Group>
         <Button variant="success" type="submit">Edit</Button>
      </Form>
      )
   }

export default EditForm;
