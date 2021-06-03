import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  Container,
  createStyles,
  Divider,
  Grid,
  Hidden,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core/'
import {
  AccountTreeTwoTone,
  AttachMoneyTwoTone,
  BookmarkTwoTone,
  BuildTwoTone,
  BusinessTwoTone,
  CategoryTwoTone,
  Code,
  CodeOutlined,
  DeviceHub,
  EmojiObjectsTwoTone,
  ExtensionTwoTone,
  HelpTwoTone,
  LocalShippingTwoTone,
  MarkunreadMailboxTwoTone,
  PeopleTwoTone,
  PlaylistAddCheckTwoTone,
  SchoolTwoTone,
  ShoppingCartTwoTone,
} from '@material-ui/icons'
import { Link } from 'gatsby'
import Prism from 'prismjs'
import React, { useLayoutEffect } from 'react'
import { darkgrey, flame, sherpablue } from '../../theme/ocPalette.constants'
import themeConstants from '../../theme/theme.constants'
import ButtonLink from '../Shared/ButtonLink'
import { CustomButtonLink } from '../Shared/ButtonVariants'
import Jumbotron from '../Shared/Jumbotron'
import ListItemLink from '../Shared/ListItemLink'
import { navigate } from '../Shared/PortalLink'
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
      minHeight: `calc(100vh - ${navHeightMobile + 409}px)`,
      [theme.breakpoints.up('md')]: {
        minHeight: `calc(100vh - ${navHeight + 409}px)`,
      },
    },
    paperRoot: {
      zIndex: 1,
      flexGrow: 1,
    },
    buttonBase: {
      borderRadius: theme.shape.borderRadius,
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
      fontWeight: 700,
      textAlign: 'left',
      minHeight: '2.5rem',
    },
    paperTitleSubheading: {
      color: darkgrey[500],
      padding: theme.spacing(0),
      marginBottom: '0.5rem',
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
  })
)

