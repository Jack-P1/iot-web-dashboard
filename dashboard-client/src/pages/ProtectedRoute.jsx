import { Navigate } from "react-router-dom";
import { AuthContext } from "./Auth";
import React, {useContext, useState} from "react";
import { all } from "axios";

const RequireAuth = ({ children, allowedRoles }) => {
    const { token, user } = useContext(AuthContext);

    if (!token){
        return <Navigate to="/" />
    }

    if(allowedRoles && 
        (!user?.role || !allowedRoles.includes(user.role))
    ){
        return <Navigate to="/" />
    }

    return children;
};

export default RequireAuth;
