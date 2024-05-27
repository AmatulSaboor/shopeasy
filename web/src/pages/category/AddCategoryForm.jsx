import serverURL from "../../config/configFile";
import { Form, Button } from "react-bootstrap";
import { useState} from 'react';
const AddCategoryForm = ({handleClose, handleCreate}) => {
   const [name, setName] = useState('');
  
   const handleSubmit = (e) => {

      if (!name || name == null || name === ''){
         alert('name is required')
         return}
      e.preventDefault();
      fetch(serverURL + "category/add",
      {
         mode: 'cors',
         method: 'POST',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify({name}),
         credentials: 'include'
      })
      .then((response) => response.json())
      .then(response => {
         handleCreate(response.newCategory);
         handleClose();
      })
      .catch(err => console.log(err));
   }

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
      <div className="col-md-12 mt-2">
      <Button variant="warning" type="submit" className="w-100">Add</Button>
      </div>
   </Form>
   )
}
export default AddCategoryForm;