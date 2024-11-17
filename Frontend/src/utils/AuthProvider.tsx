import React, { createContext, useState } from "react";
import { ReactNode } from "react";

//Interfaces to define the context type

interface Auth {
    username: string;
    userID: string;
}


interface AuthContextType {
    login: (username: string, userID: string) => void;
    logout: () => void;
    auth: Auth;
}

//Interface to define the prop types
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);


//Creates the context value for the API path that allows any page to acess correct path
const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    const [auth, setAuth] = useState<Auth>(
        {
            username: "",
            userID: "",
        }
    );

    // Mock function to login, which sets the auth token
    const login = (un: string, id: string) => {
        setAuth(
            {
                username: un,
                userID: id,
            }
        );
    };

    // Mock function to logout, which clears the auth token
    const logout = () => {
        setAuth(
            {
                username: "",
                userID: "",
            }
        );
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }} >
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;
