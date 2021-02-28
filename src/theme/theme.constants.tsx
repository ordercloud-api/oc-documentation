import { createMuiTheme } from '@material-ui/core/styles'
import { sherpablue, seafoam, sizzlingred } from './ocPalette.constants'
import CoreSansDFonts from '../theme/theme.typography.coresansd'
import GeometriaFonts from '../theme/theme.typography.geometria'
import { upperCase } from 'lodash'

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
const bodyFontFamilies = ["'Core Sans D'", ...fontFamilies].join(',')
export default createMuiTheme({
  typography: {
    h1: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.15rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: '.875rem',
      lineHeight: 1.5,
    },
    fontFamily: [
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
        a: {
          color: secondaryColor[900],
          textDecoration: 'none',
          // '&:hover': {
          //   textDecoration: 'underline'
          // }
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
    MuiAppBar: {
      root: {
        backgroundColor: sherpablue[500],
      },
      colorPrimary: {
        backgroundColor: sherpablue[500],
      }
    },
    // MuiButton: {
    //   label: {
    //     paddingTop: navigator.appVersion.includes('Mac') ? 2 : undefined,
    //   },
    // },
    MuiListItemText: {
      primary: {
        fontWeight: 600,
        color: primaryColor[500],
      },
      secondary: {
        color: 'black',
      }
    },
    MuiBreadcrumbs: {
      root: {
        paddingTop: '1rem',
        textDecoration: 'none'
      },
    },
    MuiTypography: {
      h1: {
        paddingTop: '1rem',
        marginBottom: '1rem',
        fontSize: '2rem',
        color: seafoam[600],
        textTransform: 'uppercase',
      },
      h2: {
        paddingTop: '1.75rem',
        marginBottom: '0.5rem',
        color: primaryColor[400],
      },
      h3: {
        paddingTop: '1.5rem',
        marginBottom: '0.5rem',
        color: primaryColor[400],
      },
      h4: {
        paddingTop: '1.25rem',
        marginBottom: '0.5rem',
        color: primaryColor[400],
      },
      caption: {
        color: primaryColor[300]
      }
    },
  },
})
