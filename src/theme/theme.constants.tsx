import { createTheme, darken } from '@material-ui/core/styles'
import { sherpablue } from './ocPalette.constants'
import { sc_primary, sc_teal, sc_red, sc_gray, sc_blackAlpha } from './sitecorePalette.constants'

export const base_color_1 = '#171d52'
export const base_color_2 = '#19a5a2'
export const base_color_3 = '#d4cbba'
export const base_color_4 = '#084c61'
export const base_color_5 = '#0085eb'
export const base_color_6 = '#0db2db'
export const base_color_7 = '#00f2c2'
export const base_color_8 = '#ffd505'
export const base_accent_color = base_color_3
export const base_signature_color = '#fe2911'

export const brand_framework_x_light = '#e3e3e3'
export const brand_selection_bg_active = '#bfddf4'
export const brand_selection_text_active = '#11163e'
export const brand_selection_bg_active_hover = darken(
  brand_selection_bg_active,
  0.025
)
export const brand_selection_bg_hover = '#f0f0f0'
export const brand_signal_warning = '#fffa00'
export const brand_signal_warning_text = '#bfbc00'
export const brand_signal_success = '#11a31b'
export const brand_signal_error = '#ca241c'
export const brand_signal_info = '#0076d1'

const defaultTheme = createTheme()
const primaryColor = sc_primary[500]
const secondaryColor = sc_teal[500]
const error = sc_red[500]

export default createTheme({
  typography: {
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 700,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
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
    button: {
      fontWeight: 600,
    },
    fontFamily: [
      'AvenirNextR',
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
  shape: {
    borderRadius: 0,
  },
  palette: {
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: secondaryColor,
      contrastText: '#FFF',
    },
    error: {
      main: error,
    },
  },
  props: {
    MuiButton: {
      disableElevation: true,
    },
    MuiButtonBase: {
      disableRipple: true,
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        a: {
          color: primaryColor,
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline',
          },
        },
        '#RENDER_BOX a': {
          color: darken(secondaryColor, 0.25),
          fontWeight: defaultTheme.typography.fontWeightMedium,
        },
        '#RENDER_BOX img': {
          display: 'block',
          maxWidth: '100%',
          height: 'auto',
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
      },
    },
    MuiListItemText: {
      primary: {
        fontWeight: 600,
      },
      secondary: {
        color: 'black',
      },
    },
    MuiBreadcrumbs: {
      root: {
        paddingTop: '1rem',
        textDecoration: 'none',
      },
    },
    MuiButton: {
      root: {
        textTransform: 'none',
        borderRadius: 999,
      },
      outlinedSecondary: {
        borderColor: sc_blackAlpha[200],
        color: sc_gray[600],
        '&:hover':{
          borderColor: sc_blackAlpha[200],
          backgroundColor: sc_blackAlpha[100]
        }
      },
      label: {
        '& > img': {
          marginLeft: defaultTheme.spacing(1),
        },
      },
    },
    MuiTypography: {
      h1: {
        paddingTop: '1rem',
        marginBottom: '1rem',
        fontSize: '2rem',
      },
      h2: {
        paddingTop: '1.75rem',
        marginBottom: '0.5rem',
      },
      h3: {
        paddingTop: '1.5rem',
        marginBottom: '0.5rem',
      },
      h4: {
        paddingTop: '1.25rem',
        marginBottom: '0.5rem',
      },
    },
  },
})
