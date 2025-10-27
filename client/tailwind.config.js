// client/tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  // This tells Tailwind to scan all .js, .jsx, .ts, and .tsx files
  // in your 'src' directory and its subdirectories.
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}