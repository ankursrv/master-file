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
        'primary-blue': '#3B37FF',
        'seconday-blue': '#0B00CC',
        'primary-red': '#efefff',
        'gray-light': '#727272',
        'gray-dark': '#4F4F4F',
        'gray-table-bg': '#FAFAFA',
        'black-primary': '#111111',
        'american-silver': '#CFCFCF',
        'white-smoke': '#f5f5f5',
        'akabeni': '#C62828',
        'flash-of-orange': '#FFAB00',
        'buddha-green': '#36B37E',
        'shark-fin': '#969696',
        'tooltipbg': '#2F2F2F',
        'tricorn-black': '#2F2F2F',
        'snowbank': '#e9e9e9',

      },
      borderColor: {
        borderPrimary: '#CFCFCF',
        borderSecondary: '#3B37FF',
      },
    },
  },
  fontFamily: {
    primary: ["Montserrat", "sans-serif"],
    secondary: ["NexaRust", "sans-serif"],
  },
  plugins: [],
}