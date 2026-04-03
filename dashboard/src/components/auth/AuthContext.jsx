import { createContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const API_BASE = `${import.meta.env.VITE_API_URL}/api/v1/auth`;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setLoading(false);
      return;
    }

    axios
      .get(`${API_BASE}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log("Auth check failed", err);
        localStorage.removeItem("accessToken");
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

 
  const login = (userData, token) => {
    localStorage.setItem("accessToken", token);
    setUser(userData);
  };

  
  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
