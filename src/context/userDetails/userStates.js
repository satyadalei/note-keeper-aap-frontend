import { useEffect, useState } from "react";
import UserContext from "./userContext";
const UserStates = (props) => {
    // fetch user details here 
    // api calling
    const host = "http://localhost:5000";
    // here perticular users id will be stored
    const userIdfromLocalStorage = localStorage.getItem('userId')
    const [userId, setUserId] = useState(userIdfromLocalStorage);
    const [userDetails, setUserDetails] = useState({
        name: "",
        email: ""
    });
    //console.log(userId);
    const getUserDetails = async () => {
        // console.log(userId);
        const url = `${host}/api/auth/getuser`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "auth-token": localStorage.getItem('authToken')
            }
        });
        const json = await response.json();
        console.log(json.user);
        setUserDetails({
            name : json.user.name,
            email : json.user.email
        })
    }

    return (
        <UserContext.Provider value={{ getUserDetails, userDetails }} >
            {props.children}
        </UserContext.Provider>
    )
}

export default UserStates;