/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'pnl-blue': '#1e40af',
        'pnl-red': '#dc2626',
        'pnl-green': '#16a34a',
        'pnl-purple': '#9333ea',
        'pnl-yellow': '#ca8a04',
        'pnl-teal': '#0d9488'
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
  safelist: [
    'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-yellow-500', 'bg-teal-500',
    'text-red-500', 'text-blue-500', 'text-green-500', 'text-purple-500', 'text-yellow-500', 'text-teal-500',
    'from-red-500', 'from-blue-500', 'from-green-500', 'from-purple-500', 'from-yellow-500', 'from-teal-500',
    'to-red-600', 'to-blue-600', 'to-green-600', 'to-purple-600', 'to-yellow-600', 'to-teal-600'
  ]
}
