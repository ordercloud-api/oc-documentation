import React, { useState, useRef } from 'react'
import {
  makeStyles,
  Theme,
  createStyles,
  Hidden,
  Fab,
  Drawer,
  Portal,
} from '@material-ui/core'
import { ChevronLeft, ChevronRight } from '@material-ui/icons'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.up('md')]: {
        flex: '1 0 20%',
      },
    },
    inner: {
      overflowY: 'auto',
      overflowX: 'hidden',
      position: 'fixed',
      marginRight: -999,
      paddingRight: 999,
      backgroundColor: theme.palette.background.default,
      borderLeft: `1px solid ${theme.palette.divider}`,
      height: `calc(100vh - ${theme.spacing(11)}px)`,
    },
    content: {
      padding: theme.spacing(4, 2.5, 4, 2.5),
      [theme.breakpoints.up('lg')]: {
        paddingLeft: theme.spacing(4),
      },
    },
    mobileFab: {
      position: 'fixed',
      bottom: theme.spacing(4),
      right: theme.spacing(2),
      zIndex: theme.zIndex.drawer + 201,
    },
    drawerPaper: {
      width: '90vw',
      [theme.breakpoints.up('sm')]: {
        width: '60vw',
      },
    },
  })
)

interface LayoutMenuProps {
  stayOpen?: boolean
  children: any
}

const LayoutMenu: React.FunctionComponent<LayoutMenuProps> = (
  props: LayoutMenuProps
) => {
  const classes = useStyles({})
  const [mobileOpen, setMobileOpen] = useState(false)
  const mobileContainer = useRef(null)
  const drawerContainer = useRef(null)
  const stayOpen = props.stayOpen || false

  const toggleMenu = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <React.Fragment>
      <Hidden mdUp>
        <div ref={mobileContainer} onClick={stayOpen ? undefined : toggleMenu}>
          <Drawer
            anchor="right"
            variant="temporary"
            open={mobileOpen}
            classes={{ paper: classes.drawerPaper }}
            onClose={toggleMenu}
            ref={drawerContainer}
          >
            <div className={classes.content}>{props.children}</div>
          </Drawer>
          <Portal
            container={
              mobileOpen ? drawerContainer.current : mobileContainer.current
            }
          >
            <Fab
              color="primary"
              classes={{ root: classes.mobileFab }}
              onClick={toggleMenu}
            >
              {mobileOpen ? <ChevronRight /> : <ChevronLeft />}
            </Fab>
          </Portal>
        </div>
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
