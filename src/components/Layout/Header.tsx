import {
  AppBar,
  Button,
  createStyles,
  Drawer,
  Hidden,
  List,
  Tab,
  Tabs,
  Toolbar,
  withStyles,
  withWidth,
  Avatar,
  MenuItem,
  MenuList,
  ClickAwayListener,
  Paper,
  Grow,
  Popper,
  Divider,
  Box,
  ListItem,
  Theme,
  ListSubheader,
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
import { sherpablue, seafoam } from '../../theme/ocPalette.constants'
import ORDERCLOUD_THEME from '../../theme/theme.constants'
import MenuItems from '../Shared/MenuItems.json'
import openapiService from '../../services/openapi.service'

function parseJwt(token: string) {
  if (!token) {
    return null
  }
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function(c) {
        return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`
      })
      .join('')
  )
  return JSON.parse(jsonPayload)
}

function isTokenExpired(token: string): boolean {
  if (!token) {
    return true
  }
  const parsedToken = parseJwt(token)
  const currentSeconds = Date.now() / 1000
  const currentSecondsWithBuffer = currentSeconds - 2
  const expired = parsedToken.exp < currentSecondsWithBuffer
  return expired
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
  showResults: boolean
  currentApiVersion: string
}
class Header extends React.Component<HeaderProps, HeaderState> {
  state = {
    auth: false,
    anchorEl: null,
    mobileOpen: false,
    username: '',
    showResults: false,
    currentApiVersion: '',
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
        auth: !isTokenExpired(token),
      })
    } else {
      this.setState({
        username: '',
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
    this.cookies.remove('DevCenter.token', {
      path: '/',
      domain: window.location.hostname,
    })
    this.onInit()
  }

  public componentDidMount() {
    this.onInit()
  }

  public goToPortal = (route: string) => () => {
    navigate(route)
  }

  public toggleNav = (mobileOpen: boolean) => () => {
    this.setState({ mobileOpen })
  }

  public render() {
    const { classes, location, width, data } = this.props
    const { anchorEl, auth } = this.state
    const isMobile = width !== 'md' && width !== 'lg' && width !== 'xl'
    const isMedium = width !== 'lg' && width !== 'xl'

    //TODO: How should we get this dynamically??
    const currentApiVersion = '1.0.137'
    const latestReleaseNoteVersion = data.allMdx.nodes[0].frontmatter.apiVersion
    let activeTab = 'docs'
    if (location && location.pathname) {
      const partialPath = location.pathname.split('/')[1]
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
                    value,
                    label,
                    to,
                    isPortalLink,
                  } = item
                  if (!mobileMenu) {
                    if (isPortalLink) {
                      return (
                        <Tab
                          value={value}
                          label={label}
                          classes={{
                            root: classes.tab,
                            selected: classes.navTabSelected,
                          }}
                          onClick={
                            auth || !authRequired
                              ? this.goToPortal(to)
                              : this.goToPortal('/login')
                          }
                          key={index}
                        ></Tab>
                      )
                    }
                    return (
                      <Tab
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
                })}
              </Tabs>
            </Hidden>
            <Hidden smDown>
              <div className={classes.navbarRight}>
                <ChipLink
                  color="secondary"
                  label={`v${currentApiVersion}`}
                  to={`/release-notes/v${latestReleaseNoteVersion}`}
                ></ChipLink>
                {auth ? (
                  <React.Fragment>
                    <IconButton
                      color="inherit"
                      onClick={this.handleMenu}
                      className={classes.iconButton}
                    >
                      <Avatar
                        className={classes.iconButtonAvatar}
                        alt={this.state.username}
                      >
                        <Gravatar size={40} email={this.state.username} />
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
                              <MenuList>
                                <ListSubheader component="div">
                                  Signed in as
                                  <strong> {this.state.username}</strong>
                                </ListSubheader>
                                <div className={classes.orgControls}>
                                  {MenuItems.DropdownControls.map(
                                    (item, index) => (
                                      <MenuItem
                                        key={index}
                                        onClick={this.goToPortal(item.to)}
                                      >
                                        {item.label}
                                      </MenuItem>
                                    )
                                  )}
                                </div>
                                <MenuItem onClick={this.handleLogout}>
                                  Sign Out
                                </MenuItem>
                              </MenuList>
                            </ClickAwayListener>
                          </Paper>
                        </Grow>
                      )}
                    </Popper>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Button
                      onClick={this.goToPortal('/login')}
                      color="inherit"
                      size="small"
                    >
                      Login
                    </Button>
                    <Button
                      onClick={this.goToPortal('/register')}
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
                  isMobile
                    ? classes.mobileSearchInput
                    : isMedium
                    ? classes.mediumSearchInput
                    : undefined
                }`,
              }}
              placeholder={isMedium && 'Search...'}
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
            paddingX="8px"
            paddingTop="8px"
          >
            <IconButton
              aria-label="close"
              color="inherit"
              className={classes.mobileIconButon}
              onClick={this.toggleNav(!this.state.mobileOpen)}
            >
              <CloseIcon fontSize="large" color="inherit" />
            </IconButton>
            {auth ? (
              <Avatar
                alt={this.state.username}
                className={classes.iconButtonAvatar}
              >
                <Gravatar
                  alt="User Image"
                  size={40}
                  email={this.state.username}
                />
              </Avatar>
            ) : (
              <div>
                <Button
                  onClick={this.goToPortal('/login')}
                  variant="text"
                  color="inherit"
                >
                  Login
                </Button>
                <Button
                  onClick={this.goToPortal('/register')}
                  variant="outlined"
                  color="inherit"
                >
                  Sign-Up
                </Button>
              </div>
            )}
          </Box>
          <List className={classes.mobileMenuList}>
            {MenuItems.MainNavigation.map(item => {
              const {
                value,
                mobileMenu,
                authRequired,
                to,
                label,
                isPortalLink,
              } = item
              if (isPortalLink) {
                return (
                  <ListItem
                    key={value}
                    onClick={
                      auth || !authRequired
                        ? this.goToPortal(to)
                        : this.goToPortal('/login')
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
                return (
                  <ListItemLink to={to} key={value}>
                    {label}
                  </ListItemLink>
                )
              }
              if (to === '/release-notes/v') {
                return (
                  <ListItemLink to={to + latestReleaseNoteVersion} key={value}>
                    {label}
                  </ListItemLink>
                )
              }
            })}
          </List>
          <Divider />
          {auth && (
            <List>
              <ListSubheader
                component="div"
                className={classes.mobileMenuSubheader}
              >
                Signed in as
                <strong> {this.state.username}</strong>
              </ListSubheader>
              {MenuItems.DropdownControls.map((item, index) => (
                <ListItem key={index}>{item.label}</ListItem>
              ))}
              <ListItem onClick={this.handleLogout}>Sign Out</ListItem>
            </List>
          )}
        </Drawer>
      </React.Fragment>
    )
  }
}

