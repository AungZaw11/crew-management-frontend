// src/pages/auth/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, ChevronDown, Anchor } from "lucide-react";
import { toast } from "react-toastify";
import api from "../../services/api";
import Wave from "../../components/ui/Wave";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/auth/login", {
        user_id: username,
        password: password,
      });

      if (response.data.status) {
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
        toast.success("✅ Login successful!");
        navigate("/crew");
      } else {
        toast.error("❌ " + (response.data.message || "Login failed"));
      }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "Login failed. Please check your credentials.";
      toast.error("❌ " + msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-brand-light to-[#4F74BD] px-4 sm:px-6">
      <Wave />

      <div className="w-full max-w-[400px] sm:max-w-[480px] md:max-w-[558px] bg-surface rounded-[10px] shadow-card p-6 sm:p-8 md:p-10 z-10 relative animate-scale-in">
        <div className="flex justify-between items-start mb-6 sm:mb-8">
          <div className="w-12 sm:w-16 h-8" />
          <div className="flex flex-col items-center gap-2 text-brand-navy">
            <Anchor className="w-10 h-10 sm:w-12 sm:h-12" />
          </div>
          <button className="flex items-center gap-1.5 sm:gap-2 bg-brand-light px-2 py-1 sm:px-3 sm:py-1.5 rounded-[4px] hover:bg-blue-100 transition-colors text-xs sm:text-sm">
            <span className="font-medium text-text">EN</span>
            <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-brand-muted" />
          </button>
        </div>

        <div className="text-center mb-6 sm:mb-10">
          <h1 className="font-serif text-xl sm:text-2xl font-medium text-text tracking-tight">
            Sign In
          </h1>
        </div>

        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-4 sm:gap-6 px-0 sm:px-4 md:px-12"
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-4 w-4 sm:h-5 sm:w-5 text-[#434750]" />
            </div>
            <input
              type="text"
              placeholder="User Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 border border-border rounded-[6px] bg-surface text-sm text-text placeholder-text-light focus:outline-none focus:ring-1 focus:ring-brand-blue focus:border-brand-blue transition-shadow"
              required
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-[#434750]" />
            </div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 border border-border rounded-[6px] bg-surface text-sm text-text placeholder-text-light focus:outline-none focus:ring-1 focus:ring-brand-blue focus:border-brand-blue transition-shadow"
              required
            />
          </div>

          <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2 mt-1">
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="w-3.5 h-3.5 rounded-[2px] border border-brand-blue bg-brand-blue flex items-center justify-center">
                <svg
                  className="w-2.5 h-2.5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-xs font-light text-text group-hover:text-brand-navy transition-colors">
                Remember Me
              </span>
            </label>
            <a
              href="#"
              className="text-xs font-light text-text hover:text-brand-navy transition-colors"
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-muted text-white font-semibold text-sm tracking-wide py-2.5 sm:py-3 rounded-[6px] mt-4 sm:mt-6 hover:bg-brand-accent transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
