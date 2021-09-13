module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto-fit': 'repeat(auto-fit, minmax(0, 1fr))',
        'auto-fill': 'repeat(auto-fill, minmax(0, 1fr))',
        'grid-list': 'repeat(auto-fit, minmax(220px, 1fr))',
      },
      boxShadow: {
        'shadow-list': '0 0 7px 2px rgba(0, 0, 0, 0.3)',
        'nav-shadow': '0 8px 16px 0 rgba(0, 0, 0, 0.5)',
      },

      screens: {
        tablet: '900px',
        laptop: '1024px',
        desktop: '1280px',
        mobile: '600px',
        mobilexs: '370px',
      },
      width: {
        'half-width': '50vw',
        '80vw': '80vw',
        '70vw': '70vw',
      },
      height: {
        'half-height': '50vh',
      },
    },
    colors: {
      shadow: '#00000040',
      navbar: 'rgb(53, 162, 170)',
      cardcolor: '#dbdbdb4f',
      hoverpokemon: 'rgba(0, 176, 189, 0.336)',
      shadowbg: '#00000099',
      shadowhighligthed: '#00000080',
      lightblack: '#313131',
      gray: '#808080',
      lightgray: '#ebebeb',
      graybg: '#dbdbdb',
      white: '#ffffff',
      lightwhite: '#ffffff00',
      grayborder: '#70707040',
      bug: '#a8b820',
      dark: '#705746',
      dragon: '#6f35fc',
      electric: '#f7d02c',
      fairy: '#ee99ac',
      fighting: '#c22e28',
      fire: '#ee8130',
      flying: '#a98ff3',
      ghost: '#735797',
      grass: '#7ac74c',
      ground: '#e2bf65',
      ice: '#96d9d6',
      normal: '#a8a77a',
      poison: '#a33ea1',
      psychic: '#f95587',
      rock: '#b6a136',
      steel: '#b7b7ce',
      water: '#6390f0',
      unknown: '#68a090',
    },
  },
  variants: {
    extend: {
      imageRendering: ['responsive'],
      boxShadow: ['active'],
    },
  },
  plugins: [
    require('tailwindcss-image-rendering')(), // no options to configure
  ],
};
