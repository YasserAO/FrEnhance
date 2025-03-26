/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url('/background.jpg')",
      },
      fontFamily: {
        body: ["Anton", "serif"],
      },
      backgroundColor: {
        mainBody: "#171B24",
      },
      boxShadow: {
        inSet: "inset 0 0 2px 2px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};
