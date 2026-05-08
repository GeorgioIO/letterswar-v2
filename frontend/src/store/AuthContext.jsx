import { useState } from "react";
import { createContext } from "react";
import { loginRequest } from "../api/auth.api";
import { useEffect } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  isLoading: true,
  login: (data) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedJWTToken = localStorage.getItem("jwttoken");
    const storedAdmin = localStorage.getItem("admin");

    if (storedJWTToken && storedAdmin) {
      setAdmin(JSON.stringify(storedAdmin));
      setToken(storedJWTToken);
    }

    setIsLoading(false);
  }, []);

  async function login(loginData) {
    try {
      const data = await loginRequest(loginData);

      localStorage.setItem("jwttoken", data.token);
      localStorage.setItem("admin", JSON.stringify(data.admin));
      setAdmin(data.admin);
      setToken(data.token);
    } catch (error) {
      throw new Error(error.response?.data?.message || "Problem logging in");
    }
  }

  function logout() {
    localStorage.removeItem("jwttoken");
    localStorage.removeItem("admin");
    setAdmin(null);
    setToken(null);
  }

  const ctxValue = {
    isLoggedIn: admin !== null,
    isLoading,
    admin,
    token,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>
  );
}

export default AuthContextProvider;
