import React from 'react'
import {
  BottomNavigation,
  BottomNavigationAction,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings'
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
        label="Docs"
        icon={<DocumentationIcon />}
      ></BottomNavigationAction>
    </BottomNavigation>
  )
}

export default MobileNav
