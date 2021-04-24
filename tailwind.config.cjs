const { tailwindExtractor } = require("tailwindcss/lib/lib/purgeUnusedStyles");
const plugin = require('tailwindcss/plugin')
module.exports = {
	purge: {
		content: [
			"./src/**/*.{html,js,svelte,ts}",
		],
		options: {
			defaultExtractor: (content) => [
				// If this stops working, please open an issue at https://github.com/svelte-add/tailwindcss/issues rather than bothering Tailwind Labs about it
				...tailwindExtractor(content),
				// Match Svelte class: directives (https://github.com/tailwindlabs/tailwindcss/discussions/1731)
				...[...content.matchAll(/(?:class:)*([\w\d-/:%.]+)/gm)].map(([_match, group, ..._rest]) => group),
			],
			keyframes: true,
		},
	},
  theme: {
    extend: {
      fontFamily: {
        body: ['Raleway']
      },
      colors: {
        'primary':    '#0b327d',
        'secondary':  '#021973',
        'bgcolour':   '#8e8e8e',
        'textLight':  '#ececec',
        'textDark':   '#070206',
        'border':     '#5771d5',
        'selected':   '#158a69'
      },

      spacing: {
        '5': '1.125rem',
        '18': '4.5rem',
        '42': '10.5rem',
        '66': '16.5rem',
        '72': '18rem',
        '90': '22.5rem',
        '100': '25rem',
        '104': '26rem',
        '108': '27rem',
        '112': '28rem',
        '120': '30rem',
        '16/9': '56.25%'
      },
      scale: {
        '60': '0.6',
        '44': '0.44'
      },
      gridTemplateRows: {
      'auto': 'repeat(auto-fill, minmax(0,auto))',
      },

    },
  },
	variants: {

    extend: {
      backgroundColor: ['active'],
      transform: ['group-hover']
    },
  },
  plugins: [
    plugin(function({ addUtilities }) {
      const newUtilities = {
        '.preserve-3d': {
          'transform-style': 'preserve-3d',
        },
        '.perspective-1000' :{
          'perspective': '1000px',
        },
        '.backface-hidden' :{
        'backface-visibility': 'hidden',
        },
        '.rotate-y-0': {
          transform: 'rotateY(0deg)'
        },
        '.rotate-y-180': {
          transform: 'rotateY(180deg)'
        },
      }

      addUtilities(newUtilities, ['group-hover'])
    }),
    require('@tailwindcss/line-clamp')
  ],
}
