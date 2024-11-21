/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.{njk,md,html,js}",
    "./_includes/**/*.{njk,md,html,js}",
    "./_site/**/*.{njk,md,html,js}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}