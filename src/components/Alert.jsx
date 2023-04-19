import React from "react";

const Alert = (props) => {
  return (
    <>
      <div className="alert alert-danger" role="alert">
        {props.message} Hello here will be messaged
      </div>
    </>  
  );
};

export default Alert;
