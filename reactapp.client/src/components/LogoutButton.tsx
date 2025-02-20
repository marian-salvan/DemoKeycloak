import { useContext } from "react";
import { KeycloakContext } from "../providers/KeycloakContext";

export const LogOutButton = () => {
    const { keycloakInstance, authenticated } = useContext(KeycloakContext);

    const logout = () => {
        keycloakInstance?.logout();
    };
 
    return <button onClick={logout} disabled={!authenticated}>Logout</button>;
}

export default LogOutButton;