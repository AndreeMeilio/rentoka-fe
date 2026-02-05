"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Loader2, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [status, setStatus] = useState({ loading: false, error: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ loading: true, error: "" });

    try {
      const response = await fetch(
        "https://rentoka.olifemassage.com/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Invalid credentials");
      }

      // DISINKRONKAN: Menggunakan kunci "token" untuk seluruh sistem
      localStorage.setItem("token", result.token);

      // Opsional: Menyimpan data profil provider
      if (result.data?.provider) {
        localStorage.setItem(
          "provider_info",
          JSON.stringify(result.data.provider),
        );
      }

      // Navigasi ke dashboard cars
      router.push("/dashboard/cars");
    } catch (err: any) {
      setStatus({ loading: false, error: err.message });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center gap-2">
            <span className="text-5xl font-black tracking-tighter text-black">
              RK
            </span>
            <div className="flex flex-col border-l-2 border-black pl-2">
              <span className="text-2xl font-bold tracking-[0.2em] uppercase leading-tight text-black">
                Rentoka
              </span>
              <div className="bg-black text-white text-[9px] font-medium text-center py-0.5 px-1 tracking-widest uppercase">
                レントカー
              </div>
            </div>
          </div>
          <p className="text-xs font-bold text-gray-400 mt-3 tracking-widest uppercase">
            Admin Dashboard Penyedia
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-extrabold text-gray-900">Sign In</h2>
          <p className="text-sm text-gray-500">
            Access your management apps by Rentoka Products.
          </p>
        </div>

        {status.error && (
          <div className="mb-6 flex items-center gap-3 p-4 text-sm text-red-700 bg-red-50 border border-red-100 rounded-xl">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <span className="font-semibold">{status.error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">
              Email
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-black transition-colors" />
              </div>
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@rentoka.com"
                className="w-full pl-10 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">
              Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-black transition-colors" />
              </div>
              <input
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={status.loading}
            className="w-full flex items-center justify-center py-4 bg-black text-white rounded-xl font-bold text-sm shadow-lg hover:bg-gray-800 active:scale-[0.98] transition-all disabled:bg-gray-400"
          >
            {status.loading ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : (
              "SIGN IN TO RENTOKA APPS"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
