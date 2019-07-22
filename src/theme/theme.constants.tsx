import { createMuiTheme } from '@material-ui/core/styles'
import { ioblue, aliengreen } from './ocPalette.constants'

const GothicA1 = {
  fontFamily: 'Gothic A1',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('GothicA1'),
    url(https://fonts.googleapis.com/css?family=Gothic+A1:200,400,600,700&display=swap' format('woff2')
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
}

export default createMuiTheme({
  typography: {
    fontFamily: [
      'Gothic A1',
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
        '@font-face': [GothicA1],
      },
    },
  },
  palette: {
    primary: {
      main: ioblue[500],
    },
    secondary: {
      main: aliengreen[300],
      contrastText: '#FFF',
    },
  },
})
