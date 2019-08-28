import React, { useState } from 'react'
import {
  makeStyles,
  Theme,
  createStyles,
  Hidden,
  Fab,
  Drawer,
} from '@material-ui/core'
import { ExpandMore, ChevronLeft, ChevronRight } from '@material-ui/icons'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: '0 0 350px',
      marginLeft: theme.spacing(4),
      borderLeft: `1px solid ${theme.palette.divider}`,
    },
    inner: {
      overflowY: 'auto',
      overflowX: 'hidden',
      position: 'fixed',
      marginRight: -999,
      paddingRight: 999,
      backgroundColor: theme.palette.background.default,
      height: `calc(100vh - ${theme.spacing(8)}px)`,
    },
    content: {
      paddingTop: theme.spacing(5),
      paddingLeft: theme.spacing(4),
      paddingBottom: theme.spacing(5),
    },
    mobileFab: {
      position: 'fixed',
      zIndex: 10000000,
      bottom: theme.spacing(4),
      right: theme.spacing(2),
    },
    drawerPaper: {
      width: '90vw',
    },
  })
)

const LayoutMenu: React.FunctionComponent = props => {
  const classes = useStyles({})
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggleMenu = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <React.Fragment>
      <Hidden mdUp>
        <Fab
          color="primary"
          classes={{ root: classes.mobileFab }}
          onClick={toggleMenu}
        >
          {mobileOpen ? <ChevronRight /> : <ChevronLeft />}
        </Fab>
        <Drawer
          anchor="right"
          variant="temporary"
          open={mobileOpen}
          classes={{ paper: classes.drawerPaper }}
          onClose={toggleMenu}
        >
          <div className={classes.content}>{props.children}</div>
        </Drawer>
      </Hidden>
      <Hidden smDown>
        <div className={classes.root}>
          <div className={classes.inner}>
            <div className={classes.content}>{props.children}</div>
          </div>
        </div>
      </Hidden>
    </React.Fragment>
  )
}

export default LayoutMenu
