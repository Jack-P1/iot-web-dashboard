import { Navigate } from "react-router-dom";
import { AuthContext } from "./Auth";
import React, {useContext, useState} from "react";

const RequireAuth = ({ children }) => {
    const { token } = useContext(AuthContext);
    return token ? children : <Navigate to="/" />;
};

export default RequireAuth;
