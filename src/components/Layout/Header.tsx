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
import { Menu as MenuIcon, Close as CloseIcon } from '@material-ui/icons'
import { Link, graphql, StaticQuery } from 'gatsby'
import React from 'react'
import Cookies from 'universal-cookie'
import ocLogo from '../../assets/images/four51-badge--flame-white.svg'
import Gravatar from 'react-gravatar'
import ChipLink from '../Shared/ChipLink'
import DocSearch from '../Shared/DocSearch'
import { navigate } from '../Shared/PortalLink'
import ListItemLink from '../Shared/ListItemLink'
import { flame, sunset } from '../../theme/ocPalette.constants'
import ORDERCLOUD_THEME from '../../theme/theme.constants'
import MenuItems from '../Shared/MenuItems.json'
import ocOrange from '../../../src/assets/images/four51-logo-geo--full-color-white.svg'

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

interface HeaderProps {
  data: any
  classes: any
  location: any
  width: any
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
class Header extends React.Component<HeaderProps, HeaderState> {
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
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c3IiOiJkc3RlaW5tZXR6QGZvdXI1MS5jb20iLCJjaWQiOiJiMDk3YTlhYS01YmMzLTQ5MzctYjZiYi02ZWEzN2UwMDQ0ODYiLCJ1c3J0eXBlIjoiZGV2Iiwicm9sZSI6IkRldkNlbnRlciIsImlzcyI6Imh0dHBzOi8vYXV0aC5vcmRlcmNsb3VkLmlvIiwiYXVkIjoiaHR0cHM6Ly9hcGkub3JkZXJjbG91ZC5pbyIsImV4cCI6MTU2NzYzOTgwNCwibmJmIjoxNTY3NjExMDA0fQ.1lbxBTNUo4YZ-Z1HLUoxA3tvwPKv57IL8xqnWiFgSjc',
      { domain: window.location.hostname }
    )
    this.cookies.set('DevCenter.firstName', 'DJ', {
      domain: window.location.hostname,
    })
    this.cookies.set('DevCenter.email', 'dsteinmetz@four51.com', {
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
    const { classes, location, width, data } = this.props
    const { anchorEl, auth, showResults } = this.state
    const isMobile = width !== 'md' && width !== 'lg' && width !== 'xl'
    const currentApiVersion = data.allMdx.nodes[0].frontmatter.apiVersion
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
                {MenuItems.MainNavigation.map((item, index) => {
                  const {
                    mobileMenu,
                    authRequired,
                    disableRipple,
                    value,
                    label,
                    to,
                  } = item
                  if (!mobileMenu && !authRequired) {
                    return (
                      <Tab
                        disableRipple={disableRipple}
                        value={value}
                        label={label}
                        classes={{
                          root: classes.tab,
                          selected: classes.navTabSelected,
                        }}
                        component={Link}
                        to={to}
                        key={index}
                      ></Tab>
                    )
                  }
                  if (!mobileMenu && authRequired) {
                    return (
                      auth && (
                        <Tab
                          disableRipple={disableRipple}
                          classes={{
                            root: classes.tab,
                            selected: classes.navTabSelected,
                          }}
                          value={value}
                          label={label}
                          component={Link}
                          to={to}
                        ></Tab>
                      )
                    )
                  }
                })}
              </Tabs>
            </Hidden>
            <div className={classes.grow}></div>
            <Hidden smDown>
              <ChipLink
                color="primary"
                label={`v${currentApiVersion}`}
                to={`/release-notes/v${currentApiVersion}`}
              ></ChipLink>
              <div className={classes.spacer}></div>
              {auth ? (
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
                                {MenuItems.OrgControls.map((item, index) => (
                                  <MenuItem
                                    key={index}
                                    className={classes.menuItem}
                                  >
                                    {item.label}
                                  </MenuItem>
                                ))}
                                <Divider className={classes.menuListDivider} />
                                {MenuItems.AuthControls.map((item, index) => {
                                  const { label, to } = item
                                  return (
                                    <MenuItem
                                      key={index}
                                      className={classes.menuItem}
                                    >
                                      {label}
                                    </MenuItem>
                                  )
                                })}
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
          </Toolbar>
        </AppBar>
        <Drawer
          open={this.state.mobileOpen}
          onClose={this.toggleNav(false)}
          classes={{ paper: classes.drawerPaper, root: classes.drawerRoot }}
          anchor="left"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            paddingRight="1rem"
          >
            <Box padding="1.5rem 1rem">
              <CloseIcon
                fontSize="large"
                color="inherit"
                onClick={this.toggleNav(!this.state.mobileOpen)}
              />
            </Box>
            {auth ? (
              <Box padding="1rem 0rem">
                <Avatar alt={this.state.username}>
                  <Gravatar size={40} email={this.state.email} />
                </Avatar>
              </Box>
            ) : (
              <Box padding="1rem 0rem">
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
          </Box>
          <List className={classes.mobileMenuList}>
            {MenuItems.MainNavigation.map(item => {
              const { mobileMenu, authRequired, to, label } = item
              if (
                (!mobileMenu || mobileMenu) &&
                !authRequired &&
                to !== '/release-notes/v'
              ) {
                return <ListItemLink to={to}>{label}</ListItemLink>
              }
              if (authRequired) {
                return auth && <ListItemLink to={to}>{label}</ListItemLink>
              }
              if (to === '/release-notes/v') {
                return (
                  <ListItemLink to={to + currentApiVersion}>
                    {label}
                  </ListItemLink>
                )
              }
            })}
            {auth ? (
              <React.Fragment>
                <Divider />
                <Box padding="1rem 0rem 0rem 1rem">
                  <Typography variant="body1" className={classes.signedInAs}>
                    Signed in as {this.state.username}
                  </Typography>
                </Box>
                <MenuList className={classes.menuList}>
                  {MenuItems.OrgControls.map((item, index) => (
                    <MenuItem key={index} className={classes.menuItem}>
                      {item.label}
                    </MenuItem>
                  ))}
                  {MenuItems.AuthControls.map((item, index) => {
                    const { label, to } = item
                    return (
                      <MenuItem key={index} className={classes.menuItem}>
                        {label}
                      </MenuItem>
                    )
                  })}
                  <MenuItem
                    className={classes.menuItem}
                    onClick={this.handleLogout}
                  >
                    Sign Out
                  </MenuItem>
                </MenuList>
              </React.Fragment>
            ) : (
              <React.Fragment></React.Fragment>
            )}
          </List>
          <div className={classes.grow}></div>
          <Box padding="1rem">
            <img className={classes.mobileMenuLogo} src={ocOrange} alt="OC" />
          </Box>
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
      color: flame[400],
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
    drawerRoot: {
      zIndex: `10000000!important`,
    },
    drawerPaper: {
      backgroundColor: theme.palette.primary.main,
      width: '100vw',
      height: '100vh',
      color: theme.palette.common.white,
      fontSize: '1rem',
    },
    mobileMenuLogo: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      marginRight: theme.spacing(2),
      width: theme.spacing(30),
    },
    signedInAs: {
      fontWeight: 'bolder',
    },
  })

interface HeaderWithStaticQueryProps {
  classes: any
  location: any
  width: any
}
class HeaderWithStaticQuery extends React.Component<
  HeaderWithStaticQueryProps
> {
  render() {
    return (
      <StaticQuery
        query={graphql`
          query {
            allMdx(
              filter: {
                fileAbsolutePath: { glob: "**/content/release-notes/**/*.mdx" }
              }
              sort: { order: DESC, fields: [frontmatter___date] }
              limit: 1
            ) {
              nodes {
                frontmatter {
                  apiVersion
                }
              }
            }
          }
        `}
        render={data => <Header data={data} {...this.props} />}
      />
    )
  }
}
export default withStyles(styles)(withWidth()(HeaderWithStaticQuery))
