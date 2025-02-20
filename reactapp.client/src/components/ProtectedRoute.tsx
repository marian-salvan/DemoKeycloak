import { Navigate } from "react-router-dom";
import { JSX, useContext } from "react";
import { KeycloakContext } from "../providers/KeycloakContext";

interface ProtectedRouteProps {
    children: JSX.Element;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { keycloakInstance, authenticated } = useContext(KeycloakContext);
    console.log(keycloakInstance);

    if (!keycloakInstance) {
        return <div>Loading...</div>;
      }    

    return authenticated ? children : <Navigate to="/" />;
};