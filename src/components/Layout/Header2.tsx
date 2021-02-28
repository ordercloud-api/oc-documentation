import {
  AppBar,
  Button,
  Container,
  createStyles,
  Hidden,
  makeStyles,
  Theme,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import { ChevronRight } from '@material-ui/icons'
import { Link, graphql, StaticQuery } from 'gatsby'

import React, { FunctionComponent, Fragment, useMemo } from 'react'
import ocLogo from '../../assets/images/four51-badge--flame-white.svg'
import ocLogoTypography from '../../assets/images/four51-logo-nopyramid--full-color.svg'
import { flame, sherpablue } from '../../theme/ocPalette.constants'
import ORDERCLOUD_THEME from '../../theme/theme.constants'
import ChipLink from '../Shared/ChipLink'
import DocSearch from '../Shared/DocSearch'
import { navigate, PortalLink } from '../Shared/PortalLink'

export const navHeight =
  ORDERCLOUD_THEME.spacing(8) + ORDERCLOUD_THEME.spacing(5)
export const navHeightMobile =
  ORDERCLOUD_THEME.spacing(7) + ORDERCLOUD_THEME.spacing(5)

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'sticky',
      top: 0,
      left: 0,
      right: 0,
      zIndex: theme.zIndex.appBar + 1,
    },
    grow: {
      flexGrow: 1,
    },
    spacer: {
      width: theme.spacing(1),
    },
    logo: {
      display: 'flex',
      flexFlow: 'row nowrap',
      alignItems: 'center',
      marginLeft: -theme.spacing(2),
      marginRight: theme.spacing(2),
      padding: theme.spacing(0.5, 1, 1),
    },
    logoIcon: {
      width: theme.spacing(4),
      height: theme.spacing(4),
      marginRight: theme.spacing(1),
      [theme.breakpoints.down('md')]: {
        marginRight: 'auto',
      },
    },
    logoTypography: {
      display: 'none',
      height: theme.spacing(4),
      [theme.breakpoints.up('md')]: {
        display: 'block',
      },
    },
    appBarSecondary: {
      '& a': {
        color: theme.palette.getContrastText(theme.palette.primary.dark),
        textDecoration: 'none',
        marginRight: theme.spacing(2),
        '&:hover': {
          textDecoration: 'underline',
        },
      },
      '& .MuiToolbar-dense': {
        minHeight: theme.spacing(5),
      },
    },
    searchBox: {
      marginRight: theme.spacing(1),
      [theme.breakpoints.up('md')]: {
        marginRight: 0,
      },
    },
    searchBoxInput: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      width: 80,
      [theme.breakpoints.up('md')]: {
        width: 100,
      },
      [theme.breakpoints.up('lg')]: {
        width: 'auto',
      },
    },
    registerCta: {
      marginRight: '0 !important',
      color: `${flame[600]} !important`,
      fontWeight: 'bold',
      display: 'flex',
      flexFlow: 'row nowrap',
      alignItems: 'center',
    },
  })
)

interface HeaderContentProps {
  data: {
    allMdx: {
      nodes: any[]
    }
    orderCloudVersion: {
      internal: {
        content: string
      }
    }
  }
}

const HeaderContent: FunctionComponent<HeaderContentProps> = ({
  data,
}: HeaderContentProps) => {
  const classes = useStyles()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isMedium = useMediaQuery(theme.breakpoints.down('md'))

  const currentApiVersion = useMemo(() => {
    return data.orderCloudVersion.internal.content
  }, [data.orderCloudVersion])

  const latestReleaseNoteVersion = useMemo(() => {
    return data.allMdx.nodes[0].frontmatter.apiVersion
  }, [data.allMdx])

  return (
    <Fragment>
      <div className={classes.root}>
        <AppBar position="relative">
          <Container maxWidth="lg">
            <Toolbar disableGutters>
              <Link to="/" className={classes.logo}>
                <img className={classes.logoIcon} src={ocLogo}></img>
                <img
                  className={classes.logoTypography}
                  src={ocLogoTypography}
                ></img>
              </Link>
              <Hidden smDown>
                <div className={classes.spacer} />

                <ChipLink
                  color="secondary"
                  label={`v${currentApiVersion}`}
                  to={`/release-notes/v${latestReleaseNoteVersion}`}
                />
              </Hidden>
              <div className={classes.grow} />
              <Hidden xsDown>
                <Button
                  onClick={() => navigate('')}
                  variant="contained"
                  color="secondary"
                >
                  Portal
                </Button>
                <div className={classes.spacer} />
              </Hidden>
              <DocSearch
                classes={{
                  searchBox: classes.searchBox,
                  searchBoxInput: classes.searchBoxInput,
                }}
                placeholder={isMedium && 'Search...'}
                darkMode={true}
                noPopper={isMobile}
              ></DocSearch>
            </Toolbar>
          </Container>
          <Hidden xsDown>
          <div className={classes.appBarSecondary}>
            <Container maxWidth="lg">
              <Toolbar variant="dense" disableGutters>
                <Link to="/discover/platform-overview">Discover</Link>
                <Link to="/learn/ordercloud-basics/architecture">Learn</Link>
                <Link to="/knowledge-base">Knowledge Base</Link>
                <Link to="/developer-tools">Developer Tools</Link>
                <Link to="/api-reference">API Reference</Link>
                <Link to="/slack">Community</Link>
                <div className={classes.grow} />
                <PortalLink className={classes.registerCta} to="/register">
                  <span>Create a Sandbox</span>
                  <ChevronRight />
                </PortalLink>
              </Toolbar>
            </Container>
          </div>
          </Hidden>
        </AppBar>
      </div>
    </Fragment>
  )
}

const Header: FunctionComponent = () => {
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
          orderCloudVersion {
            internal {
              content
            }
          }
        }
      `}
      render={data => <HeaderContent data={data} />}
    />
  )
}

export default Header
