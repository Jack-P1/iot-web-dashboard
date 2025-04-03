// https://dev.to/sanjayttg/jwt-authentication-in-react-with-react-router-1d03

import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : null);
    const [user, setUser] = useState(null);

    useEffect(() => {
      if (token) {
        axios.defaults.headers.common["Authorization"] = `${token}`;
        localStorage.setItem("token", token);
        fetchUser();
      } else {
        delete axios.defaults.headers.common["Authorization"];
        localStorage.removeItem("token");
      }
    }, [token]);

    const fetchUser = async () => {
      try {
        // TODO implement this properly
        //   const res = await axios.get("http://localhost:3000/api/protected", { withCredentials: true });
        setUser("TestUser");
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