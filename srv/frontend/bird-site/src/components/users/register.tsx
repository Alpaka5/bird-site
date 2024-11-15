import {useContext, useState} from "react";
import "../../styles/user_styles.css"
import {UserContext} from "../../context/userContext.tsx";


export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmationPassword, setConfirmationPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [, setToken] = useContext(UserContext);

    const submitRegistration = async () => {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username: username, email: email, hashed_password: password})
        }
        const response = await fetch("http://localhost:5000/users/create", requestOptions);
        const data = await response.json();

        if (!response.ok) {
            setErrorMessage(data.detail);
        } else{
            setToken(data.access_token);
            setErrorMessage('');
            let registerDoc = document.getElementById("register-popup");
            registerDoc.classList.replace("popup-shown", "popup-hidden");

            setTimeout(function () {
                registerDoc.hidden = true;
            }, 200)

        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmationPassword && password.length > 2) {
            submitRegistration();
        } else {
            setErrorMessage("Ensure that the passwords match and are greater than 2 characters");
        }

    }


    return (
        <>
            <div id="register-popup" className="full-screen-center-popup  popup-hidden" hidden>
                <div className="register-grid">
                <div className="text-left">
                    Create your Bird Quiz! user account.
                    <br/>
                    Please input your username, email and password
                </div>
                <form className="register-form" onSubmit={handleSubmit}>
                    <div>
                        <label>Username</label>
                        <div>
                            <input type="text" placeholder="Enter username" value={username}
                                   onChange={(e) => setUsername(e.target.value)}/>
                        </div>
                    </div>
                    <br/>
                    <div>
                        <label>Email Address</label>
                        <div>
                            <input type="email" placeholder="Enter email" value={email}
                                   onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                    </div>
                    <br/>
                    <div>
                        <label>Password</label>
                        <div>
                            <input type="password" placeholder="Enter password" value={password}
                                   onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                    </div>
                    <div>
                        <label>Confirm password</label>
                        <div>
                            <input type="password" placeholder="Confirm password" value={confirmationPassword}
                                   onChange={(e) => setConfirmationPassword(e.target.value)}/>
                        </div>
                    </div>
                    <br/>
                    <button className="" type="submit">
                        Register
                    </button>
                    <div className="text-red-600">{errorMessage}</div>
                </form>

                    </div>

            </div>
        </>
    )

}