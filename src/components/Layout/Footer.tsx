import { Link } from 'gatsby'
import React from 'react'
import {
  Theme,
  createStyles,
  withStyles,
  Typography,
  SvgIcon,
} from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { mediumgrey } from '../../theme/ocPalette.constants'
const styles = (theme: Theme) =>
  createStyles({
    ocFooter: {
      position: 'fixed',
      bottom: 0,
      width: '100vw',
      backgroundColor: mediumgrey[50],
      flexDirection: 'column',
      alignItems: 'stretch',
      display: 'flex',
    },
    footerContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      justifyItems: 'center',
    },
    Typography: {
      color: mediumgrey[800],
      justifySelf: 'flex-start',
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
      '& > *': {
        margin: '0 .5rem',
        color: mediumgrey[800],
        '&:hover': {
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
          <Typography className={classes.Typography}>
            © 2019 OrderCloud All rights reserved.
          </Typography>
          <Link className={classes.footerLogo} to="/">
            <SvgIcon
              className={classes.footerLogoSvg}
              titleAccess={siteTitle}
              viewBox="0 0 200 200"
            >
              <path d="M141.5 83.5c.3.5.1 1-.5 1.2l-10.8 4.9c-.6.3-1.1.1-1.4-.5-1.9-4.4-5.1-7.6-10.7-7.6-5.3 0-8.6 2.8-10.1 7.4-.8 2.5-1.1 4.9-1.1 14.5v2c-.1 8.6-.5 12.1-1.9 16.5-1.2 3.8-3.1 6.8-5.5 9.3-4.7 4.7-11.3 7.1-19.1 7.1-11.8 0-21.1-5.5-24.6-16.4-1.5-4.7-1.9-8.4-1.9-18.4 0-10 .4-13.8 1.9-18.4C59.4 74 68.7 68.5 80.5 68.5c4.8 0 9.2.9 13 2.8-2.8 3.2-5 7-6.5 11.5l-.1.4c-1.7-1.1-3.9-1.7-6.4-1.7-5.6 0-9.1 2.8-10.6 7.4-.8 2.4-1.1 5.7-1.1 14.5s.3 12.1 1.1 14.5c1.5 4.7 5.1 7.4 10.6 7.4 5.6 0 9.1-2.8 10.6-7.4.8-2.4 1.1-5.7 1.1-14.5v-2.2c.1-8.7.5-12 1.9-16 1.2-3.8 3.1-7 5.5-9.5 4.5-4.7 10.8-7.1 18.5-7.1 11.3-.1 19.7 5.5 23.4 14.9zm.4-19.6l-.1.5.1.1h1.3v4l.1.1h.5l.1-.1v-4h1.3l.1-.1V64l-.1-.1h-3.3zM141 122l-10.8-4.9c-.6-.3-1.1-.1-1.4.5-1.9 4.4-5.1 7.6-10.7 7.6-2.4 0-4.3-.6-5.9-1.6l-.1.4c-1.4 4.4-3.7 8.3-6.6 11.4 3.6 1.8 7.8 2.7 12.5 2.7 11.4 0 19.7-5.6 23.5-15 .3-.4.1-.9-.5-1.1zm43.5-22c0 23.3-9.5 44.5-24.7 59.8-15.3 15.3-36.4 24.8-59.8 24.7-23.3 0-44.5-9.5-59.8-24.7C25 144.5 15.5 123.3 15.5 100c0-23.3 9.5-44.5 24.7-59.8C55.5 25 76.7 15.5 100 15.5c23.3 0 44.5 9.5 59.8 24.7 15.2 15.3 24.7 36.5 24.7 59.8zm-13 0c0-19.8-8-37.6-20.9-50.6-13-12.9-30.8-20.9-50.6-20.9s-37.6 8-50.6 20.9c-12.9 13-20.9 30.8-20.9 50.6s8 37.6 20.9 50.6c13 12.9 30.8 20.9 50.6 20.9s37.6-8 50.6-20.9c12.9-13 20.9-30.8 20.9-50.6zm-22-36.1l-.1.1-1.4 3.2-1.4-3.2-.1-.1h-.5l-.1.1v4.5l.1.1h.4l.1-.1v-3.3l1.2 2.6.1.1h.3l.1-.1 1.2-2.6v3.3l.1.1h.4l.1-.1V64l-.1-.1h-.4z" />
            </SvgIcon>
          </Link>
          <div className={classes.linkGroup}>
            <Link to="/">Terms</Link>
            <Link to="/">Privacy Policy</Link>
            <Link to="/">Slack Community</Link>
            <Link to="/">Four51</Link>
          </div>
        </Toolbar>
      </footer>
    )
  }
}

export default withStyles(styles)(Footer)
