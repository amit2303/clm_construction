/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        clm: {
          darkBg: '#0B0E14',
          darkSurface: '#141A24',
          darkCard: '#1A2332',
          primary: '#0F172A',
          amber: '#FF6B00',
          amberHover: '#E65100',
          gold: '#D4AF37',
          goldLight: '#FEF08A',
          muted: '#64748B',
          lightMuted: '#94A3B8',
          border: 'rgba(255, 255, 255, 0.08)',
          lightBg: '#F8FAFC',
          cardLight: '#FFFFFF',
          cardBorderLight: '#E2E8F0',
        }
      },
      fontFamily: {
        heading: ['Outfit', 'Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
