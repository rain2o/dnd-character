module.exports = {
  purge: [
    './src/**/*.vue',
  ],
  darkMode: false, // or 'media' or 'class'
  // darkMode: 'media',
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary))',
        secondary: 'rgb(var(--color-secondary))',
        // WIP: dnd theme (with dark)
        // 'dnd-black': 'rgb(var(--color-dnd-black))',
        // 'dnd-light': 'rgb(var(--color-dnd-light))',
        // 'dnd-lighter': 'rgb(var(--color-dnd-lighter))',
        // 'dnd-red': 'rgb(var(--color-dnd-red))',
        // 'dnd-blue': 'rgb(var(--color-dnd-blue))',
        // 'magic-brand-red': 'rgb(var(--color-magic-brand-red))',
        // 'magic-brand-orange': 'rgb(var(--color-magic-brand-orange))',
        bmac: '#FD0',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
