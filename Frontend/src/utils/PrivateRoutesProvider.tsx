import { Navigate, Outlet } from 'react-router-dom'
import React, { useContext } from "react";
import { AuthContext } from './AuthProvider';


export default function PrivateRoutes() {
    let authInfo = useContext(AuthContext);


    if (!authInfo) {
        throw new Error("useContext must be used within an AuthProvider");
    }

    return (
        authInfo.auth.username ? <Outlet /> : <Navigate to="/login" />
    );
}

