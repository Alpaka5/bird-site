import Register from "./register.tsx"
import {useContext, useState} from "react";
import {UserContext} from "../../context/userContext.tsx";

export default function UserMenu() {
    const [registerOpen, setRegisterOpen] = useState(false);
    const [token, setToken] = useContext(UserContext);
    const registerOnClickAction = () => {
        let registerDoc = document.getElementById("register-popup");
        registerDoc.hidden = false;
        setTimeout(function () {
            registerDoc.classList.replace("popup-hidden", "popup-shown");
        }, 10)

    };

    return (
        <div onClick={() => registerOnClickAction()}>
            Profile!!
            {token || <Register/>}
        </div>
    )
}