import { createMuiTheme } from '@material-ui/core/styles'
import { flame, seafoam, sherpablue, blackpearl } from './ocPalette.constants'
import CoreSansRegularWoff from '../assets/fonts/CoreSans/3A0B9A_8_0.woff'

const Geometria = {
  fontFamily: [
    '"Geometria"',
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
  ].join(','),
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 600,
  src: `
    local('Geometria'),
    url('../assets/fonts/Geometria/3A0B9A_23_0.woff') format('woff')
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
}

const GeometriaLight = {
  fontFamily: [
    '"Geometria"',
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
  ].join(','),
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 600,
  src: `
    local('Geometria'),
    url('../assets/fonts/Geometria/3A0B9A_21_0.woff') format('woff')
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
}

const CoreSans = {
  fontFamily: 'Core Sans D',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('Core Sans D'),
    url('../assets/fonts/CoreSans/3A0B9A_8_0.woff') format('woff')
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
}

const defaultTheme = createMuiTheme()
const primaryColor = sherpablue
const secondaryColor = seafoam

export default createMuiTheme({
  typography: {
    h1: {
      fontSize: '3.5rem',
      fontFamily: [
        '"Geometria"',
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
      ].join(','),
    },
    h2: {
      fontWeight: 'normal',
      fontSize: '2rem',
      fontFamily: [
        '"Geometria"',
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
      ].join(','),
    },
    h3: {
      fontSize: '1.5rem',
      fontFamily: [
        '"Geometria"',
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
      ].join(','),
    },
    h4: {
      fontSize: '1.25rem',
      fontFamily: [
        '"Geometria"',
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
      ].join(','),
    },
    h5: {
      fontSize: '1.15rem',
      fontFamily: [
        '"Geometria"',
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
      ].join(','),
    },
    h6: {
      fontSize: '1rem',
      fontFamily: [
        '"Geometria"',
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
      ].join(','),
    },
    fontFamily: [
      "'Core Sans D 35 Regular'",
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
    ].join(','),
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [GeometriaLight],
        a: {
          color: secondaryColor[900],
        },
        code: {
          whiteSpace: 'pre-wrap !important',
          wordBreak: 'break-all !important',
        },
        pre: {
          whiteSpace: 'pre-wrap !important',
          workBreak: 'break-all !important',
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
    MuiTable: {
      root: {
        marginBottom: '2rem',
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
      body1: {
        lineHeight: '1.75',
      }
    },
  },
  palette: {
    primary: {
      main: primaryColor[400],
    },
    secondary: {
      main: secondaryColor[900],
      contrastText: '#FFF',
    },
  },
})
