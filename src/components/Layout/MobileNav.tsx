import React from 'react'
import {
  BottomNavigation,
  BottomNavigationAction,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core'
import ContributorsIcon from '@material-ui/icons/People'
import SettingsIcon from '@material-ui/icons/Settings'
import ProfileIcon from '@material-ui/icons/AccountCircle'
import AccountIcon from '@material-ui/icons/Lock'
import ConsoleIcon from '@material-ui/icons/Code'
import DocumentationIcon from '@material-ui/icons/BookmarksTwoTone'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      zIndex: theme.zIndex.appBar + 1,
      position: 'fixed',
      bottom: 0,
      width: '100vw',
      borderTop: `1px solid ${theme.palette.divider}`,
    },
  })
)

const MobileNav: React.FunctionComponent = () => {
  const classes = useStyles({})
  return (
    <BottomNavigation classes={{ root: classes.root }} showLabels>
      <BottomNavigationAction
        label="Console"
        icon={<ConsoleIcon />}
      ></BottomNavigationAction>
      <BottomNavigationAction
        label="Orgs"
        icon={<SettingsIcon />}
      ></BottomNavigationAction>
      <BottomNavigationAction
        className={classes.mr2}
        label="Docs"
        icon={<DocumentationIcon />}
      ></BottomNavigationAction>
    </BottomNavigation>
  )
}

export default MobileNav
