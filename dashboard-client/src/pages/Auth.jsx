// https://dev.to/sanjayttg/jwt-authentication-in-react-with-react-router-1d03

import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() =>
    localStorage.getItem("token") ? localStorage.getItem("token") : null
  );

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["authorization"] = `${token}`;
      localStorage.setItem("token", token);
      fetchUser();
    } else {
      delete axios.defaults.headers.common["authorization"];
      localStorage.removeItem("token");
      setUser(null);
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:3000/api/user/`, {
        headers: { Authorization: token },
      });
      setUser({
        id: res.data.id,
        name: res.data.username,
        role: res.data.roleName,
        company: res.data.companyName,
      });
    } catch (err) {
      console.log("User fetch failed", err);
    }
  };

  const logout = async () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, setToken, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
