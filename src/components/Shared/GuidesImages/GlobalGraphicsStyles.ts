import { sherpablue } from '../../../theme/ocPalette.constants'
import { Theme } from '@material-ui/core'

const globalGraphicsStyles = (theme: Theme) => ({
  Paper: {
    margin: theme.spacing(8, 0, 16, 0),
    flexGrow: 1,
    padding: theme.spacing(8, 3, 6, 3),
    backgroundColor: sherpablue[100],
    position: 'relative' as 'relative',
  },
  chip: {
    padding: theme.spacing(2, 1),
    border: `1px solid ${sherpablue[50]}`,
    borderRadius: theme.spacing(7),
    position: 'absolute' as 'absolute',
    top: theme.spacing(-2),
    width: 'max-content',
  },
  chipCentered: {
    left: 0,
    right: 0,
    marginInline: 'auto' as 'auto',
  },
  chipUser: {
    padding: theme.spacing(2, 1),
    borderRadius: theme.spacing(7),
    border: `1px solid ${sherpablue[50]}`,
  },
  chipLabel: {
    fontFamily: theme.typography.h1.fontFamily,
    fontSize: theme.typography.h5.fontSize,
    textTransform: 'uppercase' as 'uppercase',
    letterSpacing: 2,
    paddingTop: 2,
  },
  secondaryContainer: {
    position: 'relative' as 'relative',
    padding: theme.spacing(6, 3),
    backgroundColor: sherpablue[200],
  },
  containerChip: {
    position: 'relative' as 'relative',
    textAlign: 'center' as 'center',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center' as 'center',
    color: theme.palette.text.secondary,
    backgroundColor: 'transparent',
  },
})

export default globalGraphicsStyles
