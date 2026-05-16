import { useState } from "react";
import { createContext } from "react";
import { loginRequest, logoutRequest, getMeRequest } from "../api/auth.api";
import { useEffect } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  isLoading: true,
  admin: {},
  login: (data) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function restoreSession() {
      try {
        const data = await getMeRequest();
        setAdmin(data.admin);
      } catch {
        setAdmin(null);
      } finally {
        setIsLoading(false);
      }
    }
    restoreSession();
  }, []);

  async function login(loginData) {
    try {
      const data = await loginRequest(loginData);

      setAdmin(data.admin);
    } catch (error) {
      throw new Error(error.response?.data?.message || "Problem logging in");
    }
  }

  async function logout() {
    try {
      await loginRequest();
    } catch {
    } finally {
      setAdmin(null);
    }
  }

  const ctxValue = {
    isLoggedIn: admin !== null,
    isLoading,
    admin,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>
  );
}

export default AuthContextProvider;
