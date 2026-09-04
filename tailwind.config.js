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
        paper: '#F2F1EB',
        ink: '#1C2430',
        mustard: '#D98E04',
        field: '#3F6B4F',
        hairline: '#C9C4B',
      },
    },
 
  },
  darkMode: "class",
  plugins: [nextui()],
}
