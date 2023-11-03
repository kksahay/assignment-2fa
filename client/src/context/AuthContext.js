import { createContext, useContext } from "react";

export const userContext = createContext({
    userData: {},
    userInit: () => {},
});

export const useAuth = () => {
    return useContext(userContext);
}

export const AuthProvider = userContext.Provider;