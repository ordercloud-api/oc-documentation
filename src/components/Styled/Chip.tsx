import Chip from '@material-ui/core/Chip'
import { withStyles, Theme, createStyles } from '@material-ui/core'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      height: theme.spacing(3),
    },
    label: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      fontFamily: theme.typography.caption.fontFamily,
      fontSize: theme.typography.caption.fontSize,
    },
  })

export default withStyles(styles)(Chip)
