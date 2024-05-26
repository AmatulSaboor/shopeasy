import serverURL from "../../config/configFile";
import { Form, Button } from "react-bootstrap";
import {useEffect, useState} from 'react';
// import useFetch
//  from "../../custom hooks/useFetch";
const AddCategoryForm = ({handleClose, handleCreate}) => {
   const [name, setName] = useState('');
   // const [price, setPrice] = useState('');
   // const [quantity, setQunatity] = useState('');
   // const [description, setDescription] = useState('');
   // const [isAvailable, setIsAvailable] = useState(true);
   // const [category, setCategory] = useState('');
   // const [categoriesList, setCategoriesList] = useState([]);
   // const [image, setImage] = useState('');
   // const url = `category/getList`
   // const {data, error, loading} = useFetch(url)
   // fetching data on submit
   const handleSubmit = (e) => {
      // console.log('inside form submit', price, image, category)
      // const formData = new FormData();
      // const fields = { name };
      // Object.entries(fields).forEach(([key, value]) => formData.append(key, value));

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

   // useEffect(() => {
   // },[])
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
      <Button variant="success" type="submit">Add</Button>
   </Form>
   )
}
export default AddCategoryForm;