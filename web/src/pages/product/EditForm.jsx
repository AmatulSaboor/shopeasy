
import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from 'react';
import serverURL from "../../config/configFile";

const EditForm = ({item, handleEdit, handleClose}) => {
      const [name, setName] = useState(item.name);
      const [price, setPrice] = useState(item.price);
      const [category, setCategory] = useState(item.category);
      const [image, setImage] = useState('')
      const [categoriesList, setCategoriesList] = useState([]);

      const formData = new FormData();
      const fields = { _id : item._id ,name, price, image, category };
      Object.entries(fields).forEach(([key, value]) => formData.append(key, value));
      const handleSubmit =  (e) => {
         e.preventDefault();
         console.log(image)
      // console.log(formData.entries)
         fetch(serverURL + "product/update",
         {
         mode : 'cors',
         method : 'PUT',
         body : formData,
         //   credentials: 'include'
        })
        .then((response) => response.json())
        .then(response => {
            handleEdit({_id: item._id, name, price, image});
            handleClose();
        })
        .catch(err => console.log(err));
   }

   useEffect(() => {
      fetch(serverURL + "category/getList")
      .then((response) => response.json())
      .then(response => {setCategoriesList(response);console.log(categoriesList)})
      .catch(err => console.log(err));
   }, [categoriesList])

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
                  required
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
                  required
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
            value={category._id}
         >
            <option value="" disabled>select</option>
            {categoriesList.map((category, key) => (<option key={key} value={category._id}>{category.name}</option>))}
         </select>
         </div>
      </Form.Group>
         <img src={serverURL + `uploads/` + item.image} height={200} width={200} alt="not available" />
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
         <Button variant="success" type="submit">Edit</Button>
      </Form>
      )
   }

export default EditForm;
