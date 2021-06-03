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
import { graphql, Link, StaticQuery } from 'gatsby'
import React, { Fragment, FunctionComponent, useMemo } from 'react'
import sitecoreLogo from '../../assets/svg/oclogo_dark.svg'
import ORDERCLOUD_THEME from '../../theme/theme.constants'
import ChipLink from '../Shared/ChipLink'
import DocSearch from '../Shared/DocSearch'
import { PortalLink, navigate } from '../Shared/PortalLink'

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
      width: theme.spacing(8),
      height: theme.spacing(5),
      [theme.breakpoints.down('md')]: {
        marginRight: 'auto',
      },
    },
    lockup: {
      color: theme.palette.text.primary,
      fontFamily: 'AvenirNextR',
      margin: theme.spacing(0, 0, -0.25),
      '& > span': {
        display: 'block',
      },
    },
    sitecoreText: {
      textTransform: 'uppercase',
      fontSize: 10,
      lineHeight: '0.8em',
    },
    ordercloudText: {
      fontSize: 16,
      lineHeight: '1em',
    },
    trademark: {
      fontSize: 5,
      float: 'right',
    },
    logoTypography: {
      display: 'none',
      height: theme.spacing(4),
      [theme.breakpoints.up('md')]: {
        display: 'block',
      },
    },
    appBar: {
      backgroundColor: theme.palette.background.paper,
    },
    appBarSecondary: {
      backgroundColor: theme.palette.grey[700],
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
      marginRight: 0,
    },
    searchBoxInput: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      width: 150,
      [theme.breakpoints.up('sm')]: {
        width: 250,
      },
    },
    registerCta: {
      height: '100%',
      marginRight: '0 !important',
      padding: theme.spacing(1.5, 1, 1.5, 2),
      background: `${theme.palette.secondary.main} !important`,
      color: `${theme.palette.secondary.contrastText} !important`,
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
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'))
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
        <AppBar
          position="relative"
          color="default"
          elevation={0}
          className={classes.appBar}
        >
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
                    <span>Create a Free Account</span>
                    <ChevronRight />
                  </PortalLink>
                </Toolbar>
              </Container>
            </div>
          </Hidden>
          <Container maxWidth="lg">
            <Toolbar disableGutters>
              <Link to="/" className={classes.logo}>
                <img className={classes.logoIcon} src={sitecoreLogo}></img>
                <h1 className={classes.lockup}>
                  <span className={classes.trademark}>TM</span>
                  <span className={classes.sitecoreText}>Sitecore</span>
                  <span className={classes.ordercloudText}>OrderCloud</span>
                </h1>
              </Link>
              <Hidden smDown>
                <Button
                  onClick={() => navigate('')}
                  variant="outlined"
                  color="primary"
                >
                  Portal
                </Button>
                <div className={classes.spacer} />
              </Hidden>
              <div className={classes.grow} />
              <DocSearch
                classes={{
                  searchBox: classes.searchBox,
                  searchBoxInput: classes.searchBoxInput,
                }}
                placeholder={isMobile && 'Search...'}
                darkMode={true}
                noPopper={isMobile}
              ></DocSearch>
              <Hidden smDown>
                <div className={classes.spacer} />

                <ChipLink
                  label={`v${currentApiVersion}`}
                  to={`/release-notes/v${latestReleaseNoteVersion}`}
                />
              </Hidden>
            </Toolbar>
          </Container>
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