const MainComponent: React.FunctionComponent = props => {
  const classes = useStyles(props)

  useLayoutEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <React.Fragment>
      <Jumbotron
        // image={{
        //   src: '/images/logos_horizontal_desktop.png',
        //   alt: 'homepage background',
        // }}
        overlayed={true}
        heading="SITECORE® OrderCloud™"
        text={[
          'With Sitecore® OrderCloud™, design your own commerce solution with an API-first, headless cloud platform for B2B, B2C, and B2X. OrderCloud powers custom eCommerce experiences, order management, and B2B marketplace applications for some of the world’s most well-known brands - processing over 25 million transactions and $5 billion in revenue annually.',
        ]}
        actions={[
          <ButtonLink
            key="developers"
            to="/learn/getting-started/welcome-to-ordercloud"
            variant="contained"
            size="large"
            color="secondary"
          >
            Developer Guide
          </ButtonLink>,
        ]}
      />
      <Hidden smUp>
        <Container style={{ marginTop: '0.25rem', marginBottom: '0.25rem' }}>
          <List>
            <ListItemLink to="/discover/platform-overview">
              <ListItemAvatar>
                <Avatar className={classes.avatar} variant="rounded">
                  <EmojiObjectsTwoTone color="primary" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Discover" />
            </ListItemLink>
            <ListItemLink to="/learn/ordercloud-basics/architecture">
              <ListItemAvatar>
                <Avatar className={classes.avatar} variant="rounded">
                  <SchoolTwoTone color="primary" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Learn" />
            </ListItemLink>
            <ListItemLink to="/knowledge-base">
              <ListItemAvatar>
                <Avatar className={classes.avatar} variant="rounded">
                  <BookmarkTwoTone color="primary" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Knowledge Base" />
            </ListItemLink>
            <ListItemLink to="/developer-tools">
              <ListItemAvatar>
                <Avatar className={classes.avatar} variant="rounded">
                  <BuildTwoTone color="primary" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Developer Tools" />
            </ListItemLink>
            <ListItemLink to="/api-reference">
              <ListItemAvatar>
                <Avatar className={classes.avatar} variant="rounded">
                  <CodeOutlined color="primary" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="API Reference" />
            </ListItemLink>
            <ListItemLink to="/slack">
              <ListItemAvatar>
                <Avatar className={classes.avatar} variant="rounded">
                  <HelpTwoTone color="primary" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Community" />
            </ListItemLink>
          </List>
        </Container>
      </Hidden>
      <Container maxWidth="lg">
        <Grid container className={classes.cardWrapper} spacing={3}>
          <Grid item xs={12} sm={6} lg={3} className={classes.paperRoot}>
            <ButtonBase
              className={classes.buttonBase}
              component={Link}
              to="/discover/platform-overview"
            >
              <Paper elevation={5} className={classes.paperCard}>
                <Typography
                  className={classes.paperTitleHeading}
                  variant="h4"
                  component="h2"
                >
                  Platform Overview
                </Typography>
                <Typography
                  className={classes.paperTitleSubheading}
                  variant="subtitle1"
                >
                  Wherever your business needs to go tomorrow, you’re ready to
                  lead the way.
                </Typography>
                <Hidden xsDown>
                  <List>
                    <ListItem disableGutters>
                      <ListItemAvatar>
                        <Avatar className={classes.avatar} variant="rounded">
                          <Code color="primary" />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Developer Friendly" />
                    </ListItem>
                    <ListItem disableGutters>
                      <ListItemAvatar>
                        <Avatar className={classes.avatar} variant="rounded">
                          <DeviceHub color="primary" />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Omnichannel" />
                    </ListItem>
                    <ListItem disableGutters>
                      <ListItemAvatar>
                        <Avatar className={classes.avatar} variant="rounded">
                          <BusinessTwoTone color="primary" />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Enterprise Ready" />
                    </ListItem>
                  </List>
                </Hidden>
                <ButtonLink fullWidth to="/discover/define-your-marketplace">
                  Read More
                  <img src="/images/icon-arrow.png" />
                </ButtonLink>
              </Paper>
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm={6} lg={3} className={classes.paperRoot}>
            <ButtonBase
              className={classes.buttonBase}
              component={Link}
              to="/discover/define-your-marketplace"
            >
              <Paper elevation={5} className={classes.paperCard}>
                <Typography
                  className={classes.paperTitleHeading}
                  variant="h4"
                  component="h2"
                >
                  Define Your Marketplace
                </Typography>
                <Typography
                  className={classes.paperTitleSubheading}
                  variant="subtitle1"
                >
                  Mirror your unique business using our flexible modeling tools
                  and access controls
                </Typography>
                <Hidden xsDown>
                  <List>
                    <ListItem disableGutters>
                      <ListItemAvatar>
                        <Avatar className={classes.avatar} variant="rounded">
                          <ShoppingCartTwoTone color="primary" />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Commerce Strategy" />
                    </ListItem>
                    <ListItem disableGutters>
                      <ListItemAvatar>
                        <Avatar className={classes.avatar} variant="rounded">
                          <PeopleTwoTone color="primary" />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Buyer Segments" />
                    </ListItem>
                    <ListItem disableGutters>
                      <ListItemAvatar>
                        <Avatar className={classes.avatar} variant="rounded">
                          <LocalShippingTwoTone color="primary" />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Multi-Supplier" />
                    </ListItem>
                  </List>
                </Hidden>
                <ButtonLink fullWidth to="/discover/define-your-marketplace">
                  Read More
                  <img src="/images/icon-arrow.png" />
                </ButtonLink>
              </Paper>
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm={6} lg={3} className={classes.paperRoot}>
            <ButtonBase
              className={classes.buttonBase}
              component={Link}
              to="/discover/personalized-shopping"
            >
              <Paper elevation={5} className={classes.paperCard}>
                <Typography
                  className={classes.paperTitleHeading}
                  variant="h4"
                  component="h2"
                >
                  Personalized Shopping
                </Typography>
                <Typography
                  className={classes.paperTitleSubheading}
                  variant="subtitle1"
                >
                  Our robust catalog management system empowers virtually
                  limitless experiences
                </Typography>
                <Hidden xsDown>
                  <List>
                    <ListItem disableGutters>
                      <ListItemAvatar>
                        <Avatar className={classes.avatar} variant="rounded">
                          <CategoryTwoTone color="primary" />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Custom Catalogs" />
                    </ListItem>
                    <ListItem disableGutters>
                      <ListItemAvatar>
                        <Avatar className={classes.avatar} variant="rounded">
                          <AccountTreeTwoTone color="primary" />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Product Setup" />
                    </ListItem>
                    <ListItem disableGutters>
                      <ListItemAvatar>
                        <Avatar className={classes.avatar} variant="rounded">
                          <AttachMoneyTwoTone color="primary" />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Variable Pricing" />
                    </ListItem>
                  </List>
                </Hidden>
                <ButtonLink fullWidth to="/discover/personalized-shopping">
                  Read More
                  <img src="/images/icon-arrow.png" />
                </ButtonLink>
              </Paper>
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm={6} lg={3} className={classes.paperRoot}>
            <ButtonBase
              className={classes.buttonBase}
              component={Link}
              to="/discover/flexible-fulfillment"
            >
              <Paper elevation={5} className={classes.paperCard}>
                <Typography
                  className={classes.paperTitleHeading}
                  variant="h4"
                  component="h2"
                >
                  Flexible Fullfillment
                </Typography>
                <Typography
                  className={classes.paperTitleSubheading}
                  variant="subtitle1"
                >
                  Powerful marketplace tools enable automating end-to-end order
                  fulfillment
                </Typography>
                <Hidden xsDown>
                  <List>
                    <ListItem disableGutters>
                      <ListItemAvatar>
                        <Avatar className={classes.avatar} variant="rounded">
                          <PlaylistAddCheckTwoTone color="primary" />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Checkout Process" />
                    </ListItem>
                    <ListItem disableGutters>
                      <ListItemAvatar>
                        <Avatar className={classes.avatar} variant="rounded">
                          <MarkunreadMailboxTwoTone color="primary" />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Order Fulfillment" />
                    </ListItem>
                    <ListItem disableGutters>
                      <ListItemAvatar>
                        <Avatar className={classes.avatar} variant="rounded">
                          <ExtensionTwoTone color="primary" />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Customized Logic" />
                    </ListItem>
                  </List>
                </Hidden>
                <ButtonLink fullWidth to="/discover/flexible-fulfillment">
                  Read More
                  <img src="/images/icon-arrow.png" />
                </ButtonLink>
              </Paper>
            </ButtonBase>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="lg">
        <Box paddingY={3} paddingX={20}>
          <Divider />
        </Box>
        <Typography variant="h1" align="center">
          Future-Proof with Headless Architecture
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h3">
              Our RESTful API was built
              <br />
              by developers, for developers.
            </Typography>
            <Typography variant="h5">
              OrderCloud’s proven architecture has enabled developers from
              around the world to bring powerful B2B applications to life. We
              aim to provide unmatched interopability by using standardized W3C
              web standards, extensible data models, and rich feature-sets.
            </Typography>
            <Box
              display="flex"
              flexDirection="row"
              flexWrap="noWrap"
              marginTop={3}
            >
              <CustomButtonLink
                color={themeConstants.palette.secondary.main}
                to="/learn/ordercloud-basics/architecture"
                variant="contained"
                size="large"
              >
                Learn the Basics
              </CustomButtonLink>
              <div className={classes.spacer} />
              <ButtonLink
                to="/learn/getting-started/welcome-to-ordercloud"
                size="large"
              >
                Start Coding
                <img src="/images/icon-arrow.png" />
              </ButtonLink>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <figure>
              <img
                style={{ maxWidth: '100%' }}
                src="/images/oc_homepage_logos.png"
                alt="Languages and Frameworks"
              />
            </figure>
          </Grid>
        </Grid>
        <Box height="100px"></Box>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Paper
              elevation={5}
              component="pre"
              className="language-typescript"
            >
              <code className="language-typescript">
                {`import { Me, Orders, LineItems } from "ordercloud-javascript-sdk";

let myself = await Me.Get();
let order = await Orders.Create("Outgoing", {});
let products = await Me.ListProducts();

let lineItem = await LineItems.Create("Outgoing", order.ID, {
  ProductID: products.Items[0].ID,
  Quantity: 2
});

await Orders.Submit("Outgoing", order.ID);`}
              </code>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h3" align="right">
              Open-source resources for developing
              <br />
              progressive web applications.
            </Typography>
            <Typography variant="h5" align="right">
              A headless architecture allows solution creators to choose the
              development stack that works best for their workflow. Our
              knowledge base and growing library of developer tools make
              creating solutions both efficient and enjoyable.
            </Typography>
            <Box
              display="flex"
              flexDirection="row"
              flexWrap="noWrap"
              justifyContent="flex-end"
              marginTop={3}
            >
              <ButtonLink to="/knowledge-base" size="large">
                Knowledge Base
                <img src="/images/icon-arrow.png" />
              </ButtonLink>
              <div className={classes.spacer} />
              <CustomButtonLink
                to="/developer-tools"
                variant="contained"
                size="large"
                color={themeConstants.palette.secondary.main}
              >
                Developer Tools
              </CustomButtonLink>
            </Box>
          </Grid>
        </Grid>
        <Box paddingY={5} paddingX={20}>
          <Divider />
        </Box>
      </Container>
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
          <Button
            onClick={() => navigate('/register')}
            color="secondary"
            variant="contained"
            size="large"
          >
            Sign Up
          </Button>
          <div className={classes.spacer} />
          <ButtonLink
            to="/slack"
            size="large"
            color="secondary"
            variant="outlined"
          >
            Join Our Slack
          </ButtonLink>
        </Box>
      </Container>
    </React.Fragment>
  )
}

export default MainComponent
