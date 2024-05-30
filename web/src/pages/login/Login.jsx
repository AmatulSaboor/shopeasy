import React from 'react'
import {useState, useEffect} from 'react';
import { Link, useNavigate } from "react-router-dom";
import serverURL from '../../config/configFile';
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
        if (isAuthenticated)
            navigate('/')
    }, [isAuthenticated, navigate])

    // RETURN JSX
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
                    .then(response => {
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
            {validationError && <div className='validationError m-4 mandatory'>{validationError}</div>}
                <Form.Group className="mb-3 ">
                    <Form.Control className ="text-username" type="text" name="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
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
    )
}

export default Login