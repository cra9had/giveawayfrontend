/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg_color": "var(--tg-theme-bg-color, #FFFFFF)",
        "secondary_bg_color": "var(--tg-theme-secondary-bg-color, #FAFAFA)",
        "text_color": "var(--tg-theme-text-color, #000000)",
        "blue_color": "#007AFF",
        "orange_color": "#F45A0E",
      },
      fontFamily: {
        'gilroy': ['Gilroy', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
      },
      fontWeight: {
        'light': 300,
        'regular': 400,
        'medium': 500,
        'bold': 600,
        'semibold': 700,
      }
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
