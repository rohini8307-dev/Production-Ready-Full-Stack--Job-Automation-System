/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-main': '#0B0E14',
        'bg-sidebar': '#0F131D',
        'bg-card': '#151A24',
        'bg-card-hover': '#1C2230',
        'border-color': '#1E2533',
        'primary-blue': '#3B82F6',
        'accent-gold': '#F59E0B',
        'accent-green': '#10B981',
      }
    },
  },
  plugins: [],
}
