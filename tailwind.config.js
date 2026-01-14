/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
      },
    },
    extend: {
      colors: {
        brand: {
          50: "#f5f8ff",
          100: "#e9efff",
          200: "#d6e0ff",
          300: "#b7c9ff",
          400: "#8aa6ff",
          500: "#5c82ff",
          600: "#3b64f5",
          700: "#2e4ed1",
          800: "#273fa3",
          900: "#22367f",
        },
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        soft: "0 8px 24px rgba(0,0,0,0.08)",
        subtle: "0 6px 16px rgba(0,0,0,0.06)",
      },
      backgroundImage: {
        "radial-fade":
          "radial-gradient(1200px 600px at 50% -200px, rgba(99,102,241,0.15), transparent)",
      },
    },
  },
  plugins: [],
};
