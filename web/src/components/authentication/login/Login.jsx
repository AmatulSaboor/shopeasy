import React from 'react'
import {useState, useEffect} from 'react';
import { Link, useNavigate } from "react-router-dom";
// import {useHistory} from "react-router-dom";
import serverURL from '../../../config/configFile';
// import '../../../assets/style.css'
// import '../login/Login.css';
// import logo from '../../../assets/img/logo-02.png';
// import '../../../assets/img/background-image.png';
// import image from '../../../assets/img/i5.png';
import { useAuth } from '../../../context/AuthContext';

export const Login = ({setLoggedInCustomerId, setLoggedInCustomerEmail, setLoggedInCustomerName}) => {
    const [validationError, setValidationError] = useState(null)
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const {setLoading, setUser, setIsAuthenticated, isAuthenticated} = useAuth();

    useEffect(() => {
        if (isAuthenticated){
            navigate('/dashboard')
        }
    })
    // useEffect(() => {
    //     fetch(serverURL + 'auth/session', {
    //         credentials: 'include'
    //     })
    //     .then((res => res.json()))
    //     .then(res => {console.log(res); 
    //         if(res.isAuthenticated){
    //             setLoggedInCustomerId(res.id)
    //             setLoggedInCustomerEmail(res.email)
    //             setLoggedInCustomerName(res.name)
    //             return navigate('/');
    //         }
    //     })
    //     .catch(err => {console.log(err);
    //     })
    // }, [navigate, setLoggedInCustomerId, setLoggedInCustomerEmail, setLoggedInCustomerName])
    return (
        <div>
            <form onSubmit={(e)=>{
                            e.preventDefault();
                            fetch(serverURL + "auth/login",
                            {
                                mode: 'cors',
                                method: 'POST',
                                headers: { 'Content-Type':'application/json' },
                                body: JSON.stringify({name, password}),
                                credentials: 'include'
                            })
                            .then((response) => response.json())
                            .then(response => {console.log(response);
                                if(response.message){
                                    setLoading(false)
                                    setUser({id:response.id, name:response.name, email: response.email})
                                    setIsAuthenticated(true)
                                    // setLoggedInCustomerId(response.id)
                                    // setLoggedInCustomerEmail(response.email)
                                    // setLoggedInCustomerName(response.name)
                                    navigate('/dashboard')
                                }
                                else{
                                    setValidationError(response.error)
                                }
                                })
                            .catch(err => console.log(err));
                        }}>
                <div className="container">
                    <div className="flex-container">
                        <div className="left-column">
                            {/* <img className="left" src={image} alt="bgImage" />    */}
                        </div>
                    <div className="right-column">
                        {/* <img className="logo" src={logo} alt="Logo" /> */}
                        <br></br>
                        {/* <h5 className="slagon">Skip the stress.<span className="slagon-part-2">Ship your luggage.</span> </h5> */}
                        {validationError && <div className='validationError m-4'>{validationError}</div>}
                        <input className ="text-username" type="text" name="name" placeholder="Customer Name" onChange={e => setName(e.target.value)}/>
                        <input className ="user-password" type="password" name="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                        <br></br>
                        <button className="login-button" type="submit">Login</button>
                        <br></br>
                        <div className="r2-column">
                            <p className="account">Don't have an account??</p>
                           <Link className ="register" to = "/register">Register Now</Link>
                        </div> 
                    </div>
                </div>
                </div>
            </form>
        </div>
    )
}