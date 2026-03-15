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
        limac: {
          black: "rgb(var(--limac-black) / <alpha-value>)",
          navy: "rgb(var(--limac-navy) / <alpha-value>)",
          blue: "rgb(var(--limac-blue) / <alpha-value>)",
          cyan: "rgb(var(--limac-cyan) / <alpha-value>)",
          green: "rgb(var(--limac-green) / <alpha-value>)",
          "green-logo": "rgb(var(--limac-green-logo) / <alpha-value>)",
          white: "rgb(var(--limac-white) / <alpha-value>)",
          muted: "rgb(var(--limac-muted) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["Manrope", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.4s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
