
import { Form, Button } from "react-bootstrap";
import { useState } from 'react';
import serverURL from "../../config/configFile";

const EditForm = ({item, handleEdit, handleClose}) => {
      const [name, setName] = useState(item.name);
      const [price, setPrice] = useState(item.price);
      const [image, setImage] = useState('')
      // const [tempimage, setTempimage] = useState('');

      const formData = new FormData();
      const fields = { _id : item._id ,name, price, image };
      Object.entries(fields).forEach(([key, value]) => formData.append(key, value));
      const handleSubmit =  (e) => {
         e.preventDefault();
         // console.log(tempimage)
         // if(tempimage) setImage(tempimage)
         console.log(image)
      // console.log(formData.entries)
         fetch(serverURL + "product/update",
         {
         mode : 'cors',
         method : 'PUT',
         body : formData,
         //   headers: { 'Content-Type':'application/json' },
         //   body: JSON.stringify({ _id:item._id, name, price}),
         //   credentials: 'include'
        })
        .then((response) => response.json())
        .then(response => {
            handleEdit({_id: item._id, name, price, image});
            handleClose();
        })
        .catch(err => console.log(err));
   }

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
