import { useContext } from "react";
import { KeycloakContext } from "../providers/KeycloakContext";

const ProfileButton = () => {
    const { keycloakInstance, authenticated } = useContext(KeycloakContext);

    const viewProfile = () => {
        const accountUrl = keycloakInstance?.createAccountUrl() ?? '';
        window.location.href = accountUrl;
    };
  
    return <button onClick={viewProfile} disabled={!authenticated}>Profile</button>;
};

export default ProfileButton;