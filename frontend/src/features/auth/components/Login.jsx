// src/features/auth/components/Login.jsx
import React, { useState } from "react";
import { User, Lock, Anchor } from "lucide-react";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import LanguageSwitcher from "../../../common/components/LanguageSwitcher";
import Wave from "../../../common/components/Wave";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const { t } = useLanguage();
  const { login, loading } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      // Error handled by hook
      return;
    }

    setIsSubmitting(true);
    const result = await login({ username, password, device_id: "" });
    setIsSubmitting(false);

    if (result.success) {
      window.location.href = "/dashboard";
    }
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-brand-light to-[#4F74BD] px-4 sm:px-6">
      <Wave />

      <div className="w-full max-w-[400px] sm:max-w-[480px] md:max-w-[558px] bg-surface rounded-[10px] shadow-card p-6 sm:p-8 md:p-10 z-10 relative animate-scale-in">
        {/* Top Row */}
        <div className="flex justify-between items-start mb-6 sm:mb-8">
          <div className="w-12 sm:w-16 h-8" />
          <div className="flex flex-col items-center gap-2 text-brand-navy">
            <Anchor className="w-10 h-10 sm:w-12 sm:h-12" />
          </div>
          <LanguageSwitcher />
        </div>

        {/* Heading */}
        <div className="text-center mb-6 sm:mb-10">
          <h1 className="font-serif text-xl sm:text-2xl font-medium text-text tracking-tight">
            {t("sign_in")}
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-6 px-0 sm:px-4 md:px-12">
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

          <button
            type="submit"
            disabled={isSubmitting || loading}
            className="w-full bg-brand-muted text-white font-semibold text-sm tracking-wide py-2.5 sm:py-3 rounded-[6px] mt-4 sm:mt-6 hover:bg-brand-accent transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting || loading ? t("loading") : t("sign_in")}
          </button>
        </form>
      </div>
    </div>
  );
}