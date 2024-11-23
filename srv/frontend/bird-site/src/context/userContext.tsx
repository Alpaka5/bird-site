import React, {createContext, useState, useEffect, SetStateAction, Dispatch} from "react"
import {userDetailsType} from "../components/types/userData.tsx";

export const UserContext = createContext<[string | null, Dispatch<SetStateAction<string | null>>]>([null, () => {
}]);
export const UserDetailsContext = createContext<[userDetailsType, Dispatch<SetStateAction<userDetailsType>>]>([{
    username: null,
    email: null
}, () => {
}]);


export function UserProvider(props: {
    children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined;
}) {
    const [token, setToken] = useState<string | null>(localStorage.getItem("userToken"))
    const [userDetails, setUserDetails] = useState<userDetailsType>({username: null, email: null})
    useEffect(() => {
        const fetchUser = async () => {
            const requestOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token
                }
            };
            console.log("HERE COMES THE ERROR!");
            const response = await fetch("http://localhost:5000/users/me", requestOptions)
            console.log("This is never executed");
            const data = await response.json();
            // We check what user is "logged in", if response is not ok, this means that token is not valid
            // and we can remove it and proceed as user is not logged in and token is empty
            if (!response.ok) {
                setToken(null);
                setUserDetails(null)
            } else {
                setUserDetails({username: data.username, email: data.email})
            }


            if (typeof token === "string") {
                localStorage.setItem("userToken", token);
            } else {
                localStorage.removeItem("userToken")
            }
        };
        fetchUser();
    }, [token]);

    return (
        <UserContext.Provider value={[token, setToken]}>
            <UserDetailsContext.Provider
                value={[userDetails, setUserDetails]}>{props.children}</UserDetailsContext.Provider>

        </UserContext.Provider>
    )
}