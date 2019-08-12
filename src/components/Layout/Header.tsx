import { Link } from 'gatsby'
import React from 'react'
import {
  Theme,
  createStyles,
  withStyles,
  Hidden,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Gravatar from 'react-gravatar'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Divider from '@material-ui/core/Divider'
import ocLogo from '../../assets/images/four51-logo--full-color.svg'

import Cookies from 'universal-cookie'
import {
  SettingsTwoTone,
  PeopleTwoTone,
  LockTwoTone,
  CodeTwoTone,
  BookmarksTwoTone,
  SpeakerNotesTwoTone,
  LocalLibraryTwoTone,
} from '@material-ui/icons'
import { navigate } from '../Shared/PortalLink'
import { drawerWidthSpacing } from './RightMenu'

function isTokenExpired(token: string): boolean {
  if (!token) {
    return true
  }
  const parsedToken = parseJwt(token)
  const currentSeconds = Date.now() / 1000
  const currentSecondsWithBuffer = currentSeconds - 2
  var expired = parsedToken.exp < currentSecondsWithBuffer
  return expired
}

function parseJwt(token: string) {
  if (!token) {
    return null
  }
  var base64Url = token.split('.')[1]
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )
  return JSON.parse(jsonPayload)
}

interface HeaderState {
  auth: boolean
  anchorEl?: HTMLElement
  username: string
  firstName: string
  email: string
}
class Header extends React.Component<any, HeaderState> {
  state = {
    auth: false,
    anchorEl: null,
    username: '',
    firstName: '',
    email: '',
  }

  private readonly cookies = new Cookies()

  public onInit() {
    //TODO: NICE TO HAVE: Find out how to re-evaluate based on state change
    const token = this.cookies.get('DevCenter.token')
    const decoded = parseJwt(token)
    if (decoded) {
      this.setState({
        username: decoded.usr,
        firstName: this.cookies.get('DevCenter.firstName'),
        email: this.cookies.get('DevCenter.email'),
        auth: !isTokenExpired(token),
      })
    } else {
      this.setState({
        firstName: '',
        email: '',
        auth: null,
      })
    }
  }

  public handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ anchorEl: event.currentTarget })
  }

  public handleClose = () => {
    this.setState({ anchorEl: null })
  }

  public handleLogout = (): void => {
    this.setState({ anchorEl: null })
    this.cookies.remove('DevCenter.token')
    this.cookies.remove('DevCenter.firstName')
    this.cookies.remove('DevCenter.email')
    this.onInit()
  }

  public componentDidMount() {
    this.onInit()
  }

  public goToPortal = (route: string) => (event: React.MouseEvent) => {
    navigate(route)
  }

  public render() {
    const { classes } = this.props
    const { anchorEl, auth } = this.state
    const open = Boolean(anchorEl)
    return (
      <div className={classes.root}>
        <Link to="/">
          <img className={classes.logo} src={ocLogo} alt="OC" />
        </Link>
        <Hidden smDown>
          <List component="nav" aria-label="ordercloud documentation menu">
            <ListItem
              button
              className={classes.menuItem}
              onClick={this.goToPortal('/console')}
            >
              <ListItemIcon>
                <CodeTwoTone className={classes.icon} />
              </ListItemIcon>
              <ListItemText primary="API Console" />
            </ListItem>
            <ListItem button className={classes.menuItem}>
              <ListItemIcon>
                <SettingsTwoTone className={classes.icon} />
              </ListItemIcon>
              <ListItemText primary="Organization Settings" />
            </ListItem>
            <ListItem button className={classes.menuItem}>
              <ListItemIcon>
                <PeopleTwoTone className={classes.icon} />
              </ListItemIcon>
              <ListItemText primary="Contributor Access" />
            </ListItem>
            <ListItem
              button
              className={classes.menuItem}
              component={Link}
              to="/"
            >
              <ListItemIcon>
                <LocalLibraryTwoTone className={classes.icon} />
              </ListItemIcon>
              <ListItemText primary="Documentation" />
            </ListItem>
            <ListItem
              button
              className={classes.menuItem}
              component={Link}
              to="/blog"
            >
              <ListItemIcon>
                <BookmarksTwoTone className={classes.icon} />
              </ListItemIcon>
              <ListItemText primary="Blog" />
            </ListItem>
            <ListItem
              button
              className={classes.menuItem}
              component={Link}
              to="/api-release-notes"
            >
              <ListItemIcon>
                <SpeakerNotesTwoTone className={classes.icon} />
              </ListItemIcon>
              <ListItemText primary="API Release Notes" />
            </ListItem>
          </List>
          <div className={classes.grow} />
        </Hidden>
        {auth && (
          <div>
            <IconButton
              className={classes.menuItem__profile}
              aria-owns={open ? 'menu-appbar' : undefined}
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="inherit"
            >
              <Avatar alt={this.state.username}>
                <Gravatar email={this.state.email} />
              </Avatar>
            </IconButton>
            <Menu
              id="menu-appbar"
              className={classes.adminMenu}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={this.handleClose}
            >
              <MenuItem>
                <Avatar alt="Email" className={classes.mr1rem}>
                  <Gravatar email={this.state.email} />
                </Avatar>
                Welcome {this.state.firstName}!
              </MenuItem>
              <Divider />
              <MenuItem onClick={this.goToPortal('/profile')}>
                <ListItemIcon className={classes.mr1rem}>
                  <PeopleTwoTone />
                </ListItemIcon>
                Profile
              </MenuItem>
              <MenuItem onClick={this.goToPortal('/profile/account')}>
                <ListItemIcon className={classes.mr1rem}>
                  <LockTwoTone />
                </ListItemIcon>
                Account
              </MenuItem>
              <MenuItem component={Link} to="/profile/console-settings">
                <ListItemIcon className={classes.mr1rem}>
                  <CodeTwoTone />
                </ListItemIcon>
                Console Settings
              </MenuItem>
              <Divider />
              <MenuItem dense={true} onClick={this.handleLogout}>
                Logout
              </MenuItem>
            </Menu>
          </div>
        )}
      </div>
    )
  }
}

const drawerWidth = '25vw'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      position: 'fixed',
      top: 0,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.background.paper,
      width: '100%',
      maxWidth: '100vw',
      zIndex: 2,
      [theme.breakpoints.up('md')]: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        overflow: 'hidden',
        maxWidth: theme.spacing(7.5),
        height: '100vh',
        boxShadow: `0px 0px 0px transparent`,
        transition: `max-width 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`,
        transitionDelay: '400ms',
        '&:hover': {
          boxShadow: `0px 0px 15px ${theme.palette.primary.dark}`,
          maxWidth: theme.spacing(32),
        },
      },
    },
    icon: {
      color: theme.palette.background.paper,
    },
    menuItem: {
      width: theme.spacing(32),
    },
    logo: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      paddingLeft: theme.spacing(1.66),
      width: 'auto',
      height: theme.spacing(5),
    },
    grow: {
      flexGrow: 1,
    },
    menuItem__profile: {
      padding: '10px',
    },
  })

export default withStyles(styles)(Header)
