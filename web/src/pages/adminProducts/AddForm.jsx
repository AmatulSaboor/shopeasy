import serverURL from "../../config/configFile";
import { Form, Button } from "react-bootstrap";
import {useEffect, useState} from 'react';
import useFetch from "../../custom hooks/useFetch";
const AddForm = ({handleClose, handleCreate}) => {
   const [name, setName] = useState('');
   const [price, setPrice] = useState('');
   const [quantity, setQunatity] = useState('');
   const [description, setDescription] = useState('');
   const [isAvailable, setIsAvailable] = useState(true);
   const [category, setCategory] = useState('');
   const [categoriesList, setCategoriesList] = useState([]);
   const [image, setImage] = useState('');
   const url = `category/getList`
   const {data, error, loading} = useFetch(url)
   function validateField(value, fieldName) {
      if (!value || value.trim() === '') {
          alert(fieldName + ' is required');
          return false;
      }
      return true;
  }
   // fetching data on submit
   const handleSubmit = (e) => {
      // console.log('inside form submit', price, image, category)
      const formData = new FormData();
      const fields = { name, price, category, image, quantity, description, isAvailable };
      Object.entries(fields).forEach(([key, value]) => formData.append(key, value));

      e.preventDefault();
      if (!validateField(name, 'Name')) return;
      if (!validateField(price, 'Price')) return;
      if (!validateField(quantity, 'Quantity')) return;
      if (!validateField(category, 'Category')) return;

      fetch(serverURL + "product/add",
      {
         mode: 'cors',
         method: 'POST',
         body: formData,
         credentials: 'include'
      })
      .then((response) => response.json())
      .then(response => {
         handleCreate(response.createdProduct);
         handleClose();
      })
      .catch(err => console.log(err));
   }

   useEffect(() => {
      if (data)
         setCategoriesList(data.categories)
   }, [data])

   if(loading) return <div>Loading...</div>
   if(error) return <div>{error}</div>
   return (
   <Form encType="multipart/form-data" onSubmit={handleSubmit}>
      {/* {validationError && <div className='validationError m-4'>{validationError}</div>} */}  
      <Form.Group>
         <div>
            <label className="form-label">Name: <span className="mandatory"> *</span></label>
            <Form.Control
             className="select-form"
               type="text"
               placeholder="name"
               name="name"
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
               onChange = { (e) => setPrice(e.target.value)}
               min="0"
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
               onChange = { (e) => setQunatity(e.target.value)}
               min="0"
            />
         </div>
      </Form.Group>
      <Form.Group>
      <div>
         <label className="form-label">
            Category : <span className="mandatory"> *</span>
         </label>
         <select
            className="select-form"
            value={category}
            name="category"
            onChange={(e) => setCategory(e.target.value)}
         >
            <option value="" disabled>
            select
            </option>
            {categoriesList.map((category, key) => (
            <option key={key} value={category._id}>
               {category.name}
            </option>
            ))}
         </select>
      </div>
      </Form.Group>
      <Form.Group>
         <div>
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
               onChange = { (e) => setDescription(e.target.value)}
            />
         </div>
      </Form.Group>
      <div className="col-md-12 mt-2">
      <Button variant="warning" type="submit" className="w-100">Add</Button>
      </div>
   </Form>
   )
}
export default AddForm;