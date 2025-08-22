module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        champagne: "#EADCAE",
        gold: "#D4AF37",
        deep: "#3C3220",
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "Arial"]
      }
    },
  },
  plugins: [],
};
