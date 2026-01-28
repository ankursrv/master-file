/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./templates/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "theme-primary": "#f26727",
        "baby-powder": "#FFFEF4",
        "dreamless-sleep": "#111111",
        "white-crest": "#f9f8ef",
        "dark-tone-ink": "#121212",
        "sea-nettle": "#f3763a",
      },
      fontFamily: {
        primary: ["Montserrat", "sans-serif"],
        secondary: ["NexaRust", "sans-serif"],
      },
    },
  },

  plugins: [],
}