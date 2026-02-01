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
        "night-blooming-jasmine": "#f8f7ec",
        "stamped-concrete": "#a09f99",
        "decorator-white": "#f6f5eb",
        "american-silver": "#cfcfcf",
      },
      fontFamily: {
        primary: ["Panton", "sans-serif"],
        secondary: ["NexaRust", "sans-serif"],
      },
    },
  },

  plugins: [],
}