import {useContext} from "react";
import {UserContext} from "../../context/userContext.tsx";
import {userDetailsType} from "../types/userData.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import * as React from "react";


export default function UserLoggedMenu(userDetails: userDetailsType) {
    const [, setToken] = useContext(UserContext);
    const logoutAction = () => {
        setToken(null);
    }


    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="logged-in-tile">
                <div><Avatar>
                    <AvatarImage src="https://github.com/shadcn.png"/>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar></div>
                <div>{userDetails.username}</div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="logged-in-menu">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="logged-in-separator"/>
                <DropdownMenuItem onClick={logoutAction}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )

}