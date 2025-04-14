import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
        'cm': '893px',
        'cs': '436px',
        'clg': '1445px',
        'clg2': '1445px',
        'cmd-8': '812px',
        'c-664': '664px',
        'c-450': '450px',
      }
    },
  },
  plugins: [],
} satisfies Config;
