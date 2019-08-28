import {
  AppBar,
  Button,
  createStyles,
  Drawer,
  Hidden,
  List,
  ListItem,
  Tab,
  Tabs,
  Theme,
  Toolbar,
  withStyles,
  withWidth,
} from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import { Menu as MenuIcon } from '@material-ui/icons'
import { Link } from 'gatsby'
import React from 'react'
import Cookies from 'universal-cookie'
import ocLogo from '../../assets/images/four51-badge--flame.svg'
import ChipLink from '../Shared/ChipLink'
import DocSearch from '../Shared/DocSearch'
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

const buildChipLink = (to: string) => {
  return React.forwardRef((props: any, ref: any) => {
    return <Link {...props} to={to} ref={ref} />
  })
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
      if (partialPath === 'blog' || partialPath === 'api-reference') {
        activeTab = partialPath
      }
    }
    return (
      <React.Fragment>
        <AppBar color="primary" className={classes.root}>
          {/* <Container> */}
          <Toolbar>
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
                classes={{ flexContainer: classes.tabsContainer }}
              >
                <Tab
                  classes={{ root: classes.tab }}
                  value="console"
                  label="Console"
                  component={Link}
                  to="/console"
                ></Tab>
                <Tab
                  value="docs"
                  label="Docs"
                  classes={{ root: classes.tab }}
                  component={Link}
                  to="/"
                ></Tab>
                <Tab
                  classes={{ root: classes.tab }}
                  value="api-reference"
                  label="Reference"
                  component={Link}
                  to="/api-reference"
                ></Tab>

                <Tab
                  classes={{ root: classes.tab }}
                  value="blog"
                  label="Blog"
                  component={Link}
                  to="/blog"
                ></Tab>
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
              <Button
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
              <div className={classes.spacer}></div>
            </Hidden>
            <DocSearch
              classes={{
                searchBox: `${isMobile ? classes.mobileSearchBox : undefined}`,
                searchBoxInput: `${
                  isMobile ? classes.mobileSearchInput : undefined
                }`,
              }}
              darkMode={true}
              noPopper={isMobile}
            ></DocSearch>
          </Toolbar>
        </AppBar>
        <Drawer open={this.state.mobileOpen} onClose={this.toggleNav(false)}>
          <List>
            <ListItem>Console</ListItem>
            <ListItem>Docs</ListItem>
            <ListItem>Reference</ListItem>
            <ListItem>Blog</ListItem>
          </List>
        </Drawer>
      </React.Fragment>
    )
  }
}

const drawerWidth = '25vw'

const styles = (theme: Theme) =>
  createStyles({
    logo: {
      width: theme.spacing(7),
      height: theme.spacing(7),
      padding: theme.spacing(1),
    },
    tabs: {
      alignSelf: 'stretch',
    },
    tabsContainer: {
      height: '100%',
    },
    tab: {
      minWidth: 0,
    },
    root: {
      width: '100vw',
      left: 0,
      top: 0,
    },
    mobileSearchBox: {
      marginRight: -theme.spacing(1),
    },
    mobileSearchInput: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      width: 100,
    },
    icon: {
      color: theme.palette.common.white,
    },
    menuItem: {
      color: theme.palette.common.white,
      width: theme.spacing(40),
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
