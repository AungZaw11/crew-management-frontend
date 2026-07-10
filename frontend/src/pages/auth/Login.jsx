// src/pages/auth/Login.jsx
import React, { useState } from "react";
import { User, Lock, Anchor } from "lucide-react";
import { toast } from "react-toastify";
import { useLanguage } from "../../context/LanguageContext";
import LanguageSwitcher from "../../components/ui/LanguageSwitcher";
import api from "../../services/api";
import Wave from "../../components/ui/Wave";

export default function Login() {
  const { t } = useLanguage();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ===== HANDLE LOGIN =====
  const handleLogin = async (e) => {
    console.log("🔍 1. handleLogin called!");
    console.log("🔍 2. Event:", e);
    
    e.preventDefault();
    console.log("🔍 3. preventDefault called");

    if (!username || !password) {
      console.log("🔍 4. Username or password is empty");
      toast.error("Please enter username and password");
      return;
    }

    console.log("🔍 5. Username:", username);
    console.log("🔍 6. Password:", password);

    setLoading(true);
    console.log("🔍 7. Loading set to true");

    try {
      console.log("🔍 8. Creating API request...");
      console.log("🔍 9. API URL:", api.defaults.baseURL + "auth/sign");
      console.log("🔍 10. Request Data:", {
        username: username,
        password: password,
        device_id: "",
      });

      const response = await api.post("auth/sign", {
        username: username,
        password: password,
        device_id: "",
      });

      console.log("🔍 11. Response received!", response);
      console.log("🔍 12. Response Data:", response.data);
      console.log("🔍 13. Response Status:", response.status);

      if (response.data?.status === true) {
        console.log("🔍 14. Login successful!");
        const token = response.data.data?.token;
        console.log("🔍 15. Token:", token ? "Present" : "Missing");
        
        if (token) {
          localStorage.setItem("token", token);
          console.log("🔍 16. Token saved!");
          
          const saved = localStorage.getItem("token");
          console.log("🔍 17. Verification:", saved ? "✅ Yes" : "❌ No");
          
          if (saved) {
            toast.success("Login successful!");
            console.log("🔍 18. Redirecting...");
            window.location.href = "/dashboard";
          }
        }
      } else {
        console.error("❌ Login failed:", response.data?.message);
        toast.error(response.data?.message || "Login failed");
      }
    } catch (error) {
      console.error("❌ ERROR:", error);
      console.error("❌ Error Message:", error.message);
      console.error("❌ Error Code:", error.code);
      
      if (error.code === "ECONNABORTED") {
        toast.error("Request timeout! Backend server is not responding.");
      } else if (error.response) {
        console.error("❌ Error Response:", error.response);
        console.error("❌ Error Status:", error.response.status);
        console.error("❌ Error Data:", error.response.data);
        toast.error(error.response.data?.message || `Server error: ${error.response.status}`);
      } else if (error.request) {
        console.error("❌ No response from server");
        toast.error("Cannot connect to server. Please check your network.");
      } else {
        console.error("❌ Error Message:", error.message);
        toast.error(error.message || "Login failed");
      }
    } finally {
      setLoading(false);
      console.log("🔍 19. Loading finished");
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
          <LanguageSwitcher />
        </div>

        <div className="text-center mb-6 sm:mb-10">
          <h1 className="font-serif text-xl sm:text-2xl font-medium text-text tracking-tight">
            {t("sign_in")}
          </h1>
        </div>

        {/* ===== FORM - Check onSubmit ===== */}
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
              placeholder={t("user_name")}
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
              placeholder={t("password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 border border-border rounded-[6px] bg-surface text-sm text-text placeholder-text-light focus:outline-none focus:ring-1 focus:ring-brand-blue focus:border-brand-blue transition-shadow"
              required
            />
          </div>

          {/* ===== BUTTON - Check type ===== */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-muted text-white font-semibold text-sm tracking-wide py-2.5 sm:py-3 rounded-[6px] mt-4 sm:mt-6 hover:bg-brand-accent transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Loading..." : t("sign_in")}
          </button>
        </form>
      </div>
    </div>
  );
}