export const navHeight = ORDERCLOUD_THEME.spacing(10)
export const navHeightMobile = ORDERCLOUD_THEME.spacing(8)

const styles = (theme: Theme) =>
  createStyles({
    logo: {
      marginRight: theme.spacing(2),
      width: theme.spacing(7),
      height: theme.spacing(7),
      padding: theme.spacing(0.5, 1, 1),
      [theme.breakpoints.down('md')]: {
        marginRight: 'auto',
        width: theme.spacing(5),
        height: theme.spacing(5),
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
      fontFamily: theme.typography.h1.fontFamily,
      letterSpacing: 1,
      fontWeight: 'normal',
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
      height: navHeightMobile,
      [theme.breakpoints.up('md')]: {
        height: navHeight,
      },
    },
    mobileSearchBox: {
      marginRight: -theme.spacing(1),
    },
    mediumSearchInput: {
      width: 100,
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
    iconButtonAvatar: {
      border: `2px solid ${theme.palette.primary.dark}`,
      backgroundColor: 'transparent',
      fontSize: '.8rem',
    },
    mobileMenuList: {
      marginBottom: 'auto',
    },
    logoContainer: {
      boxSizing: 'content-box',
    },
    navbarRight: {
      marginRight: theme.spacing(1),
      '& > *': {
        marginRight: theme.spacing(1),
      },
    },
    search: {
      alignItems: 'flex-start',
    },
    'ais-Hits': {
      maxHeight: theme.spacing(25),
      overflowY: 'scroll',
      overflowX: 'auto',
    },
    orgControls: {
      borderTop: `1px solid ${theme.palette.divider}`,
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    drawerRoot: {
      zIndex: `${theme.zIndex.modal + 5} !important` as any,
    },
    drawerPaper: {
      backgroundColor: theme.palette.primary.main,
      width: '100vw',
      minHeight: '100vh',
      color: theme.palette.common.white,
      fontSize: '1.3rem',
    },
    mobileMenuSubheader: {
      color: sherpablue[100],
    },
    mobileMenuLogo: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      marginRight: theme.spacing(2),
      width: theme.spacing(30),
    },
    mobileIconButon: {
      padding: 0,
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
