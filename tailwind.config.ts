import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#e8eef7",
          100: "#c5d4eb",
          200: "#9eb8de",
          300: "#779cd1",
          400: "#5a87c8",
          500: "#3d72bf",
          600: "#2d5fad",
          700: "#1A3C6E", // Azul MAVTEC
          800: "#153060",
          900: "#0e2147",
          DEFAULT: "#1A3C6E",
        },
        secondary: {
          50: "#fff8e1",
          100: "#ffedb3",
          200: "#ffe082",
          300: "#ffd34f",
          400: "#ffc72a",
          500: "#F5A623", // Naranja MAVTEC
          600: "#e09015",
          700: "#c47800",
          800: "#a86300",
          900: "#8a4f00",
          DEFAULT: "#F5A623",
        },
        dark: "#111827",
        light: "#F9FAFB",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-montserrat)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
        "bounce-slow": "bounce 2s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      backgroundImage: {
        "hero-pattern": "url('/images/hero-bg.jpg')",
      },
    },
  },
  plugins: [],
};

export default config;
