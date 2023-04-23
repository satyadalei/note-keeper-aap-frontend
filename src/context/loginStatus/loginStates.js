import { useState } from "react";
import LogInContext from "./loginContext";

const LogInStates = (props)=>{
    let isTokenExists; 
    if (localStorage.getItem("authToken")) {
        isTokenExists = true;
    }else{
        isTokenExists = false;
    }
    const [logInStatus, setLogInStatus] = useState(isTokenExists);
    return(
        <LogInContext.Provider value={{logInStatus, setLogInStatus}} >
          {props.children}
        </LogInContext.Provider>
    )
}
export default LogInStates;