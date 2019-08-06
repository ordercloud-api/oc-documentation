import { createMuiTheme } from '@material-ui/core/styles'
import {
  ioblue,
  aliengreen,
  flame,
  seafoam,
  sherpablue,
  blackpearl,
} from './ocPalette.constants'

const CoreSans = {
  fontFamily: 'Roboto Mono',
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
    fontFamily: [
      'CoreSans',
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
          color: ioblue[500],
        },
      },
    },
  },
  palette: {
    primary: {
      main: blackpearl[400],
    },
    secondary: {
      main: seafoam[800],
      contrastText: '#FFF',
    },
  },
})
