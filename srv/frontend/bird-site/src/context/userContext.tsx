import React, {createContext, useState, useEffect} from "react"

export const UserContext = createContext()


export function UserProvider(props) {
    const [token, setToken] = useState(localStorage.getItem("userToken"))

    useEffect(() => {
        const fetchUser = async () => {
            const requestOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token
                }
            };

            const response = await fetch("http://localhost:5000/users/me", requestOptions);
            // We check what user is "logged in", if response is not ok, this means that token is not valid
            // and we can remove it and proceed as user is not logged in and token is empty
            if (!response.ok) {
                setToken(null);
            }
            localStorage.setItem("userToken", token);
        };
        fetchUser();
    }, [token]);

    return (
        <UserContext.Provider value={[token,setToken]}>
            {props.children}
        </UserContext.Provider>
    )
}