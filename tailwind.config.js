/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      fontSize: {
        '8xl': '4rem'
      },
      spacing: {
        'xs': '0.25rem',    // 4px
        'sm': '0.5rem',     // 8px
        'md': '1rem',       // 16px
        'lg': '1.5rem',     // 24px
        'xl': '2rem',       // 32px
        '2xl': '3rem',      // 48px
        '3xl': '4rem',      // 64px
      },
      colors: {
        'primary': colors.orange, // Replace with your desired hex color
      },
    },
  },
  plugins: [
    function ({ addUtilities, theme, variants }) {
      const newUtilities = {}
      Object.entries(theme('spacing')).forEach(([key, value]) => {
        newUtilities[`.m-${key}`] = { margin: value }
        newUtilities[`.mx-${key}`] = { marginLeft: value, marginRight: value }
        newUtilities[`.my-${key}`] = { marginTop: value, marginBottom: value }
        newUtilities[`.mt-${key}`] = { marginTop: value }
        newUtilities[`.mr-${key}`] = { marginRight: value }
        newUtilities[`.mb-${key}`] = { marginBottom: value }
        newUtilities[`.ml-${key}`] = { marginLeft: value }
        newUtilities[`.p-${key}`] = { padding: value }
        newUtilities[`.px-${key}`] = { paddingLeft: value, paddingRight: value }
        newUtilities[`.py-${key}`] = { paddingTop: value, paddingBottom: value }
        newUtilities[`.pt-${key}`] = { paddingTop: value }
        newUtilities[`.pr-${key}`] = { paddingRight: value }
        newUtilities[`.pb-${key}`] = { paddingBottom: value }
        newUtilities[`.pl-${key}`] = { paddingLeft: value }
      })
      addUtilities(newUtilities, variants('spacing'))
    }
  ],
}

