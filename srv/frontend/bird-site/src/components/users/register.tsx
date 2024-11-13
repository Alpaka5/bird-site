import {useContext, useState} from "react";

import {UserContext} from "../../context/userContext.tsx";


export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmationPassword, setConfirmationPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [, setToken] = useContext(UserContext);

    return (
        <>
            <div className="flex justify-around">
                <form className="">
                    <h1> Register </h1>
                    <div>
                        <label>Email Address</label>
                        <div>
                            <input type="email" placeholder="Enter email" value={email}
                                   onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                    </div>
                    <div>
                        <label>Password</label>
                        <div>
                            <input type="password" placeholder="Enter password" value={password}
                                   onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                    </div>
                    <div>
                        <label>Confirm Password</label>
                        <div>
                            <input type="password" placeholder="Confirm password" value={confirmationPassword}
                                   onChange={(e) => setConfirmationPassword(e.target.value)}/>
                        </div>
                    </div>
                    <br/>
                    <button className="" type="submit">
                        Register
                    </button>
                </form>
            </div>
        </>
    )

}