import {useContext} from "react";
import  {UserDetailsContext} from "../../context/userContext.tsx";
import UserNotLoggedMenu from "./userNotLoggedMenu.tsx";
import UserLoggedMenu from "./userLoggedMenu.tsx";


export default function UserMenu() {

    const [userDetails, ] = useContext(UserDetailsContext);


    if (userDetails) {
        return (
            <UserLoggedMenu {...userDetails} />
        )
    }

    return (
        <UserNotLoggedMenu/>
    )
}