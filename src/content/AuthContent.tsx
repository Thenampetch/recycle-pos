"use client";

import type React from "react";
import { createContext, useState, useContext, type ReactNode } from "react";
import type { User } from "../types";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Define hardcoded users with their respective redirect paths
const USERS = [
  {
    username: "001",
    password: "1111",
    name: "User One",
    redirectTo: "/membership",
  },
  {
    username: "002",
    password: "2222",
    name: "User Two",
    redirectTo: "/office",
  },
  {
    username: "003",
    password: "3333",
    name: "User Three",
    redirectTo: "/membership",
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    console.log("Login attempt:", username, password);

    // Check against our hardcoded users
    const foundUser = USERS.find(
      (u) => u.username === username && u.password === password
    );

    console.log("Found user:", foundUser);

    if (foundUser) {
      // Set the user in state
      setUser({
        id: foundUser.username,
        username: foundUser.username,
        name: foundUser.name,
      });

      console.log("Redirecting to:", foundUser.redirectTo);

      // Navigate to the appropriate page
      navigate(foundUser.redirectTo);
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    navigate("/"); // Navigate back to login page on logout
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
