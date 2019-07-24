import { Link } from 'gatsby'
import React from 'react'
import {
  Theme,
  createStyles,
  withStyles,
  Typography,
  SvgIcon,
  Grid,
} from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { mediumgrey } from '../../theme/ocPalette.constants'
const styles = (theme: Theme) =>
  createStyles({
    ocFooter: {
      width: '100vw',
      backgroundColor: mediumgrey[50],
      border: '2px solid',
      borderColor: mediumgrey[100],
      flexDirection: 'column',
      alignItems: 'stretch',
      display: 'flex',
    },
    Typography: {
      color: mediumgrey[800],
      justifySelf: 'flex-start',
    },
    footerContainer: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    footerLogo: {
      maxWidth: 50,
      maxHeight: 50,
    },
    footerLogoSvg: {
      height: 'auto',
      width: '100%',
      fill: mediumgrey[500],
      '&:hover': {
        fill: theme.palette.primary.main,
      },
    },
    linkGroup: {
      display: 'flex',
      justifySelf: 'flex-end',
      alignItems: 'center',
      '& > *': {
        margin: '0 .5rem',
        color: mediumgrey[800],
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'underline',
          color: theme.palette.primary.main,
        },
      },
    },
  })

class Footer extends React.Component<any> {
  public render() {
    const { siteTitle, classes } = this.props
    return (
      <footer className={classes.ocFooter}>
        <Toolbar className={classes.footerContainer}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Typography className={classes.Typography}>
                © 2019 OrderCloud All rights reserved.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div className={classes.linkGroup}>
                <Link to="/">Terms</Link>
                <Link to="/">Privacy Policy</Link>
                <Link to="/">Slack Community</Link>
                <Link to="/">Four51</Link>
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </footer>
    )
  }
}

export default withStyles(styles)(Footer)
