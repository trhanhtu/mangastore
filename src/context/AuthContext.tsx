import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextProps {
  userId: string | null;
  userEmail: string | null;
  userAvatar: string | null;
  role: string | null;
  token: string | null;
  setAuthInfo: (id: string, email: string, avatar: string, token: string, role: string) => void;
  clearAuthInfo: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const nav = useNavigate()

  useEffect(() => {
    const fetchAuth = async () => {
      const id = await localStorage.getItem("userId");
      const email = await localStorage.getItem("userEmail");
      const avatar = await localStorage.getItem("userAvatar");
      const role = await localStorage.getItem("role");
      const token = await localStorage.getItem("token");
  
      if (id && email && avatar && token && role) {
        setUserId(id);
        setUserEmail(email);
        setUserAvatar(avatar);
        setRole(role)
        setToken(token)
      }
    }
    fetchAuth()
  }, []);

  const setAuthInfo = async (id: string, email: string, avatar: string, token: string, role: string) => {
    await localStorage.setItem("userId", id);
    await localStorage.setItem("userEmail", email);
    await localStorage.setItem("userAvatar", avatar);
    await localStorage.setItem("role", role);
    await localStorage.setItem("token", token);

    setUserId(id);
    setUserEmail(email);
    setUserAvatar(avatar);
    setToken(role);
    setToken(token);

    nav('/home');
  };

  const clearAuthInfo = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userAvatar");
    localStorage.removeItem("role");
    localStorage.removeItem("token");

    setUserId(null);
    setUserEmail(null);
    setUserAvatar(null);
    setRole(null);
    setToken(null);

    nav('/')
  };

  return (
    <AuthContext.Provider value={{ userId, userEmail, userAvatar, token, role, setAuthInfo, clearAuthInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
