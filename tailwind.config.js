/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xlg: "1180px",
        sm: "300px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "scale(0.5)" },
          "50%": { opacity: "0.5", transform: "scale(0.8)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 20s linear forwards",
      },
    },
  },
  plugins: [],
};
