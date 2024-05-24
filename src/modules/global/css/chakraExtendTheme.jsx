import { extendTheme } from '@chakra-ui/react';

const ExtendedTheme = extendTheme({
	// style object for base or default style
	baseStyle: {
		fonts: {
			heading: '"Poppins", sans-serif',
			body: '"Poppins", sans-serif',
		},
	},
	breakpoints: {
		smallDevice: '560px',
		mediumDevice: '768px',
		lg: '1023px',
		xl: '1368px',
		'2xl': '1536px',
	},
	// styles for different sizes ("sm", "md", "lg")
	sizes: {},
	// styles for different visual variants ("outline", "solid")
	variants: {},
	// default values for `size` and `variant`
	defaultProps: {
		size: '',
		variant: '',
	},

	styles: {
		global: {
			html: {
				fontSize: '62.5%',
				fontFamily: 'Poppins, sans-serif',
			},
			body: {
				fontSize: '1.5rem',
				fontFamily: 'Poppins, sans-serif',
				lineHeight: '2.1rem',
				fontWeight: '400',
				marginRight: '0 !important',
			},
			p: {
				fontSize: '1.5rem',
				lineHeight: '2.1rem',
				fontWeight: '400',
				fontFamily: 'Poppins, sans-serif',
			},
			img: {
				maxWidth: '100%',
				height: 'auto',
			},
			a: {
				transition: 'all 0.4s ease-in-out',
				_hover: {
					transition: 'all 0.4s ease-in-out',
				},
			},
			h1: {
				fontSize: '2rem',
				fontFamily: 'Poppins, sans-serif',
			},
			h2: {
				fontSize: '1.5rem',
				fontFamily: 'Poppins, sans-serif',
			},
		},
	},
	colors: {
		mainBlue: 'rgba(0,48,96,1)',
		mainBluemedium: 'rgba(0,70,141,1)',
		mainBlueLight: 'rgba(219,229,238,1)',
		veryLightBlueColor: 'rgba(226,232,240,1)',
		mainLightModeBackgroundColor: 'rgba(242,242,242,1)',
		mainLightModeDeepBackgroundColor: 'rgba(233, 233, 233, 1)',
		mainSucessGreen: 'rgba(10,179,156,1)',
		mainLightBlue: 'rgb(219 229 238)',
		mainErrorRed: 'rgba(240,101,72,1)',
		inputplaceholderColor: 'rgba(114,126,151,1)',
		textBlack: 'rgba(44, 48, 56,1)',
		textBlackDeep: 'rgba(44, 48, 56,1)',
		textGray: 'rgba(115, 115, 115,0.87)',
		buttonBoxshadow: 'rgba(0, 0, 0, 0.24) 0px 1px 8px',
		borderGrayLight: 'rgba(222,226,230,1)',
		borderGrayDeep: 'rgba(0,0,0,0.17)',
	},
	textStyles: {
		h1: {
			// you can also use responsive styles
			fontSize: '2rem',
			fontWeight: 'bold',
		},
		h2: {
			fontSize: '1.5rem',
			fontWeight: 'semibold',
		},
		button: {
			fontFamily: 'Montserrat, sans-serif',
			fontSize: '1.5rem',
			transition: 'all 0.4s ease-in-out',
			border: '1px solid transparent',
			_hover: {
				transition: 'all 0.4s ease-in-out',
			},
		},
		input: {
			fontSize: '1.3rem',
		},
		label: {
			fontSize: '1.3rem',
		},
	},
});

export default ExtendedTheme;
