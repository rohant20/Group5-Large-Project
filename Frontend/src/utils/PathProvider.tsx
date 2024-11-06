import React, { createContext } from "react";
import { ReactNode } from "react";

export const PathContext = createContext("");

interface AuthProviderProps {
    children: ReactNode;
}

const PathProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const app_name = 'steezee.xyz';
    const envirn = 'dev';

    const path: string = buildPath();

    function buildPath(): string {
        if (envirn != 'dev') {
            return 'http://' + app_name + ':8000/';
        }
        else {
            return 'http://localhost:8000/';
        }
    }

    return (
        <PathContext.Provider value={path} >
            {children}
        </PathContext.Provider>
    )
};

export default PathProvider;
