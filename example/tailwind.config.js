const { nextui } = require('../src/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', '../src/**/*.{js,jsx,ts,tsx}'],
  theme: {},
  darkMode: 'class',
  presets: [require('nativewind/preset')],
  plugins: [nextui()],
}
