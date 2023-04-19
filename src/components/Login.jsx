import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Login = () => {
    // store meail and password using states
    const [credentials, setCredentials] = useState({email: "", password :""})
    // update email and password onchange!!
    const handleCredentialsChange = (e)=>{
        setCredentials({...credentials, [e.target.name] : e.target.value});
    }
    // useHistory to redirect to home page
    let navigate = useNavigate();
    
    // Here all things will hapen after submit is clicked
    const handleLoginSubmit = async (e)=>{
        // first prevent default behavious
        e.preventDefault();
        const url = "http://localhost:5000/api/auth/login";
        //fetch api takes two parameters mainly 1) url and 2)request type details
        const getResponse = await fetch(url,{
          method : "POST",
          headers : {
            "Content-Type" : "application/json"
          },
          body: JSON.stringify(credentials)
        });
        const json = await getResponse.json(); // response gives -- success : true & tote "hfwsj...."
        console.log(json);
        // set email & password to empty
        setCredentials({email: "", password :""});
        // redirect user if login successful
        if(json.success) {
            // first save token in local Storage
            localStorage.getItem(json.token);
            //Redirect user page ---> to redirect use --> useHistory
            navigate("/");
        }else{
            // show an elert
            alert("Invalid user");
        }
    }
    return (
        <>
            <div className="container">
                <form onSubmit={handleLoginSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input onChange={handleCredentialsChange} value={credentials.email} type="email" className="form-control" name='email' id="email" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input onChange={handleCredentialsChange} value={credentials.password} type="password" name='password' className="form-control" id="password"/>
                    </div>
                    {/* on submit handle event separately and run a custome function */}
                    <button  type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Login