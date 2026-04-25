/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#84cc16',
        secondary: '#65a30d',
        accent: '#a3e635',
      },
    },
  },
  plugins: [],
}
