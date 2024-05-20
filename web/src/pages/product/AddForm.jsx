import serverURL from "../../config/configFile";
import { Form, Button } from "react-bootstrap";
import {useEffect, useState} from 'react';

const AddForm = ({handleClose, handleCreate}) => {
   const [name, setName] = useState('');
   const [price, setPrice] = useState('');
   const [category, setCategory] = useState('');
   const [categoriesList, setCategoriesList] = useState([]);
   const [image, setImage] = useState('');

   // fetching data on submit
   const handleSubmit = (e) => {
      console.log('inside form submit', price, image, category)
      const formData = new FormData();
      const fields = { name, price, category, image };
      Object.entries(fields).forEach(([key, value]) => formData.append(key, value));

      e.preventDefault();
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
      fetch(serverURL + "category/getList")
      .then((response) => response.json())
      .then(response => {setCategoriesList(response);console.log(categoriesList)})
      .catch(err => console.log(err));
   }, [])

   return (
   <Form encType="multipart/form-data" onSubmit={handleSubmit}>
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
               required
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
            onChange={e => setCategory(e.target.value)}
         >
            <option value="" disabled>select</option>
            {categoriesList.map((category, key) => (<option key={key} value={category._id}>{category.name}</option>))}
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
      <Button variant="success" type="submit">Add</Button>
   </Form>
   )
}
export default AddForm;