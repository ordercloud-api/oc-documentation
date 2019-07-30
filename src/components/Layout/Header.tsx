import { Link } from 'gatsby'
import React from 'react'
import { Theme, createStyles, withStyles, Hidden } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import SvgIcon from '@material-ui/core/SvgIcon'
import Gravatar from 'react-gravatar'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Divider from '@material-ui/core/Divider'
import ListItemIcon from '@material-ui/core/ListItemIcon'

import ContributorsIcon from '@material-ui/icons/People'
import SettingsIcon from '@material-ui/icons/Settings'
import ProfileIcon from '@material-ui/icons/AccountCircle'
import AccountIcon from '@material-ui/icons/Lock'
import ConsoleIcon from '@material-ui/icons/Code'
import DocumentationIcon from '@material-ui/icons/BookmarksTwoTone'
import Cookies from 'universal-cookie'
import { MenuOutlined, Apps } from '@material-ui/icons'
import { navigate } from '../Shared/PortalLink'

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
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.verticalNav}>
          <Link to="/">
            <img className={classes.logo} src="/logo-white.svg" alt="OC" />
          </Link>
          <Hidden smDown>
            <Tooltip placement="right" title="Api Console">
              <IconButton
                color="inherit"
                onClick={this.goToPortal('/console')}
                aria-label="Api Console"
              >
                <ConsoleIcon />
              </IconButton>
            </Tooltip>
            <Tooltip placement="right" title="Organization Settings">
              <IconButton color="inherit" aria-label="Organization Settings">
                <SettingsIcon />
              </IconButton>
            </Tooltip>
            <Tooltip placement="right" title="Contributor Access">
              <IconButton color="inherit" aria-label="Contributor Access">
                <ContributorsIcon />
              </IconButton>
            </Tooltip>
            <Tooltip placement="right" title="Documentation">
              <IconButton
                component={Link}
                to="/"
                color="inherit"
                aria-label="Documentation"
              >
                <DocumentationIcon />
              </IconButton>
            </Tooltip>
          </Hidden>
          <div className={classes.grow} />
          {auth && (
            <div>
              <IconButton
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
                    <ProfileIcon />
                  </ListItemIcon>
                  Profile
                </MenuItem>
                <MenuItem onClick={this.goToPortal('/account')}>
                  <ListItemIcon className={classes.mr1rem}>
                    <AccountIcon />
                  </ListItemIcon>
                  Account
                </MenuItem>
                <MenuItem component={Link} to="/profile/console-settings">
                  <ListItemIcon className={classes.mr1rem}>
                    <ConsoleIcon />
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
        </Toolbar>
      </AppBar>
    )
  }
}

const drawerWidth = '25vw'

const styles = (theme: Theme) =>
  createStyles({
    menuLogo: {
      maxWidth: 200,
    },
    menuLogoSvg: {
      height: 'auto',
      width: '100%',
      fill: 'white',
    },
    menuButton: {
      marginLeft: 'auto',
      marginRight: theme.spacing(2),
    },
    logo: {
      margin: theme.spacing(2),
      width: theme.spacing(5),
    },
    grow: {
      flexGrow: 1,
    },
    appBar: {
      backgroundColor: theme.palette.primary.main,
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      zIndex: theme.zIndex.appBar + 2,
      [theme.breakpoints.up('md')]: {
        height: '100%',
        width: theme.spacing(9),
        left: 0,
        flexDirection: 'column',
      },
    },
    verticalNav: {
      justifyContent: 'space-between',
      [theme.breakpoints.up('md')]: {
        flexDirection: 'column',
        height: '100%',
      },
    },
  })

export default withStyles(styles)(Header)
