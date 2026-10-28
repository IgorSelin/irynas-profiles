import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Palette taken from the Lviv coat of arms: a golden lion on a blue field
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        night: '#0E1B3D',
        abyss: '#091230',
        ink: '#131A2C',
        stone: '#EEF0F4',
        azure: {
          50: '#EEF2FC',
          100: '#DCE4F8',
          200: '#B9C8F0',
          300: '#8CA4E4',
          400: '#5B7BD3',
          500: '#3A5CC2',
          600: '#2A4BB0',
          700: '#223D90',
          800: '#1C3175',
          900: '#16265A',
        },
        gold: {
          100: '#FBF0D2',
          200: '#F5DE9C',
          300: '#EDC965',
          400: '#E2B33C',
          500: '#C99A26',
          600: '#A47B1C',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
        display: ['var(--font-display)', ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'line-up': {
          from: { transform: 'translateY(105%)' },
          to: { transform: 'translateY(0)' },
        },
        'lens-open': {
          from: { clipPath: 'inset(18% 22% 18% 22% round 28px)', transform: 'scale(1.08)' },
          to: { clipPath: 'inset(0% 0% 0% 0% round 28px)', transform: 'scale(1)' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.6s linear infinite',
        'line-up': 'line-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
        'lens-open': 'lens-open 1.3s cubic-bezier(0.65, 0, 0.35, 1) both',
        'fade-in': 'fade-in 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
};
export default config;
