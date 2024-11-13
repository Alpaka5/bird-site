import Register from "./register.tsx"
import {useState} from "react";
export default function UserMenu(){
    const [registerOpen, setRegisterOpen] = useState(false);
    return(
        <div onClick={() => setRegisterOpen(!registerOpen)}>
            Profile!!
            {registerOpen && <Register/>}
        </div>
    )
}