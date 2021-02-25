import {
  Container,
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Toolbar,
  Typography,
} from '@material-ui/core/'
import React, { FunctionComponent } from 'react'
import { Helmet } from 'react-helmet'
import { navHeight, navHeightMobile } from '../components/Layout/Header'
import Layout from '../components/Layout/Layout'
import { CustomButtonLink } from '../components/Shared/ButtonVariants'
import Jumbotron from '../components/Shared/Jumbotron'
import { darkgrey, flame, sherpablue } from '../theme/ocPalette.constants'
import '../../custom.d.ts' // custom type definitions

if (typeof window !== 'undefined') {
  // attach smooth scroll to all hrefs
  // we ignore lint rule because we want to dynamically resolve smooth-scroll in browser env only
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('smooth-scroll')('a[href*="#"]')
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchBox: {
      position: 'absolute',
      right: theme.spacing(4),
      top: theme.spacing(3),
    },
    spacer: {
      width: theme.spacing(1),
    },
    root: {
      minHeight: `calc(100vh - ${navHeightMobile}px)`,
      [theme.breakpoints.up('md')]: {
        minHeight: `calc(100vh - ${navHeight}px)`,
      },
    },
    paperRoot: {
      zIndex: 1,
      flexGrow: 1,
    },
    paperCard: {
      position: 'relative',
      flexFlow: 'column nowrap',
      alignItems: 'center',
      maxWidth: '100vw',
      padding: theme.spacing(3),
      [theme.breakpoints.up('md')]: {
        height: '100%',
      },
    },
    paperTitleHeading: {
      padding: theme.spacing(0, 0, 1),
      color: darkgrey[900],
      textAlign: 'left',
    },
    paperTitleSubheading: {
      color: darkgrey[500],
      padding: theme.spacing(0),
    },
    avatar: {
      backgroundColor: theme.palette.background.default,
      border: `1px solid ${sherpablue[100]}`,
    },
    cardWrapper: {
      overflowX: 'hidden',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        margin: '0',
      },
      [theme.breakpoints.up('sm')]: {
        marginTop: '-7rem',
      },
      [theme.breakpoints.up('md')]: {
        marginTop: '-5rem',
      },
    },
    orangeTitle: {
      color: flame[500],
    },
  })
)

const DeveloperTools: FunctionComponent = () => {
  const classes = useStyles()
  return (
    <Layout>
      <Helmet title={`Developer Tools | Four51 OrderCloud`} />
      <Jumbotron
        overlayed={true}
        heading="Developer Tools"
        text="Build solutions the way you want with our growing library of developer tools"
      />
      <Container maxWidth="lg">
        <Grid container className={classes.cardWrapper} spacing={3}>
          <Grid item md={4} className={classes.paperRoot}>
            <Paper elevation={3} className={classes.paperCard}>
              <Typography variant="h3" className={classes.paperTitleHeading}>
                Learn the Basics
              </Typography>
              <Typography variant="h6" paragraph component="p">
                New to OrderCloud? Start out by learning what makes us one of
                the most flexible and advanced B2B E-Commerce platforms.
              </Typography>
              <Toolbar disableGutters>
                <CustomButtonLink
                  to="/learn/ordercloud-basics/architecture"
                  variant="outlined"
                  color={sherpablue[500]}
                >
                  OrderCloud Basics
                </CustomButtonLink>
                <div className={classes.spacer} />
                <CustomButtonLink
                  to="/learn/getting-started/welcome-to-ordercloud"
                  variant="contained"
                  color={flame[600]}
                >
                  Get Started
                </CustomButtonLink>
              </Toolbar>
            </Paper>
          </Grid>
          <Grid item md={4} className={classes.paperRoot}>
            <Paper elevation={3} className={classes.paperCard}>
              <Typography variant="h3" className={classes.paperTitleHeading}>
                Explore OrderCloud
              </Typography>
              <Typography variant="h6" paragraph component="p">
                See every resource, endpoint, and method we have to offer by
                browsing our detailed technical documentation.
              </Typography>
              <Toolbar disableGutters>
                <CustomButtonLink
                  to="/api-reference"
                  variant="outlined"
                  color={flame[600]}
                >
                  View API Reference
                </CustomButtonLink>
              </Toolbar>
            </Paper>
          </Grid>
          <Grid item md={4} className={classes.paperRoot}>
            <Paper className={classes.paperCard}>
              <Typography className={classes.paperTitleHeading} variant="h3">
                Knowledge Base
              </Typography>
              <Typography variant="h6" paragraph component="p">
                OrderCloud veteran? Find use cases and tutorials relevant to the
                solution you need in our growing library of implementation
                guides.
              </Typography>
              <Toolbar disableGutters>
                <CustomButtonLink
                  to="/knowledge-base"
                  variant="outlined"
                  color={flame[600]}
                >
                  See All Articles
                </CustomButtonLink>
              </Toolbar>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}

export default DeveloperTools
