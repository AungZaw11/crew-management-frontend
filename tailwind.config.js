// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-light': '#E8F0FE',
        'brand-muted': '#4F74BD',
        'brand-accent': '#3A5A9E',
        'brand-navy': '#1E3A6F',
        'brand-blue': '#2563EB',
        'surface': '#FFFFFF',
        'surface-off': '#F8F9FA',
        'text': '#1F2937',
        'text-dark': '#111827',
        'text-light': '#6B7280',
        'border': '#E5E7EB',
        'status-red': '#EF4444',
        'status-green': '#10B981',
        'status-amber': '#F59E0B',
        'status-blue': '#3B82F6',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'serif': ['Georgia', 'serif'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'card-hover': '0 10px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.02)',
      },
    },
  },
  plugins: [],
}