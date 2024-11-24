import Register from "./register.tsx"
import Login from "./login.tsx"

export default function UserNotLoggedMenu() {
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


    return (
        <div className="flex justify-end items-center gap-5 mx-5">
            <div className="nav-menu-text-small nav-menu-button" onClick={() => loginOnClickAction()}>Login</div>
            <div className="nav-menu-text-small nav-menu-button" onClick={() => registerOnClickAction()}>Register</div>
            <Register/>
            <Login/>

        </div>
    )
}