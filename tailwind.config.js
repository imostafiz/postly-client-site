import {nextui} from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
        title:["Qwitcher Grypen"],
        title2:["Yellowtail, cursive"]
      },
      colors: {
        surface: '#141414',
        border: '#2A2A2A',
        mustard: '#D98E04',
        field: '#3F6B4F',
      },
    },
 
  },
  darkMode: "class",
  plugins: [nextui()],
}
