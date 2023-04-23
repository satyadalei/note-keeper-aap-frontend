import React,{ useState } from "react";
import AlertContext from "./alertContext";


const AlertState = (props)=>{
    const [alert, setAlert] = useState({
        message : "",
        alertType : ""
    });
    return(
        <AlertContext.Provider value={{alert, setAlert}} >
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState;