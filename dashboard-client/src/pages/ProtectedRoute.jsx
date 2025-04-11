import { Navigate } from "react-router-dom";
import { AuthContext } from "./Auth";
import React, {useContext, useState} from "react";

const RequireAuth = ({ children, allowedRoles }) => {
    const { token, user } = useContext(AuthContext);

    if (!token){
        return <Navigate to="/" />
    }

    if(allowedRoles && 
        (user?.role || !allowedRoles.include(user.role))
    ){
        return <Navigate to="/" />
    }

    return children;
};

export default RequireAuth;
