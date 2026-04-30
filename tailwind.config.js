/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['DM Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        surface: {
          0: '#ffffff',
          50: '#f9f9f8',
          100: '#f2f1ee',
          200: '#e8e6e1',
          300: '#d1cec8',
          600: '#6b6860',
          700: '#3d3c3a',
          900: '#1a1917',
        },
        dark: {
          0: '#1a1917',
          50: '#212120',
          100: '#2a2926',
          200: '#3a3936',
          300: '#4a4946',
          600: '#9b9890',
          700: '#c8c5bc',
          900: '#f2f1ee',
        },
        accent: {
          DEFAULT: '#d97706',
          hover: '#b45309',
          light: '#fef3c7',
        },
      },
      borderRadius: {
        card: '10px',
      },
      boxShadow: {
        card: '0 1px 3px 0 rgb(0 0 0 / 0.07), 0 1px 2px -1px rgb(0 0 0 / 0.05)',
        'card-hover': '0 4px 12px 0 rgb(0 0 0 / 0.10)',
        modal: '0 20px 60px -10px rgb(0 0 0 / 0.3)',
      },
    },
  },
  plugins: [],
}
