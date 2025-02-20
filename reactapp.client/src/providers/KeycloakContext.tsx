import React, { createContext, useState, useEffect, ReactNode } from "react";
import keycloak from "./KeycloakConfig";
import Keycloak from "keycloak-js";
import { tokenService } from "../services/TokensService";

// Define the context type
interface KeycloakContextType {
  keycloakInstance: Keycloak | null;
  authenticated: boolean;
}

// Create the context
export const KeycloakContext = createContext<KeycloakContextType>({
  keycloakInstance: null,
  authenticated: false,
});

// Define the provider component
export const KeycloakProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [keycloakInstance, setKeycloakInstance] = useState<Keycloak | null>(
    null
  );
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const initializeKeycloak = async () => {
      try {
        const auth = await keycloak.init({
          onLoad: "login-required",
          redirectUri: "http://localhost:3000",
        });

        if (auth) {
          setKeycloakInstance(keycloak);

          // Store initial tokens
          tokenService.setTokens({
            accessToken: keycloak.token!,
            refreshToken: keycloak.refreshToken!,
          });

          // Set up token refresh
          keycloak.onTokenExpired = () => {
            keycloak
              .updateToken(-1)
              .then((refreshed) => {
                if (refreshed) {
                  tokenService.setTokens({
                    accessToken: keycloak.token!,
                    refreshToken: keycloak.refreshToken!,
                  });
                }
              })
              .catch(() => {
                // If refresh fails, redirect to login
                keycloak.login();
              });
          };
        }

        setAuthenticated(auth);
      } catch (error) {
        console.error("Keycloak init error:", error);
      }
    };

    initializeKeycloak();

    return () => {
      tokenService.clearTokens();
    };
  }, []);

  return (
    <KeycloakContext.Provider value={{ keycloakInstance, authenticated }}>
      {children}
    </KeycloakContext.Provider>
  );
};
