import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
// import {useHistory} from "react-router-dom";
import serverURL from '../../../config/configFile';
// import '../register/Register.css';
// import logo from '../../../assets/img/logo-02.png';
// import '../../../assets/img/background-image.png';
// import image from '../../../assets/img/i2.png';

export const Register = ({setLoggedInUserEmail, setLoggedInUserName}) => {
    const [validationError, setValidationError] = useState(null)
    const [email, setEmail] = useState('')
    const [customerName, setCustomerName] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate();
    useEffect(() => {
        fetch(serverURL + 'auth/session', {
            credentials: 'include'
        })
        .then((res => res.json()))
        .then(res => {console.log(res); 
            if(res.isAuthenticated){
                setLoggedInUserEmail(res.email)
                setLoggedInUserName(res.customerName)
                return navigate.push('./');
            }
        })
        .catch(err => {console.log(err);
        })
    }, [navigate, setLoggedInUserName, setLoggedInUserEmail])
    return (
        <div>
            <form onSubmit={(e)=>{
                e.preventDefault();
                if(password !== confirmPassword){
                    setValidationError('Password and Confirm Password do not match')
                    return;
                }
                else{
                
                console.log(`inside register`);
                fetch(serverURL + "auth/register",
                {
                    mode: 'cors',
                    method: 'POST',
                    headers: { 'Content-Type':'application/json' },
                    body: JSON.stringify({phone, confirmPassword, email, customerName, password}),
                    credentials : 'include'
                })
                .then((response) => response.json())
                .then(response => {
                    console.log(response)
                    if(response.message){
                        setValidationError(null)
                        setLoggedInUserName(response.customerName)
                        setLoggedInUserEmail(response.email)
                        navigate('./')}
                    else if(response.existedCustomer){
                        
                    }else{
                        console.log(response.error)
                        setValidationError(response.error)
                    }
                })
                .catch(err => console.log(err));}
            }}>
                <div className="flex-container">
                    <div className="left-column">
                        {/* <img className="bg-img" src={image} alt="bgImage" />    */}
                    </div>
                <div className="right-column">
                    {/* <img className="logo" src={logo} alt="Logo" /> */}
                    {/* <h5 className="slagon">Skip the stress.<span className="slagon-part-2">Ship your luggage.</span> </h5> */}
                    {validationError && <div className='validationError m-4'>{validationError}</div>}
                    <input className="field" type="text" name="customerName" placeholder="Customer Name" required onChange={e => setCustomerName(e.target.value)} />
                    <input className="field" type="email" name="email" placeholder="Email" required onChange={e => setEmail(e.target.value)} />
                    <input className="field" type="text" name="phone" placeholder="Phone number" required onChange={e => setPhone(e.target.value)} />
                    <input className="field" type="password" name="password" placeholder="Password" required onChange={e => setPassword(e.target.value)} />
                    <input className="field" type="password" name="confirmPassword" placeholder="Confirm password" required onChange={e => setConfirmPassword(e.target.value)} />
                    <br></br>
                    <div><span className='allfield'>Note:All fields are mandatory</span></div>
                        <button className="button" type="submit">Register</button>
                        <p className="text">Already have an account??<Link className="login" to = "/login">Login Now</Link></p>
                    </div>
                </div>
            </form>
        </div>
    )
}