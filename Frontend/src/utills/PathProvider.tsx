import React, { createContext } from "react";
import { ReactNode } from "react";

export const PathContext = createContext("");
interface PathProviderProps {
    children: ReactNode;
}


//Creates the context value for the API path that allows any page to acess correct path
const PathProvider: React.FC<PathProviderProps> = ({ children }) => {

    //TO-DO:
    //  - Figure out how to use .env file to specifiy the path
    const app_name = 'steezee.xyz';

    const path: string = buildPath();

    function buildPath(): string {
        //"true" == server environment
        //"false" == localhost environment
        if (false) {
            return 'http://' + app_name + ':5000/';
        }
        else {
            return 'http://localhost:5000/';
        }
    }

    return (
        <PathContext.Provider value={path} >
            {children}
        </PathContext.Provider>
    )
};

export default PathProvider;