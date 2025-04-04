import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("loggedInUser");
    if (storedToken) {
      setIsAuthenticated(true);
      setToken(storedToken);
      setUsername(storedUsername || "");
    }
  }, []);

  const login = (username, jwtToken) => {
    setIsAuthenticated(true);
    setUsername(username);
    setToken(jwtToken);
    localStorage.setItem("token", jwtToken);
    localStorage.setItem("loggedInUser", username);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername("");
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("redirectPath");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);