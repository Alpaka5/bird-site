import Register from "./register.tsx"
import Login from "./login.tsx"
import {useContext} from "react";
import {UserContext, UserDetailsContext} from "../../context/userContext.tsx";

export default function UserMenu() {
    const [token, setToken] = useContext(UserContext);
    const [userDetails,] = useContext(UserDetailsContext);
    const registerOnClickAction = () => {
        let registerDoc = document.getElementById("register-popup");
        if (registerDoc) {
            registerDoc.hidden = false;
            setTimeout(function () {
                registerDoc.classList.replace("popup-hidden", "popup-shown");
            }, 10)
        }


    };

    const loginOnClickAction = () => {
        let loginDoc = document.getElementById("login-popup");
        if (loginDoc) {
            loginDoc.hidden = false;
            setTimeout(function () {
                loginDoc.classList.replace("popup-hidden", "popup-shown");
            }, 10)
        }


    };

    const logoutAction = () => {
        setToken("xd");
    }

    if (userDetails) {
        return (
            <div>
                {userDetails.username}
                <div onClick={() => logoutAction()}>Logout</div>
            </div>)

    }

    return (
        <div>
            <div onClick={() => registerOnClickAction()}>Register</div>
            <div onClick={() => loginOnClickAction()}>Login</div>
            <Register/>
            <Login/>

        </div>
    )
}