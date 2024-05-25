import React from 'react'
import {useState, useEffect} from 'react';
import { Link, useNavigate } from "react-router-dom";
// import {useHistory} from "react-router-dom";
import serverURL from '../../config/configFile';
// import '../../../assets/style.css'
// import '../login/Login.css';
// import logo from '../../../assets/img/logo-02.png';
// import '../../../assets/img/background-image.png';
// import image from '../../../assets/img/i5.png';
import { useAuth } from '../../context/AuthContext';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

const Login = () => {
    const [validationError, setValidationError] = useState(null)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const {setLoading, setCustomer, setIsAuthenticated, isAuthenticated} = useAuth();

    useEffect(() => {
        if (isAuthenticated){
            navigate('/')
        }
    }, [isAuthenticated, navigate])
    return (
        <div className="d-flex justify-content-center mt-5">

                <Form className="col-md-4"
                    onSubmit={(e)=>{
                        e.preventDefault();
                        fetch(serverURL + "auth/login",
                        {
                            mode: 'cors',
                            method: 'POST',
                            headers: { 'Content-Type':'application/json' },
                            body: JSON.stringify({email, password}),
                            credentials: 'include'
                        })
                        .then((response) => response.json())
                        .then(response => {console.log(response);
                            if(response.message){
                                setLoading(false)
                                setCustomer({id:response.id, name:response.name, email: response.email})
                                setIsAuthenticated(true)
                                navigate('/')
                            }
                            else{
                                setValidationError(response.error)
                            }
                            })
                        .catch(err => console.log(err));
                }}>
                {validationError && <div className='validationError m-4'>{validationError}</div>}
                    <Form.Group className="mb-3 ">
                        {/* <Form.Label className="text-start">Customer Name</Form.Label> */}
                        <Form.Control className ="text-username" type="text" name="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        {/* <Form.Label className="text-start">Password</Form.Label> */}
                        <Form.Control className ="user-password" type="password" name="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                    </Form.Group>
                    <Button className="login-Button btn-warning" type="submit">Login</Button>
                        <br></br>
                        <div className="r2-column">
                            <p className="account">Don't have an account??</p>
                            <Link className ="register" to = "/register">Register Now</Link>
                        </div> 
                </Form>
            </div>
        // <div>
        //     <form onSubmit={(e)=>{
        //                     e.preventDefault();
        //                     fetch(serverURL + "auth/login",
        //                     {
        //                         mode: 'cors',
        //                         method: 'POST',
        //                         headers: { 'Content-Type':'application/json' },
        //                         body: JSON.stringify({email, password}),
        //                         credentials: 'include'
        //                     })
        //                     .then((response) => response.json())
        //                     .then(response => {console.log(response);
        //                         if(response.message){
        //                             setLoading(false)
        //                             setCustomer({id:response.id, name:response.name, email: response.email, role: response.role, image: response.image})
        //                             setIsAuthenticated(true)
        //                             navigate('/')
        //                         }
        //                         else{
        //                             setValidationError(response.error)
        //                         }
        //                         })
        //                     .catch(err => console.log(err));
        //                 }}>
        //         <div className="container">
        //             <div className="flex-container">
        //                 <div className="left-column">
        //                     {/* <img className="left" src={image} alt="bgImage" />    */}
        //                 </div>
        //             <div className="right-column">
        //                 {/* <img className="logo" src={logo} alt="Logo" /> */}
        //                 <br></br>
        //                 {/* <h5 className="slagon">Skip the stress.<span className="slagon-part-2">Ship your luggage.</span> </h5> */}
        //                 {validationError && <div className='validationError m-4'>{validationError}</div>}
        //                 <input className ="text-username" type="text" name="email" placeholder="Customer Email" onChange={e => setEmail(e.target.value)}/>
        //                 <input className ="user-password" type="password" name="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
        //                 <br></br>
        //                 <button className="login-button" type="submit">Login</button>
        //                 <br></br>
        //                 <div className="r2-column">
        //                     <p className="account">Don't have an account??</p>
        //                    <Link className ="register" to = "/register">Register Now</Link>
        //                 </div> 
        //             </div>
        //         </div>
        //         </div>
        //     </form>
        // </div>
    )
}

export default Login