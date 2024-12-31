/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url('/pexels-stywo-1054218.jpg')",
        "features-hero": "url('/pexels-danielabsi-952670.jpg')",
      },
      fontFamily: {
        body: ["Anton", "serif"],
      },
      backgroundColor: {
        mainBody: "#171B24",
      },
    },
  },
  plugins: [],
};
