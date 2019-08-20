import { createMuiTheme } from '@material-ui/core/styles'
import { flame, seafoam, sherpablue, blackpearl } from './ocPalette.constants'

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
    url('../assets/fonts/Geometria/Geometria-Bold.ttf' format('truetype'))
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
}

const CoreSans = {
  fontFamily: 'Core Sans',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('CoreSans'),
    url('../assets/fonts/CORESANSD35REGULAR.OTF' format('opentype'))
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
}

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
      '"CoreSans"',
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
        a: {
          color: flame[500],
        },
        mark: {
          color: 'white',
          backgroundColor: flame[400],
        },
      },
    },
    MuiTable: {
      root: {
        marginBottom: '2rem',
      },
    },
    MuiTypography: {
      root: {
        // marginBottom: '0.5rem',
        // @bob, this ^^^^ and this ⌄⌄⌄⌄ is not a good idea.
      },
      body1: {
        // marginBottom: '1rem',
      },
      h1: {
        paddingTop: '2rem',
        marginBottom: '2rem',
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
  palette: {
    primary: {
      main: blackpearl[400],
    },
    secondary: {
      main: flame[400],
      contrastText: '#FFF',
    },
  },
})
