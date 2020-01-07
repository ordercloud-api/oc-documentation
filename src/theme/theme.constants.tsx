import { createMuiTheme } from '@material-ui/core/styles'
import { sherpablue, seafoam, sizzlingred } from './ocPalette.constants'
import CoreSansWoff from '../assets/fonts/CoreSansD/CoreSansD_400/3A0B9A_8_0.woff'
import CoreSansWoff2 from '../assets/fonts/CoreSansD/CoreSansD_400/3A0B9A_8_0.woff2'
import GeometriaFonts from '../theme/theme.typography.geometria'

const CoreSans = {
  fontFamily: 'Core Sans',
  fontStyle: 'normal',
  fontDisplay: 'swap' as 'swap',
  fontWeight: 400,
  src: `url(${CoreSansWoff2}) format('woff2'), url(${CoreSansWoff}) format('woff')`,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
}

const defaultTheme = createMuiTheme()
const primaryColor = sherpablue
const secondaryColor = seafoam
const error = sizzlingred

const fontFamilies = [
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
]
const headingFontFamilies = ['"Geometria"', ...fontFamilies].join(',')
const bodyFontFamilies = ["'Core Sans'", ...fontFamilies].join(',')
export default createMuiTheme({
  typography: {
    h1: {
      fontSize: '3.5rem',
      fontFamily: headingFontFamilies,
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontFamily: headingFontFamilies,
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.5rem',
      fontFamily: headingFontFamilies,
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.25rem',
      fontFamily: headingFontFamilies,
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.15rem',
      fontFamily: headingFontFamilies,
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontFamily: headingFontFamilies,
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: '.875rem',
      fontFamily: headingFontFamilies,
      lineHeight: 1.5,
    },
    fontFamily: bodyFontFamilies,
  },
  palette: {
    primary: {
      main: primaryColor[400],
    },
    secondary: {
      main: secondaryColor[900],
      contrastText: '#FFF',
    },
    error: {
      light: error[300],
      main: error[500],
      dark: error[700],
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [CoreSans, ...GeometriaFonts],
        a: {
          color: secondaryColor[900],
        },
        code: {
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all',
        },
        pre: {
          whiteSpace: 'pre-wrap',
          workBreak: 'break-all',
        },
        mark: {
          padding: defaultTheme.spacing(0, 0.25),
          borderRadius: defaultTheme.shape.borderRadius,
          backgroundColor: secondaryColor[100],
          fontWeight: defaultTheme.typography.fontWeightMedium,
          color: defaultTheme.palette.getContrastText(
            defaultTheme.palette.background.paper
          ),
        },
      },
    },
    MuiTypography: {
      h1: {
        paddingTop: '2rem',
        marginBottom: '2rem',
        fontSize: '2.8rem',
      },
      h2: {
        paddingTop: '1.75rem',
        marginBottom: '0.5rem',
      },
      h3: {
        paddingTop: '1.5rem',
        marginBottom: '0.5rem',
      },
    },
  },
})
