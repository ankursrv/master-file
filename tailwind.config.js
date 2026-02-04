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
      backgroundImage: {
        "testimonial-gradient":
          "linear-gradient(180deg, rgba(17, 17, 17, 0) 0%, #111111 100%)",
      },
      fontSize:{
        "xxl":"1.75rem", //28px
        "3xxl": "2rem", //32px
        "4xxl": "2.5rem", //40px
      },
      margin:{
        "6px":"6px",
        "60px": "60px",
      },
      padding:{
        "section" : "100px",
        "section1": "120px",
      },
      gap:{
      "140": "140px",
      },
    },
  },

  plugins: [],
}