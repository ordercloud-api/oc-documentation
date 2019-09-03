import {
  AppBar,
  Button,
  createStyles,
  Drawer,
  Hidden,
  List,
  Tab,
  Tabs,
  Theme,
  Toolbar,
  withStyles,
  withWidth,
  Avatar,
  Menu,
  MenuItem,
  MenuList,
  ClickAwayListener,
  Paper,
  Grow,
  Popper,
  Divider,
  Typography,
  Box,
} from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import { Menu as MenuIcon } from '@material-ui/icons'
import { Link } from 'gatsby'
import React from 'react'
import Cookies from 'universal-cookie'
import ocLogo from '../../assets/images/four51-badge--flame-white.svg'
import Gravatar from 'react-gravatar'
import ChipLink from '../Shared/ChipLink'
import DocSearch from '../Shared/DocSearch'
import { navigate } from '../Shared/PortalLink'
import ListItemLink from '../Shared/ListItemLink'
import { flame, seafoam } from '../../theme/ocPalette.constants'
import ORDERCLOUD_THEME from '../../theme/theme.constants'

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
  mobileOpen: boolean
  username: string
  firstName: string
  email: string
  showResults: boolean
}
class Header extends React.Component<any, HeaderState> {
  state = {
    auth: false,
    anchorEl: null,
    mobileOpen: false,
    username: '',
    firstName: '',
    email: '',
    showResults: false,
  }
  private readonly autologin = true
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

  public handleFakeLogin = () => {
    this.cookies.set(
      'DevCenter.token',
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c3IiOiJyd2F0dEBmb3VyNTEuY29tIiwiY2lkIjoiYjA5N2E5YWEtNWJjMy00OTM3LWI2YmItNmVhMzdlMDA0NDg2IiwidXNydHlwZSI6ImRldiIsInJvbGUiOiJEZXZDZW50ZXIiLCJpc3MiOiJodHRwczovL2F1dGgub3JkZXJjbG91ZC5pbyIsImF1ZCI6Imh0dHBzOi8vYXBpLm9yZGVyY2xvdWQuaW8iLCJleHAiOjE1NjcxMzA3NzksIm5iZiI6MTU2NzEwMTk3OX0._esOeRaH36XbHUNd7HzMFOhFx-4YDFwUa3sZ5UigiQs',
      { domain: window.location.hostname }
    )
    this.cookies.set('DevCenter.firstName', 'Robert', {
      domain: window.location.hostname,
    })
    this.cookies.set('DevCenter.email', 'rwatt@four51.com', {
      domain: window.location.hostname,
    })
    this.onInit()
  }

  public handleLogout = () => {
    this.setState({ anchorEl: null })
    this.cookies.remove('DevCenter.token', { domain: window.location.hostname })
    this.cookies.set('DevCenter.firstName', null)
    this.cookies.set('DevCenter.email', null)
    this.onInit()
  }

  public componentDidMount() {
    this.onInit()
  }

  public goToPortal = (route: string) => (event: React.MouseEvent) => {
    navigate(route)
  }

  public toggleNav = (mobileOpen: boolean) => () => {
    this.setState({ mobileOpen })
  }

