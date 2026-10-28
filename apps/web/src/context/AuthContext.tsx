"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: "OWNER" | "STAFF" | "BOOTH_RENTER" | "CLIENT";
  title?: string;
  avatarUrl?: string;
  salon?: {
    id: string;
    name: string;
    slug: string;
    currency?: string;
    timezone?: string;
  };
}

interface AuthContextType {
  user: UserSession | null;
  loading: boolean;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalTab: "login" | "register";
  setAuthModalTab: (tab: "login" | "register") => void;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: { name: string; email: string; password: string; role?: string; phone?: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  quickLogin: (role: "OWNER" | "STAFF" | "BOOTH_RENTER" | "CLIENT") => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "register">("login");

  const refreshUser = async () => {
    try {
      const res = await fetch("/api/auth/me", { cache: "no-store" });
      const data = await res.json();
      if (data.authenticated && data.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, error: data.error || "Login failed" };
      }
      setUser(data.user);
      setIsAuthModalOpen(false);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || "Network error" };
    }
  };

  const register = async (payload: { name: string; email: string; password: string; role?: string; phone?: string }) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, error: data.error || "Registration failed" };
      }
      setUser(data.user);
      setIsAuthModalOpen(false);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || "Network error" };
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // ignore
    } finally {
      setUser(null);
    }
  };

  const quickLogin = async (role: "OWNER" | "STAFF" | "BOOTH_RENTER" | "CLIENT") => {
    const roleEmails: Record<string, string> = {
      OWNER: "owner@atelierposie.com",
      STAFF: "staff@atelierposie.com",
      BOOTH_RENTER: "renter@atelierposie.com",
      CLIENT: "client@atelierposie.com",
    };
    const email = roleEmails[role];
    if (email) {
      await login(email, "password123");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalTab,
        setAuthModalTab,
        login,
        register,
        logout,
        quickLogin,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
