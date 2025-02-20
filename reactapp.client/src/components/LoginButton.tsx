import { useContext } from "react";
import { KeycloakContext } from "../providers/KeycloakContext";

export const LoginButton = () => {
    const { keycloakInstance, authenticated } = useContext(KeycloakContext);

    const login = () => {
        keycloakInstance?.login();
    };
 
    return <button onClick={login} disabled={authenticated}>Login</button>;
};

export default LoginButton;