
import { Form, Button } from "react-bootstrap";
import { useState } from 'react';
import serverURL from "../../config/configFile";

const EditForm = ({item, handleEdit, handleClose}) => {
      const [name, setName] = useState(item.name);
      const [price, setPrice] = useState(item.price);

   const handleSubmit = (e) => {
      e.preventDefault();
        fetch(serverURL + "product/update",
        {
        mode: 'cors',
        method: 'PUT',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({ _id:item._id, name, price}),
        //   credentials: 'include'
        })
        .then((response) => response.json())
        .then(response => {
            handleEdit({_id: item._id, name, price});
            handleClose();
        })
        .catch(err => console.log(err));
   }

   return (
      <Form onSubmit={handleSubmit}>
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
         <Button variant="success" type="submit">Edit</Button>
      </Form>
      )
   }

export default EditForm;
