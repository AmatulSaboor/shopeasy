import { Form, Button } from "react-bootstrap";
import {useState} from 'react';
import serverURL from "../../config/configFile";

const AddForm = ({handleClose, handleCreate}) => {
   const [name, setName] = useState('');
   const [price, setPrice] = useState('');

   // fetching data on submit
   const handleSubmit = (e) => {
      e.preventDefault();
      fetch(serverURL + "product/add",
      {
         mode: 'cors',
         method: 'POST',
         headers: { 'Content-Type':'application/json' },
         body: JSON.stringify({ name, price}),
        //  credentials: 'include'
      })
      .then((response) => response.json())
      .then(response => {
         handleCreate({name, price});
         handleClose();
      })
      .catch(err => console.log(err));
   }

   return (
   <Form onSubmit={handleSubmit}>
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
               max="30"
            />
         </div>
      </Form.Group>
      <Button variant="success" type="submit">Add</Button>
   </Form>
   )
}
export default AddForm;