import serverURL from "../../config/configFile";
import { Form, Button, Image } from "react-bootstrap";
import {useEffect, useState} from 'react';
import useFetch from "../../custom hooks/useFetch";
import { useAuth } from "../../context/AuthContext";
const Profile = () => {

    const { customer } = useAuth();
    const [name] = useState(customer.name);
   const [email] = useState(customer.email);
   const [phone, setPhone] = useState('');
   const [gender, setGender] = useState();
   const [houseNumber, setHouseNumber] = useState('');
   const [street, setStreet] = useState('');
   const [city, setCity] = useState('');
   const [country, setCountry] = useState('');
   const [postalCode, setPostalCode] = useState('');
   const [image, setImage] = useState('');
   const url = `customer/getById/${customer.id}`
   const {data, error, loading} = useFetch(url)
   // fetching data on submit
   const handleSubmit = (e) => {
      // console.log('inside form submit', price, image, category)
      const formData = new FormData();
      const fields = { phone, gender, image, houseNumber, street, city, country, postalCode };
      Object.entries(fields).forEach(([key, value]) => formData.append(key, value));
      e.preventDefault();
      console.log(formData)
      fetch(serverURL + `customer/update/${customer.id}`,
      {
         mode: 'cors',
         method: 'PUT',
         body: formData,
         credentials: 'include'
      })
      .then((response) => response.json())
      .then(response => {
        console.log('customer saved')
      })
      .catch(err => console.log(err));
   }

   useEffect(() => {
      if (data){
        setGender(data.customer.gender)
        setPhone(data.customer.phone)
        setImage(data.customer.image)
        setHouseNumber(data.customer.houseNumber)
        setStreet(data.customer.street)
        setCity(data.customer.city)
        setCountry(data.customer.country)
        setPostalCode(data.customer.postalCode)
      }
   }, [data])

    if(loading) return <div>Loading...</div>
    if(error) return <div>{error}</div>

    return(
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
               value={name}
               readOnly
            />
         </div>
      </Form.Group>
      <Form.Group>
         <div>
            <label className="form-label">Email: <span className="mandatory"> *</span></label>
            <Form.Control
             className="select-form"
               type="text"
               placeholder="email"
               name="email"
               value={email}
               readOnly
            />
         </div>
      </Form.Group>
      <Form.Group>
         <div>
            <label className="form-label">Phone Number: <span className="mandatory"> *</span></label>
            <Form.Control
             className="select-form"
               type="text"
                value={phone}
               placeholder="phone"
               name="phone"
               onChange = { (e) => setPhone(e.target.value)}
            />
         </div>
      </Form.Group>
      <Form.Group>
      <div>
         <label className="form-label">
            Gender : <span className="mandatory"> *</span>
         </label>
         <select
            className="select-form"
            value={gender}
            name="gender"
            onChange={(e) => setGender(e.target.value)}
         >
            <option value="male">
            male
            </option>
            <option value="female">
            female
            </option>
         </select>
      </div>
      </Form.Group>
      <Image src = {serverURL + `uploads/customer/` + customer.image} width={200} height={200}/>
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
            <label className="form-label">House Number: </label>
            <Form.Control
             className="select-form"
               type="text"
               placeholder="house number"
               name="house number"
               value={houseNumber}
               onChange = { (e) => setHouseNumber(e.target.value)}
            />
         </div>
      </Form.Group>
      <Form.Group>
         <div>
            <label className="form-label">Street: </label>
            <Form.Control
             className="select-form"
               type="text"
               placeholder="street"
               name="street"
               value={street}
               onChange = { (e) => setStreet(e.target.value)}
            />
         </div>
      </Form.Group>
      <Form.Group>
         <div>
            <label className="form-label">City: </label>
            <Form.Control
             className="select-form"
               type="text"
               placeholder="city"
               name="city"
               value={city}
               onChange = { (e) => setCity(e.target.value)}
            />
         </div>
      </Form.Group>
      <Form.Group>
         <div>
            <label className="form-label">Country: </label>
            <Form.Control
             className="select-form"
               type="text"
               placeholder="country"
               name="country"
               value={country}
               onChange = { (e) => setCountry(e.target.value)}
            />
         </div>
      </Form.Group>
      <Form.Group>
         <div>
            <label className="form-label">Postal Code: </label>
            <Form.Control
             className="select-form"
               type="text"
               placeholder="postal code"
               name="postalCode"
               value={postalCode}
               onChange = { (e) => setPostalCode(e.target.value)}
            />
         </div>
      </Form.Group>
      <Button variant="success" type="submit">Save</Button>
   </Form>
    )
}

export default Profile