  public render() {
    const { classes, location, width } = this.props
    const { anchorEl, auth, showResults } = this.state
    const isMobile = width !== 'md' && width !== 'lg' && width !== 'xl'
    console.log(width)
    let activeTab = 'docs'
    if (location && location.pathname) {
      var partialPath = location.pathname.split('/')[1]
      if (!partialPath) return
      if (partialPath === 'blog' || partialPath === 'api-reference') {
        activeTab = partialPath
      } else {
        activeTab = 'rest'
      }
    }
    return (
      <React.Fragment>
        <AppBar color="primary" className={classes.root}>
          {/* <Container> */}
          <Toolbar className={classes.toolbar}>
            <Hidden mdUp>
              <IconButton
                color="inherit"
                edge="start"
                onClick={this.toggleNav(!this.state.mobileOpen)}
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Link to="/" className={classes.logo}>
              <img src={ocLogo}></img>
            </Link>
            <div className={classes.spacer}></div>
            <Hidden smDown>
              <Tabs
                value={activeTab}
                className={classes.tabs}
                classes={{
                  flexContainer: classes.tabsContainer,
                  indicator: classes.tabsIndicator,
                }}
              >
                <Tab
                  disableRipple
                  value="docs"
                  label="Home"
                  classes={{
                    root: classes.tab,
                    selected: classes.navTabSelected,
                  }}
                  component={Link}
                  to="/"
                ></Tab>
                <Tab
                  disableRipple
                  value="rest"
                  label="Docs"
                  classes={{
                    root: classes.tab,
                    selected: classes.navTabSelected,
                  }}
                  component={Link}
                  to="/main-concepts/organization-hierarchy"
                ></Tab>

                <Tab
                  disableRipple
                  classes={{
                    root: classes.tab,
                    selected: classes.navTabSelected,
                  }}
                  value="blog"
                  label="Blog"
                  component={Link}
                  to="/blog"
                ></Tab>
                <Tab
                  disableRipple
                  classes={{
                    root: classes.tab,
                    selected: classes.navTabSelected,
                  }}
                  value="api-reference"
                  label="Api Reference"
                  component={Link}
                  to="/api-reference"
                ></Tab>
                {this.state.auth && (
                  <Tab
                    disableRipple
                    classes={{
                      root: classes.tab,
                      selected: classes.navTabSelected,
                    }}
                    value="console"
                    label="Console"
                    component={Link}
                    to="/console"
                  ></Tab>
                )}
              </Tabs>
            </Hidden>

            <div className={classes.grow}></div>
            <Hidden smDown>
              <ChipLink
                color="primary"
                label="v1.0.109"
                to="/release-notes/v1.0.109"
              ></ChipLink>
              <div className={classes.spacer}></div>
              {this.state.auth ? (
                <React.Fragment>
                  <Button color="default" variant="contained" size="small">
                    Support
                  </Button>
                  <div className={classes.spacer}></div>
                  <IconButton color="inherit" onClick={this.handleMenu}>
                    <Avatar alt={this.state.username}>
                      <Gravatar size={40} email={this.state.email} />
                    </Avatar>
                  </IconButton>
                  <Popper
                    placement="bottom-end"
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    transition
                    disablePortal
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin:
                            placement === 'bottom-end'
                              ? 'right top'
                              : 'right bottom',
                        }}
                      >
                        <Paper>
                          <ClickAwayListener onClickAway={this.handleClose}>
                            <div>
                              <Box paddingX={2} paddingY={1}>
                                <Typography>
                                  Signed in as
                                  <br />
                                  <b>{this.state.username}</b>
                                </Typography>
                              </Box>
                              <Divider />
                              <MenuList className={classes.menuList}>
                                <MenuItem className={classes.menuItem}>
                                  Your Profile
                                </MenuItem>
                                <MenuItem className={classes.menuItem}>
                                  Your Organizations
                                </MenuItem>
                                <MenuItem className={classes.menuItem}>
                                  Shared Organizations
                                </MenuItem>
                                <Divider className={classes.menuListDivider} />
                                <MenuItem className={classes.menuItem}>
                                  Settings
                                </MenuItem>
                                <MenuItem className={classes.menuItem}>
                                  Help
                                </MenuItem>
                                <MenuItem
                                  className={classes.menuItem}
                                  onClick={this.handleLogout}
                                >
                                  Sign Out
                                </MenuItem>
                              </MenuList>
                            </div>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Button
                    onClick={this.handleFakeLogin}
                    variant="text"
                    color="inherit"
                    size="small"
                    style={{ marginRight: 5 }}
                  >
                    Login
                  </Button>

                  <Button variant="outlined" color="inherit" size="small">
                    Sign-Up
                  </Button>
                </React.Fragment>
              )}

