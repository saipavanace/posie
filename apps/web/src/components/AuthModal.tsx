"use client";

import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { X, Lock, Mail, User, Phone, Sparkles, ShieldCheck, CheckCircle2 } from "lucide-react";

export function AuthModal() {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalTab,
    setAuthModalTab,
    login,
    register,
    quickLogin,
  } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<"CLIENT" | "STAFF" | "BOOTH_RENTER" | "OWNER">("CLIENT");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    if (authModalTab === "login") {
      const res = await login(email, password);
      if (!res.success) {
        setError(res.error || "Authentication failed.");
      }
    } else {
      const res = await register({ name, email, password, role, phone });
      if (!res.success) {
        setError(res.error || "Registration failed.");
      }
    }
    setIsSubmitting(false);
  };

  const handleDemoClick = async (demoRole: "OWNER" | "STAFF" | "BOOTH_RENTER" | "CLIENT") => {
    setError(null);
    setIsSubmitting(true);
    await quickLogin(demoRole);
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#FAF9F5] border border-[#E5E0D8] rounded-2xl shadow-2xl overflow-hidden text-[#1E2522]">
        {/* Header */}
        <div className="p-6 bg-[#2D3B36] text-[#F8F6F0] relative">
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-5 right-5 p-1.5 rounded-full text-[#F8F6F0]/70 hover:text-[#F8F6F0] hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-[#C2A68D]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#C2A68D]">
              Atelier Posie Access
            </span>
          </div>
          <h2 className="text-2xl font-serif tracking-tight">
            {authModalTab === "login" ? "Welcome Back" : "Join the Atelier"}
          </h2>
          <p className="text-xs text-[#F8F6F0]/80 mt-1">
            {authModalTab === "login"
              ? "Sign in to manage appointments, clinical records, or your salon ledger."
              : "Create an account to book bespoke wellness treatments."}
          </p>

          {/* Quick Demo Login Badges */}
          <div className="mt-4 pt-3 border-t border-white/15">
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#C2A68D] block mb-2">
              ⚡ Instant 1-Click Demo Profiles (Pre-Seeded)
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleDemoClick("OWNER")}
                disabled={isSubmitting}
                className="flex items-center justify-center gap-1.5 py-1.5 px-2 bg-white/10 hover:bg-white/20 border border-white/15 rounded-lg text-white font-medium transition text-[11px]"
              >
                👑 Owner (Elena)
              </button>
              <button
                type="button"
                onClick={() => handleDemoClick("STAFF")}
                disabled={isSubmitting}
                className="flex items-center justify-center gap-1.5 py-1.5 px-2 bg-white/10 hover:bg-white/20 border border-white/15 rounded-lg text-white font-medium transition text-[11px]"
              >
                ✂️ Staff (Marcus)
              </button>
              <button
                type="button"
                onClick={() => handleDemoClick("BOOTH_RENTER")}
                disabled={isSubmitting}
                className="flex items-center justify-center gap-1.5 py-1.5 px-2 bg-white/10 hover:bg-white/20 border border-white/15 rounded-lg text-white font-medium transition text-[11px]"
              >
                🌿 Renter (Chloe)
              </button>
              <button
                type="button"
                onClick={() => handleDemoClick("CLIENT")}
                disabled={isSubmitting}
                className="flex items-center justify-center gap-1.5 py-1.5 px-2 bg-white/10 hover:bg-white/20 border border-white/15 rounded-lg text-white font-medium transition text-[11px]"
              >
                ✨ Client (Sophia)
              </button>
            </div>
          </div>
        </div>

        {/* Tab switchers */}
        <div className="flex border-b border-[#E5E0D8] bg-[#F1EFEA]">
          <button
            type="button"
            onClick={() => {
              setAuthModalTab("login");
              setError(null);
            }}
            className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider transition ${
              authModalTab === "login"
                ? "bg-[#FAF9F5] text-[#2D3B36] border-b-2 border-[#2D3B36]"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthModalTab("register");
              setError(null);
            }}
            className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider transition ${
              authModalTab === "register"
                ? "bg-[#FAF9F5] text-[#2D3B36] border-b-2 border-[#2D3B36]"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
              {error}
            </div>
          )}

          {authModalTab === "register" && (
            <>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Elena Rostova"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-[#D8D2C7] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2D3B36]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Account Type
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#D8D2C7] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2D3B36]"
                >
                  <option value="CLIENT">Client / Guest</option>
                  <option value="STAFF">Service Practitioner (W-2 Employee)</option>
                  <option value="BOOTH_RENTER">Independent Booth Renter (1099)</option>
                  <option value="OWNER">Salon Owner & Executive</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Phone Number (Optional)
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-[#D8D2C7] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2D3B36]"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@atelierposie.com"
                className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-[#D8D2C7] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2D3B36]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-[#D8D2C7] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2D3B36]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 mt-2 bg-[#2D3B36] hover:bg-[#232F2B] text-[#F8F6F0] rounded-lg font-medium text-sm transition shadow-sm disabled:opacity-50"
          >
            {isSubmitting
              ? "Processing..."
              : authModalTab === "login"
              ? "Sign In to Posie"
              : "Complete Registration"}
          </button>
        </form>

        {/* Footer info */}
        <div className="px-6 py-3 bg-[#F4F1EA] border-t border-[#E5E0D8] flex items-center justify-center gap-1.5 text-[11px] text-gray-500">
          <ShieldCheck className="w-3.5 h-3.5 text-[#2D3B36]" />
          <span>Encrypted with bcrypt & secure HTTP-only session tokens</span>
        </div>
      </div>
    </div>
  );
}
