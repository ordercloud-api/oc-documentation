import { Link } from 'gatsby'
import React from 'react'
import { Theme, createStyles, withStyles } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { darkgrey } from '../../theme/ocPalette.constants'
const styles = (theme: Theme) =>
  createStyles({
    footer: {
      minHeight: '10vh',
      backgroundColor: darkgrey[500],
    },
  })

class Footer extends React.Component<any> {
  public render() {
    const { classes } = this.props
    return (
      <AppBar className={classes.footer} color="primary" position="sticky">
        <Toolbar></Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(Footer)
