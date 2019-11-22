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
  ListItem,
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
import { navigate, PortalLink } from '../Shared/PortalLink'
import ListItemLink from '../Shared/ListItemLink'
import { sherpablue, seafoam } from '../../theme/ocPalette.constants'
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

  public handleLogout = () => {
    this.setState({ anchorEl: null })
    ;['DevCenter.token', 'DevCenter.firstName', 'DevCenter.email'].forEach(
      cookieName => {
        this.cookies.remove(cookieName, {
          path: '/',
          domain: window.location.hostname,
        })
      }
    )
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
                    isPortalLink,
                  } = item
                  if (!mobileMenu && !authRequired) {
                    if (isPortalLink) {
                      return (
                        <Tab
                          disableRipple={disableRipple}
                          value={value}
                          label={label}
                          classes={{
                            root: classes.tab,
                            selected: classes.navTabSelected,
                          }}
                          onClick={
                            auth
                              ? this.goToPortal(to)
                              : this.goToPortal('/console/login/')
                          }
                          key={index}
                        ></Tab>
                      )
                    }
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
            <Hidden smDown>
              <div className={classes.navbarRight}>
                <ChipLink
                  color="secondary"
                  label={`v${currentApiVersion}`}
                  to={`/release-notes/v${currentApiVersion}`}
                ></ChipLink>
                {auth ? (
                  <React.Fragment>
                    <Button color="inherit" variant="outlined" size="small">
                      Support
                    </Button>
                    <IconButton
                      color="inherit"
                      onClick={this.handleMenu}
                      className={classes.iconButton}
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
                                    <strong>{this.state.username}</strong>
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
                                  <Divider
                                    className={classes.menuListDivider}
                                  />
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
                      onClick={this.goToPortal('/console/login')}
                      color="inherit"
                      size="small"
                    >
                      Login
                    </Button>
                    <Button
                      onClick={this.goToPortal('/console/login')}
                      variant="outlined"
                      color="inherit"
                      size="small"
                    >
                      Sign-Up
                    </Button>
                  </React.Fragment>
                )}
              </div>
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
            alignItems="center"
            paddingRight="1rem"
          >
            <Box>
              <IconButton aria-label="close" color="inherit">
                <CloseIcon
                  fontSize="large"
                  onClick={this.toggleNav(!this.state.mobileOpen)}
                />
              </IconButton>
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
                  onClick={this.goToPortal('/console/login')}
                  variant="text"
                  color="inherit"
                  className={classes.mr1}
                  size="small"
                >
                  Login
                </Button>

                <Button
                  onClick={this.goToPortal('/console/login')}
                  variant="outlined"
                  color="inherit"
                  size="small"
                >
                  Sign-Up
                </Button>
              </Box>
            )}
          </Box>
          <List className={classes.mobileMenuList}>
            {MenuItems.MainNavigation.map(item => {
              const { mobileMenu, authRequired, to, label, isPortalLink } = item
              if (isPortalLink) {
                return (
                  <ListItem
                    onClick={
                      auth
                        ? this.goToPortal(to)
                        : this.goToPortal('/console/login/')
                    }
                  >
                    {label}
                  </ListItem>
                )
              }
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
      marginRight: theme.spacing(2),
      width: theme.spacing(7),
      height: theme.spacing(7),
      padding: theme.spacing(0.5, 1, 1),
      [theme.breakpoints.down('md')]: {
        marginRight: 'auto',
      },
    },
    tabs: {
      flexGrow: 1,
      alignSelf: 'stretch',
    },
    tabsContainer: {
      height: '100%',
    },
    tabsIndicator: {
      height: theme.spacing(0.25),
      backgroundColor: seafoam[500],
      zIndex: -2,
    },
    navTabSelected: {
      color: seafoam[500],
      backgroundColor: 'rgba(0, 0, 0, .1)',
    },
    tab: {
      minWidth: 0,
      cursor: 'pointer',
      transition: 'background-color .5s',
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, .05)',
      },
    },
    root: {
      width: '100vw',
      left: 0,
      top: 0,
      backgroundColor: sherpablue[500],
      '&:after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: -1,
        height: theme.spacing(0.25),
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
    iconButton: {
      padding: 0,
    },
    mobileMenuList: {
      marginBottom: 'auto',
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
    navbarRight: {
      '&>*': {
        margin: theme.spacing(0, 1),
      },
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
    mr1: {
      marginRight: theme.spacing(1),
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