              <div className={classes.spacer}></div>
            </Hidden>
            <DocSearch
              classes={{
                searchBox: `${isMobile ? classes.mobileSearchBox : undefined}`,
                searchBoxInput: `${
                  isMobile ? classes.mobileSearchInput : undefined
                }`,
              }}
              placeholder={isMobile && 'Search...'}
              darkMode={true}
              noPopper={isMobile}
            ></DocSearch>
            <Hidden mdUp>
              {this.state.auth && (
                <React.Fragment>
                  <div className={classes.spacer}></div>
                  <IconButton
                    edge="end"
                    color="inherit"
                    onClick={this.handleMenu}
                  >
                    <Avatar alt={this.state.username}>
                      <Gravatar size={40} email={this.state.email} />
                    </Avatar>
                  </IconButton>
                  <Popper
                    placement="bottom-end"
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    transition
                    disablePortal
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin:
                            placement === 'bottom-end'
                              ? 'right top'
                              : 'right bottom',
                        }}
                      >
                        <Paper>
                          <ClickAwayListener onClickAway={this.handleClose}>
                            <div>
                              <Box paddingX={2} paddingY={1}>
                                <Typography>
                                  Signed in as
                                  <br />
                                  <b>{this.state.username}</b>
                                </Typography>
                              </Box>
                              <Divider />
                              <MenuList className={classes.menuList}>
                                <MenuItem className={classes.menuItem}>
                                  Your Profile
                                </MenuItem>
                                <MenuItem className={classes.menuItem}>
                                  Your Organizations
                                </MenuItem>
                                <MenuItem className={classes.menuItem}>
                                  Shared Organizations
                                </MenuItem>
                                <Divider className={classes.menuListDivider} />
                                <MenuItem className={classes.menuItem}>
                                  Settings
                                </MenuItem>
                                <MenuItem className={classes.menuItem}>
                                  Help
                                </MenuItem>
                                <MenuItem
                                  onClick={this.handleLogout}
                                  className={classes.menuItem}
                                >
                                  Sign Out
                                </MenuItem>
                              </MenuList>
                            </div>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </React.Fragment>
              )}
            </Hidden>
          </Toolbar>
        </AppBar>
        <Drawer open={this.state.mobileOpen} onClose={this.toggleNav(false)}>
          <List>
            <ListItemLink to="/">Home</ListItemLink>
            <ListItemLink to="/getting-started/quick-start-guide">
              Learn
            </ListItemLink>
            <ListItemLink to="/blog">Blog</ListItemLink>
            <ListItemLink to="/api-reference">Documentation</ListItemLink>
            <ListItemLink to="/console">Console</ListItemLink>
            <ListItemLink to="/release-notes/v1.0.109">
              Release Notes
            </ListItemLink>
            <ListItemLink to="/">Support</ListItemLink>
          </List>
          {!this.state.auth && (
            <Box>
              <Button
                onClick={this.handleFakeLogin}
                variant="text"
                color="inherit"
                size="small"
                style={{ marginRight: 5 }}
              >
                Login
              </Button>

              <Button variant="outlined" color="inherit" size="small">
                Sign-Up
              </Button>
            </Box>
          )}
        </Drawer>
      </React.Fragment>
    )
  }
}

const drawerWidth = '25vw'
export const navHeight = ORDERCLOUD_THEME.spacing(10)

const styles = (theme: Theme) =>
  createStyles({
    logo: {
      marginLeft: -theme.spacing(2),
      width: theme.spacing(7),
      height: theme.spacing(7),
      padding: theme.spacing(0.5, 1, 1),
    },
    tabs: {
      alignSelf: 'stretch',
    },
    tabsContainer: {
      height: '100%',
    },
    tabsIndicator: {
      height: theme.spacing(0.5),
      backgroundColor: theme.palette.secondary.light,
      zIndex: -2,
    },
    navTabSelected: {
      fontWeight: 'bolder',
      color: seafoam[400],
    },
    tab: {
      minWidth: 0,
    },
    root: {
      width: '100vw',
      left: 0,
      top: 0,
      '&:after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: -1,
        height: theme.spacing(0.5),
        backgroundImage: `linear-gradient(90deg, ${flame[400]} 0%, #F8AC1A 100%)`,
      },
    },
    toolbar: {
      height: navHeight,
    },
    mobileSearchBox: {
      marginRight: -theme.spacing(1),
    },
    mobileSearchInput: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      width: 80,
    },
    icon: {
      color: theme.palette.common.white,
    },
    menuList: {
      // padding: ,
    },
    menuListDivider: {
      margin: theme.spacing(1, 0),
    },
    menuItem: {
      minHeight: 0,
      padding: theme.spacing(0.5, 2),
    },
    logoContainer: {
      boxSizing: 'content-box',
    },
    grow: {
      flexGrow: 1,
    },
    spacer: {
      width: theme.spacing(2),
    },
    menuItem__profile: {
      padding: '10px',
    },
    search: {
      alignItems: 'flex-start',
    },
    'ais-Hits': {
      maxHeight: theme.spacing(25),
      overflowY: 'scroll',
      overflowX: 'auto',
    },
  })

export default withStyles(styles)(withWidth()(Header))
