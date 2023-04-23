import React, { useEffect } from 'react'
import {Link, useLocation, useNavigate } from "react-router-dom";
import LogInContext from '../context/loginStatus/loginContext';
import { useContext } from 'react';
import UserContext from '../context/userDetails/userContext';

function Navbar() {
    let location = useLocation();
    const navigate = useNavigate();
    const loginContext = useContext(LogInContext);
    const {logInStatus, setLogInStatus} = loginContext;

    const userContext = useContext(UserContext);
    const {userDetails,getUserDetails} = userContext;
    
    useEffect(()=>{
        if (logInStatus) {
            getUserDetails()
        }
    },[]);
    const handleLogOut = async ()=>{
        localStorage.removeItem("authToken");
        localStorage.removeItem("userId");
        setLogInStatus(false); // set login status to false & redirect to home page or login page
        // useNavigate()('/');
        navigate('/');
    }
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark" data-bs-theme="dark" >
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">NoteKeepr</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            {/* <Link className="nav-link active" aria-current="page" to="/">Home</Link> */}
                            <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            
                        </li>
                        <li className="nav-item">
                            {/* <Link className="nav-link " aria-current="page" to="/about">About</Link> */}
                            <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} aria-current="page" to="/about">About</Link>
                        </li>
                        {/* Show user name if it is already loged In */}
                        {
                            logInStatus ?
                            <>
                            <li style={{color:"white",marginLeft:"100px"}} >
                                <h6>Hello {userDetails.name} </h6>
                                <span>{userDetails.email}</span>
                            </li>
                            </>
                            :
                            ""
                        }
                    </ul>
                    <div>
                    
                    {logInStatus 
                    //if already logedIn then show log Out button inn navbar
                    ? <>
                        <button onClick={handleLogOut} className="btn btn-primary mx-2" aria-disabled="true">Log out</button>
                     </>
                    :
                    //if not loged in show login and registration option in navbar
                    <>
                        <Link className="btn btn-primary mx-2" role="button" to='/login'  aria-disabled="true">LogIn</Link>
                        <Link className="btn btn-primary mx-2" role="button" to='/signup' aria-disabled="true">SignUp</Link>
                     </>
                    }
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar