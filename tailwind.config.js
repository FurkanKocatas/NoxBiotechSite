/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,html}"
  ],
  theme: {
    extend: {
      colors: {
        'old-brick': '#9c1f2d',
        'flamingo': '#ef4344',
        'scarlet-gum': '#32165f',
        'puce': '#c97791',
        'melanzane': '#3a051c',
        'sunglo': '#e05f6d',
        'violet': '#1e0634',
        'crown-of-thorns': '#761c2f',
        'grape': '#401e4e',
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


