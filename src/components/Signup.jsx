import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Signup = () => {
  const [credentials, setCredentials] = useState({
    name : "",
    email : "",
    password : "",
    cpassword : "",
  });
  const navigate = useNavigate();
  // update all credentials
   const handleChange = (e)=>{
      setCredentials({...credentials,[e.target.name] : e.target.value});
   }
   // submit register credentials to api
   const handleSubmit = async (e)=>{
   //prevent default function
    e.preventDefault();
    const url = "http://localhost:5000/api/auth/createuser";
    //check whether password and confirm password is same 
    if (credentials.password === credentials.cpassword) {
      // both password same
        const registerUser = await fetch(url, {
          method : "POST",
          headers : {
            "Content-Type" : "application/json"
          },
          body: JSON.stringify(credentials)
        });
        const json = await registerUser.json();
        //change values to normal values
        setCredentials({
          name : "",
          email : "",
          password : "",
          cpassword : "",
        });
        if(json.msg === "user created") { // success = true || user created successfully
           localStorage.getItem(json.token);
           navigate('/');
        }else if(json.msg === "user exists"){
          alert("This user already exists please login");
           navigate("/login");
        }
        else if (json.msg === "invalid credentials") {
           alert("There is something wrong while registering. In appropriate credentials. Sign up again");
           navigate("/signup");
        }
    } else {
      // password do not match
      alert("You did not entered same passwords");
    }
    
   }
  return (
    <div>
      <>
        <form onSubmit={handleSubmit} >
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input name='name' onChange={handleChange} type="text" className="form-control" id="name" aria-describedby="Enter your name" value={credentials.name} />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input name='email' onChange={handleChange} type="email" className="form-control" id="email" aria-describedby="Enter your email" value={credentials.email}  />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input name='password' onChange={handleChange} type="password" className="form-control" id="password" value={credentials.password} />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input name='cpassword' onChange={handleChange} type="password" className="form-control" id="cpassword" value={credentials.cpassword} />
          </div>
          <button disabled={
            // checking credentials appropriately
            credentials.cpassword !== credentials.password || // if both passwords are same - disable submit
            credentials.password.length < 5 || //min length of passwords is less than 5 - disable submit
            credentials.name.length < 5 // if name length is less than 5 - disable submit
            } type="submit" className="btn btn-primary">Register</button>
        </form>
      </>
    </div>
  )
}

export default Signup