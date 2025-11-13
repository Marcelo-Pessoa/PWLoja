"use client";

import { createContext, ReactNode, useState } from "react";

interface UserSession {
  userId: string;
  userType: string;
  userName: string;
}

interface IAuthContext {
  user: UserSession | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const initialAuthContextData: IAuthContext = {
  user: null,
  login: async () => false,
  logout: async () => {},
};

const AuthContext = createContext<IAuthContext>(initialAuthContextData);

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(null);
  const login = async (email: string, password: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/login`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });
    if (res.status === 200) {
      const data = await res.json();
      setUser(data);
      return true;
    }

    return false;
  };

  const logout = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (res.ok) {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
