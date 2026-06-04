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
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        "theme-primary": "#E30513",
        "baby-powder": "#FFFEF4",
        "dreamless-sleep": "#0D0D0D",
        "white-crest": "#f9f8ef",
        "dark-tone-ink": "#121212",
        "sea-nettle": "#f3763a",
        "night-blooming-jasmine": "#f8f7ec",
        "stamped-concrete": "#a09f99",
        "decorator-white": "#f6f5eb",
        "american-silver": "#cfcfcf",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
       lineHeight: {
        116: '116%',
        124: '124%',
        120: '120%',
      },
      backgroundImage: {
        'hero-gradient':
          'linear-gradient(180deg, #5D0023 0%, #CA0E1F 202.83%)',
      },
    },
  },
  plugins: [],
}