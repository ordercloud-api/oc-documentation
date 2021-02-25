import {
  Box,
  Container,
  createStyles,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Toolbar,
  Typography,
} from '@material-ui/core/'
import React from 'react'
import {
  darkgrey,
  flame,
  seafoam,
  sherpablue,
} from '../../theme/ocPalette.constants'
import { CustomButtonLink } from '../Shared/ButtonVariants'
import Jumbotron from '../Shared/Jumbotron'
import './../../../custom.d.ts' // custom type definitions
import { navHeight, navHeightMobile } from './Header'

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

const ResourcesComponent: React.FunctionComponent = props => {
  const classes = useStyles(props)
  return (
    <React.Fragment>
      <Jumbotron
        overlayed={true}
        heading="OrderCloud Resources"
        text="Everything you need to master creating a complex B2B commerce solution that is secure, scalable, and beautiful."
        // actions={[
        //   <CustomButtonLink
        //     key="test"
        //     to="/main-concepts/organization-hierarchy"
        //     variant="contained"
        //     color={flame[600]}
        //   >
        //     Developer Tools
        //   </CustomButtonLink>,
        // ]}
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
      {/* 
      <Box paddingY={5} paddingX={20}>
        <Divider />
      </Box>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          style={{ fontWeight: 'bold' }}
          component="h1"
          align="center"
        >
          Create Your Free Account Today!
        </Typography>
        <Typography variant="h5" paragraph component="p" align="center">
          OrderCloud provides a sandbox environment so you can start coding
          without payment right now.
        </Typography>
        <Box
          display="flex"
          flexDirection="row"
          flexWrap="noWrap"
          alignItems="center"
          justifyContent="center"
          paddingBottom={8}
        >
          <CustomButtonLink
            color={sherpablue[500]}
            to="/getting-started/intro-to-ordercloud"
            variant="contained"
          >
            Sign Up
          </CustomButtonLink>
          <div className={classes.spacer} />
          <CustomButtonLink
            to="/main-concepts/organization-hierarchy"
            variant="contained"
            color={flame[500]}
          >
            Join Our Slack
          </CustomButtonLink>
        </Box>
      </Container> */}
    </React.Fragment>
  )
}

export default ResourcesComponent
