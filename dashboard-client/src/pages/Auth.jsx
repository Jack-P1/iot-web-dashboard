// https://dev.to/sanjayttg/jwt-authentication-in-react-with-react-router-1d03

import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : null);
    // const [token, setToken] = useState(sessionStorage.getItem("token") ? sessionStorage.getItem("token") : null);
    const [user, setUser] = useState(null);

    useEffect(() => {
      if (token) {
        axios.defaults.headers.common["authorization"] = `${token}`;
        localStorage.setItem("token", token);
        // sessionStorage.setItem('jwtToken', token);
        fetchUser();
      } else {
        delete axios.defaults.headers.common["authorization"];
        localStorage.removeItem("token");
        // sessionStorage.removeItem("token")
      }
    }, [token]);

    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:3000/api/user/`,
          { headers: { Authorization: token } });
        setUser({ id: res.data.id, name: res.data.username, role: res.data.roleName, company: res.data.companyName });
      } catch (err) {
        // TODO error handling
        console.log("User fetch failed", err);
      }
    };

    const logout = async () => {
      setToken(null);
      setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, token, setToken, setUser, logout }}>
          {children}
        </AuthContext.Provider>
      );
};

export default AuthProvider;