import {
  Container,
  createStyles,
  Grid,
  Box,
  makeStyles,
  Paper,
  Button,
  Divider,
  Theme,
  Toolbar,
  Typography,
} from '@material-ui/core/'
import React, { FunctionComponent } from 'react'
import { Helmet } from 'react-helmet'
import { navHeight, navHeightMobile } from '../components/Layout/Header'
import Layout from '../components/Layout/Layout'
import ButtonLink from '../components/Shared/ButtonLink'
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
      [theme.breakpoints.up('sm')]: {
        height: '100%',
      },
    },
    paperTitleHeading: {
      padding: theme.spacing(0, 0, 1),
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
    boxMain: {
      padding: theme.spacing(2, 2, 3),
      textAlign: 'center',
    },
    btnSpacer: {
      margin: theme.spacing(0, 0.5),
    },
  })
)

const DeveloperTools: FunctionComponent = () => {
  const classes = useStyles()
  return (
    <Layout>
      <Helmet
        title={`Developer Tools | Sitecore OrderCloud`}
        meta={[
          {
            name: 'description',
            content:
              'Build solutions the way you want with our growing library of developer tools',
          },
        ]}
      />
      <Jumbotron
        overlayed={true}
        heading="Developer Tools"
        text="Build solutions the way you want with our growing library of developer tools, available under MIT licensing.  Our SDKs make it extremely easy to develop, with supporting utility and base libraries to get started."
      />
      <Container maxWidth="lg">
        <Grid container className={classes.cardWrapper} spacing={3}>
          <Grid item md={4} sm={6} className={classes.paperRoot}>
            <Paper elevation={3} className={classes.paperCard}>
              <Typography className={classes.paperTitleHeading} variant="h4">
                JavaScript SDK
              </Typography>
              <Typography paragraph component="p">
                Supports both TypeScript and JavaScript development with any of
                your favorite UI component libraries
              </Typography>
              <Toolbar disableGutters>
                <Button
                  variant="contained"
                  color="secondary"
                  href="https://github.com/ordercloud-api/OrderCloud-JavaScript-SDK"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  href="https://www.npmjs.com/package/ordercloud-javascript-sdk"
                  target="_blank"
                  rel="noreferrer"
                  className={classes.btnSpacer}
                >
                  NPM
                </Button>
              </Toolbar>
            </Paper>
          </Grid>
          <Grid item md={4} sm={6} className={classes.paperRoot}>
            <Paper elevation={3} className={classes.paperCard}>
              <Typography variant="h4" className={classes.paperTitleHeading}>
                .NET C# SDK
              </Typography>
              <Typography paragraph component="p">
                Get up and running fast with our innovative C# SDK to support
                creating and querying extensible objects for eCommerce
              </Typography>
              <Toolbar disableGutters>
                <Button
                  variant="contained"
                  color="secondary"
                  href="https://github.com/ordercloud-api/ordercloud-dotnet-sdk"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  href="https://www.nuget.org/packages/OrderCloud.SDK/"
                  target="_blank"
                  rel="noreferrer"
                  className={classes.btnSpacer}
                >
                  NuGet
                </Button>
              </Toolbar>
            </Paper>
          </Grid>
          <Grid item md={4} sm={6} className={classes.paperRoot}>
            <Paper elevation={3} className={classes.paperCard}>
              <Typography className={classes.paperTitleHeading} variant="h4">
                .NET Catalyst Middleware
              </Typography>
              <Typography paragraph component="p">
                A foundational library for crafting your own middleware
                extensions for webhooks and integrations
              </Typography>
              <Toolbar disableGutters>
                <Button
                  variant="contained"
                  color="secondary"
                  href="https://github.com/ordercloud-api/ordercloud-dotnet-catalyst"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  href="https://www.nuget.org/packages/ordercloud-dotnet-catalyst"
                  target="_blank"
                  rel="noreferrer"
                  className={classes.btnSpacer}
                >
                  NuGet
                </Button>
              </Toolbar>
            </Paper>
          </Grid>
          <Grid item md={4} sm={6} className={classes.paperRoot}>
            <Paper elevation={3} className={classes.paperCard}>
              <Typography className={classes.paperTitleHeading} variant="h4">
                OrderCloud HeadStart
              </Typography>
              <Typography paragraph component="p">
                A full implementation on OrderCloud with a buyer and admin app
                geared for bootstrapping your project or as a way to learn
              </Typography>
              <Toolbar disableGutters>
                <Button
                  variant="contained"
                  color="secondary"
                  href="https://github.com/ordercloud-api/headstart"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </Button>
              </Toolbar>
            </Paper>
          </Grid>
          <Grid item md={4} sm={6} className={classes.paperRoot}>
            <Paper elevation={3} className={classes.paperCard}>
              <Typography variant="h4" className={classes.paperTitleHeading}>
                OrderCloud on GitHub
              </Typography>
              <Typography paragraph component="p">
                Check out the many libraries and samples our teams have
                published to make building scalable eCommerce work for you
              </Typography>
              <Toolbar disableGutters>
                <Button
                  variant="contained"
                  color="secondary"
                  href="https://github.com/ordercloud-api"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </Button>
              </Toolbar>
            </Paper>
          </Grid>
          <Grid item md={4} sm={6} className={classes.paperRoot}>
            <Paper elevation={3} className={classes.paperCard}>
              <Typography className={classes.paperTitleHeading} variant="h4">
                Postman Tutorial
              </Typography>
              <Typography paragraph component="p">
                A sample project with code snippets you can reference and learn
                from, which is extremely basic, ideal for the curious
              </Typography>
              <Toolbar disableGutters>
                <Button
                  variant="outlined"
                  color="secondary"
                  href="https://documenter.getpostman.com/view/13422742/TVt19jd1"
                  target="_blank"
                  rel="noreferrer"
                >
                  Tutorial
                </Button>
              </Toolbar>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="lg">
        <Box paddingY={3} paddingX={20}>
          <Divider />
        </Box>
        <Typography variant="h2" align="center">
          Open API Standards with Swagger
        </Typography>
        <Box paddingY={3} paddingX={20} className={classes.boxMain}>
          <Typography>
            Don't see a library for your language of choice? OrderCloud is built
            with Open API standards and our SDKs are generated with libaries
            such as Swagger, and extended to make it even easier to develop
            applications. If there's a project you have and are looking for
            another language, you can generate your own client.
          </Typography>
          <br />
          <Button
            variant="outlined"
            href="https://api.ordercloud.io/v1/openapi/v3"
            target="_blank"
            rel="noreferrer"
            className={classes.btnSpacer}
          >
            Open API Spec
          </Button>

          <ButtonLink
            variant="outlined"
            to="/slack"
            color="secondary"
            className={classes.btnSpacer}
          >
            Join Our Community
          </ButtonLink>
        </Box>
        <Box paddingY={3} paddingX={20}>
          <Divider />
        </Box>
      </Container>
    </Layout>
  )
}

export default DeveloperTools
