import {SyntheticEvent, useContext, useState} from "react";
import {UserContext} from "../../context/userContext.tsx";
import "../../styles/user_styles.css"

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [token, setToken] = useContext(UserContext);

    const submitLogin = async () => {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: JSON.stringify(`grant_type=password&username=${email}&password=${password}&scope=&client_id=&client_secret=`)
        };
        const response = await fetch("http://localhost:5000/users/token", requestOptions);
        const data = await response.json();
        if (!response.ok) {
            setErrorMessage(data.detail);
        } else {
            setToken(data.access_token);
            setErrorMessage('');
            let loginDoc = document.getElementById("login-popup");
            if (loginDoc){
            loginDoc.classList.replace("popup-shown", "popup-hidden");

            setTimeout(function () {
                loginDoc.hidden = true;
            }, 200)
            }
        }
    }

    const handleSubmit = (e: SyntheticEvent<HTMLFormElement, SubmitEvent> ) => {
        e.preventDefault();
        submitLogin();
        console.log(token);
    }

    return (
        <>
            <div id="login-popup" className="full-screen-center-popup  popup-hidden" hidden>
                <div className="register-grid">
                    <div className="text-left">
                        Login to your Bird Quiz! user account.
                        <br/>
                        Please input your email and password!
                        <div onClick={() => {
                            let loginDoc = document.getElementById("login-popup");
                            if (loginDoc) {
                                loginDoc.hidden = true;
                            }
                        }}>Exit</div>
                    </div>
                    <form className="register-form" onSubmit={handleSubmit}>
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
                        <br/>
                        <button className="" type="submit">
                            Login
                        </button>
                        <div className="text-red-600">{errorMessage}</div>
                    </form>

                </div>

            </div>
        </>
    )
}