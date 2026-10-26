/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#601733',
        'void-2': '#761B41',
        cream: '#FBF2ED',
        bougain: '#FF5C8A',
        'bougain-deep': '#C43D68',
        bordeaux: '#9E1345',
        'bordeaux-shine': '#F2789C',
        mustard: '#C68A2E',
        'mustard-deep': '#8A5D14',
        'mustard-hi': '#E3B564',
        'ink-dark': '#241019',
        blush: '#F4C6D3',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      maxWidth: {
        site: '1180px',
      },
      borderRadius: {
        glass: '22px',
      },
      backdropBlur: {
        glass: '22px',
      },
    },
  },
  plugins: [],
};
