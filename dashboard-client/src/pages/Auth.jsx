// https://dev.to/sanjayttg/jwt-authentication-in-react-with-react-router-1d03

import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    // const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : null);
    const [token, setToken] = useState(sessionStorage.getItem("token") ? sessionStorage.getItem("token") : null);
    const [user, setUser] = useState(null);

    useEffect(() => {
      if (token) {
        axios.defaults.headers.common["authorization"] = `${token}`;
        // localStorage.setItem("token", token);
        sessionStorage.setItem('jwtToken', token);
        fetchUser();
      } else {
        delete axios.defaults.headers.common["authorization"];
        // localStorage.removeItem("token");
        sessionStorage.removeItem("token")
      }
    }, [token]);

    const fetchUser = async () => {
      try {
        // TODO implement this properly
        //   const res = await axios.get("http://localhost:3000/api/protected", { withCredentials: true });
        setUser({name: "TestUser", role: "User"});
      } catch (err) {
        console.log("User fetch failed", err);
      }
    };

    return (
        <AuthContext.Provider value={{ user, token, setToken, setUser }}>
          {children}
        </AuthContext.Provider>
      );
};

export default AuthProvider;