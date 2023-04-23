import React, { useContext, useEffect } from "react";
import AlertContext from "../context/alerts/alertContext";

const Alert = () => {
  //useEffect is used to get Id
  const alertContext = useContext(AlertContext);
  const {alert} = alertContext ;
  useEffect(()=>{
    let alertDiv  = document.getElementById('alert');
    alertDiv.style.visibility = "visible";
    function hideMessage() {
      alertDiv.style.visibility = "hidden";
    }
    setTimeout(hideMessage,3000);
  },[alert])
   const alertStyles = {position:"sticky", top :"0",zIndex : "2", minHeight : "50px"}
  return (
    <>
      <div id="alert" style={alertStyles} className={`alert alert-${alert.alertType}`} role="alert">
        {alert.message} 
      </div>
    </>  
  );
};

export default Alert;
