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
        paper: {
          DEFAULT: "#f3eee8",
          hover: "#eae2d9",
          border: "#ddd2c7",
          surface: "#f8f5f2",
          text: "#4a4037",
          dark: "#1e293b",
        },
        rosegold: {
          50: "#fcf4e8",
          100: "#faead0",
          200: "#f6d7a1",
          300: "#f5c46f",
          400: "#f5b13c",
          500: "#e49e26",
          600: "#c17e0a",
          700: "#8e5d0a",
          800: "#5c3d09",
          900: "#2d1e05",
          DEFAULT: "#e49e26",
        },
        lightpurple: {
          50: "#f0eef6",
          100: "#e1dded",
          200: "#c4badd",
          300: "#a697cd",
          400: "#8873be",
          500: "#a395c8",
          600: "#55408b",
          700: "#403167",
          800: "#2b2243",
          900: "#151121",
          DEFAULT: "#a395c8",
        }
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
