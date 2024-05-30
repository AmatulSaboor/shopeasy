import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import serverURL from '../../config/configFile';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

import { useAuth } from '../../context/AuthContext'
    const Register = () => {
    const [validationError, setValidationError] = useState(null)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate();
    const {setLoading, setCustomer, setIsAuthenticated, isAuthenticated} = useAuth();

    useEffect(() => {
        if (isAuthenticated)
            navigate('/')
    }, [isAuthenticated, navigate])

    return (
        <div className="d-flex justify-content-center">
            <Form className="col-md-4"
            onSubmit={(e)=>{
                    e.preventDefault();
                    if(password !== confirmPassword){
                        setValidationError('Password and confirm password do not match')
                        return;
                    }
                    else{
                        fetch(serverURL + "auth/register",
                        {
                            mode: 'cors',
                            method: 'POST',
                            headers: { 'Content-Type':'application/json' },
                            body: JSON.stringify({phone, confirmPassword, email, name, password, role:'664ada57dde187ee1c525222'}),
                            credentials : 'include'
                        })
                        .then((response) => response.json())
                        .then(response => {
                            if(response.message){
                                setValidationError(null)
                                setLoading(false)
                                setCustomer({id:response.id, name:response.name, email: response.email})
                                setIsAuthenticated(true)
                                navigate('/')}
                            else if(response.existedCustomer){
                        }else{
                            setValidationError(response.error)
                        }
                    })
                    .catch(err => console.log(err));}
                }}>
                {validationError && <div className='validationError m-4 mandatory'>{validationError}</div>}  
                <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Control type="text" placeholder="Name" onChange={e => setName(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Control type="text" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Control type="text" placeholder="Phone Number" onChange={e => setPhone(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Control type="password" placeholder="Confirm Password" onChange={e => setConfirmPassword(e.target.value)} />
                </Form.Group>
                <Button className="button btn-warning" type="submit">Register</Button>
                <p className="text">Already have an account??<Link className="login" to = "/login">Login Now</Link></p>
            </Form>
        </div>
    )
}

export default Register