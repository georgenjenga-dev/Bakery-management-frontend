import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axiosConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/admin/profile");
        setAdmin(response.data);
      } catch (error) {
        console.error("Authentication check failed:", error);

        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        setAdmin(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);
  
  const login = async (email, password) => {
    const response = await api.post("/admin/login", {
      email,
      password,
    });

    const { access_token, refresh_token, admin } = response.data;

    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);

    setAdmin(admin);

    return admin;
  };
  
   const logout = async () => {
    try {
      await api.post("/admin/logout");
    } catch (error) {
      console.error(error);
    } finally {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

      setAdmin(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};