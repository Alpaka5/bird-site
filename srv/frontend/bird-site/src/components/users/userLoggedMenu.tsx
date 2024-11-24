import {useContext} from "react";
import {UserContext} from "../../context/userContext.tsx";
import {userDetailsType} from "../types/userData.tsx";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu"

export default function UserLoggedMenu(userDetails: userDetailsType) {
    const [, setToken] = useContext(UserContext);
    const logoutAction = () => {
        setToken(null);
    }


    return (


            <NavigationMenu>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>{userDetails.username}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul>
                            <li onClick={logoutAction}>
                                Logout
                            </li>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenu>


    )

}