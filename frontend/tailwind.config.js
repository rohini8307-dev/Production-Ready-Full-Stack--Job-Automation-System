/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-main': '#FFFFFF',
        'bg-sidebar': '#F3F4F6',
        'bg-card': '#FFFFFF',
        'bg-card-hover': '#F9FAFB',
        'border-color': '#E5E7EB',
        'primary-maroon': '#D91656',
        'accent-brown': '#E07A5F',
        'accent-green': '#10B981',
      }
    },
  },
  plugins: [],
}
