// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#4F74BD",
        "brand-light": "#6B8FC9",
        "brand-lighter": "#E8F0FE",
        "brand-dark": "#1E3A6F",
        "brand-muted": "#4F74BD",
        "brand-accent": "#3A5A9E",
        "brand-navy": "#1E3A6F",
        "brand-blue": "#2563EB",
        surface: "#FFFFFF",
        "surface-alt": "#F8F9FA",
        text: "#1F2937",
        "text-main": "#1F2937",
        "text-dark": "#111827",
        "text-light": "#6B7280",
        border: "#E5E7EB",
        "status-red": "#EF4444",
        "status-green": "#10B981",
        "status-amber": "#F59E0B",
        "accent-red": "#EF4444",
        "accent-green": "#10B981",
        "accent-orange": "#F59E0B",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        dropdown:
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -1px rgb(0 0 0 / 0.06)",
      },
    },
  },
  plugins: [],
};
