import React from 'react'
import Header from './Header'
import { ThemeProvider } from '@material-ui/styles'
import ORDERCLOUD_THEME from '../../theme/theme.constants'
import { Hidden, Box, Theme, makeStyles, createStyles } from '@material-ui/core'
import MobileNav from './MobileNav'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pageWrapper: {
      backgroundColor: 'white',
      marginTop: theme.spacing(9), // spacing from top of page on mobile (due to horiz menu)
      [theme.breakpoints.up('md')]: {
        marginLeft: theme.spacing(7.5), // vertical nav width spacing
        marginTop: 0, // no horizontal nav to worry about
      },
    },
  })
)

export default props => {
  const classes = useStyles(props)
  return (
    <React.Fragment>
      <ThemeProvider theme={ORDERCLOUD_THEME}>
        <Header siteTitle="OrderCloud Documentation" />
        <div className={classes.pageWrapper}>{props.children}</div>
        <Hidden mdUp>
          <MobileNav />
        </Hidden>
      </ThemeProvider>
    </React.Fragment>
  )
}
