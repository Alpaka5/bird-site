import {useContext} from "react";
import {UserContext} from "../../context/userContext.tsx";
import {SetMainWindowContext} from "../../App.tsx";
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
import AdminPanel from "../admin/adminPanel.tsx";


export default function UserLoggedMenu(userDetails: userDetailsType) {
    const [, setToken] = useContext(UserContext);
    const setMainWindowState = useContext(SetMainWindowContext);
    const logoutAction = () => {
        setToken(null);
    }

    const adminPanelClickAction = () => {
        setMainWindowState(<AdminPanel/>);
    }

    const isAdmin = () => {
        for (var role of userDetails.user_roles) {
            if (role.id === 1 && role.name === "admin") {
                return true;
            }
        }
        return false;
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
                {isAdmin() &&
                    <DropdownMenuItem onClick={adminPanelClickAction}>Admin panel</DropdownMenuItem>}
                <DropdownMenuItem onClick={logoutAction}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )

}