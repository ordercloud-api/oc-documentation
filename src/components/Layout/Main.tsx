import {
  Avatar,
  Box,
  ButtonBase,
  Container,
  createStyles,
  Divider,
  Grid,
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
  AccountBalanceTwoTone,
  AttachMoneyTwoTone,
  BusinessTwoTone,
  CategoryTwoTone,
  CreditCardTwoTone,
  FindInPageTwoTone,
  ForwardTwoTone,
  LocalShippingTwoTone,
  LockTwoTone,
  PeopleTwoTone,
  PlaylistAddCheckTwoTone,
  StyleTwoTone,
} from '@material-ui/icons'
import { Link } from 'gatsby'
import Prism from 'prismjs'
import React, { useLayoutEffect } from 'react'
import {
  darkgrey,
  flame,
  mediumgrey,
  sherpablue,
} from '../../theme/ocPalette.constants'
import themeConstants from '../../theme/theme.constants'
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

const MainComponent: React.FunctionComponent = props => {
  const classes = useStyles(props)

  useLayoutEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <React.Fragment>
      <Jumbotron
        overlayed={true}
        heading="A B2B-First Marketplace Platform"
        text="Build your own marketplace with an API-first, cloud native platform ready to create your own best-of-breed experience with unbounded scalability. We already power custom eCommerce (B2B, B2C, B2X), order management, and B2B marketplace applications for some of the world’s most well-known brands - processing over 25 million transactions and $5 billion in revenue annually."
        actions={[
          <CustomButtonLink
            color="#fff"
            key="intro-to-ordercloud"
            to="/discover/platform-overview"
            variant="contained"
          >
            Platform Overview
          </CustomButtonLink>,
          <CustomButtonLink
            key="main-concepts"
            to="/resources"
            variant="contained"
            color={flame[600]}
          >
            Developers
          </CustomButtonLink>,
        ]}
      />
      <Container maxWidth="lg">
        <Grid container className={classes.cardWrapper} spacing={3}>
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
                  Define Your
                  <br />
                  Marketplace
                </Typography>
                <Typography
                  className={classes.paperTitleSubheading}
                  variant="subtitle1"
                >
                  Mirror your unique business using our flexible modeling tools
                  and access controls
                </Typography>
                <List>
                  <ListItem disableGutters>
                    <ListItemAvatar>
                      <Avatar className={classes.avatar} variant="rounded">
                        <LockTwoTone color="primary" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Administrative Roles" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemAvatar>
                      <Avatar className={classes.avatar} variant="rounded">
                        <PeopleTwoTone color="primary" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Buyers & User Groups" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemAvatar>
                      <Avatar className={classes.avatar} variant="rounded">
                        <BusinessTwoTone color="primary" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Supplier Management" />
                  </ListItem>
                </List>
                <CustomButtonLink
                  fullWidth
                  color={themeConstants.palette.secondary.main}
                  to="/discover/define-your-marketplace"
                  variant="outlined"
                >
                  Read More
                </CustomButtonLink>
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
                  Personalized
                  <br />
                  Shopping
                </Typography>
                <Typography
                  className={classes.paperTitleSubheading}
                  variant="subtitle1"
                >
                  Our robust catalog management system empowers virtually
                  limitless shopping experiences
                </Typography>
                <List>
                  <ListItem disableGutters>
                    <ListItemAvatar>
                      <Avatar className={classes.avatar} variant="rounded">
                        <AttachMoneyTwoTone color="primary" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Personalized Pricing" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemAvatar>
                      <Avatar className={classes.avatar} variant="rounded">
                        <CategoryTwoTone color="primary" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="PIM Integrations" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemAvatar>
                      <Avatar className={classes.avatar} variant="rounded">
                        <StyleTwoTone color="primary" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Variable Products" />
                  </ListItem>
                </List>
                <CustomButtonLink
                  fullWidth
                  color={themeConstants.palette.secondary.main}
                  to="/discover/personalized-shopping"
                  variant="outlined"
                >
                  Read More
                </CustomButtonLink>
              </Paper>
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm={6} lg={3} className={classes.paperRoot}>
            <ButtonBase
              className={classes.buttonBase}
              component={Link}
              to="/getting-started/intro-to-ordercloud"
            >
              <Paper elevation={5} className={classes.paperCard}>
                <Typography
                  className={classes.paperTitleHeading}
                  variant="h4"
                  component="h2"
                >
                  Integrate Your
                  <br />
                  Checkout
                </Typography>
                <Typography
                  className={classes.paperTitleSubheading}
                  variant="subtitle1"
                >
                  OrderCloud’s event system allows integrating with all major
                  service providers
                </Typography>
                <List>
                  <ListItem disableGutters>
                    <ListItemAvatar>
                      <Avatar className={classes.avatar} variant="rounded">
                        <LocalShippingTwoTone color="primary" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Shipping Estimates" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemAvatar>
                      <Avatar className={classes.avatar} variant="rounded">
                        <AccountBalanceTwoTone color="primary" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Tax Calculation" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemAvatar>
                      <Avatar className={classes.avatar} variant="rounded">
                        <CreditCardTwoTone color="primary" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Payments & Promotions" />
                  </ListItem>
                </List>
                <CustomButtonLink
                  fullWidth
                  color={themeConstants.palette.secondary.main}
                  key="intro-to-ordercloud"
                  to="/getting-started/intro-to-ordercloud"
                  variant="outlined"
                >
                  Read More
                </CustomButtonLink>
              </Paper>
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm={6} lg={3} className={classes.paperRoot}>
            <ButtonBase
              className={classes.buttonBase}
              component={Link}
              to="/getting-started/intro-to-ordercloud"
            >
              <Paper elevation={5} className={classes.paperCard}>
                <Typography
                  className={classes.paperTitleHeading}
                  variant="h4"
                  component="h2"
                >
                  Automate Fullfillment
                  <br />
                  Workflows
                </Typography>
                <Typography
                  className={classes.paperTitleSubheading}
                  variant="subtitle1"
                >
                  Powerful marketplace tools enable automating end-to-end order
                  fulfillment
                </Typography>
                <List>
                  <ListItem disableGutters>
                    <ListItemAvatar>
                      <Avatar className={classes.avatar} variant="rounded">
                        <PlaylistAddCheckTwoTone color="primary" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Approval Rules" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemAvatar>
                      <Avatar className={classes.avatar} variant="rounded">
                        <ForwardTwoTone color="primary" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Order Forwarding" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemAvatar>
                      <Avatar className={classes.avatar} variant="rounded">
                        <FindInPageTwoTone color="primary" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Shipment Tracking" />
                  </ListItem>
                </List>
                <CustomButtonLink
                  fullWidth
                  color={themeConstants.palette.secondary.main}
                  key="intro-to-ordercloud"
                  to="/getting-started/intro-to-ordercloud"
                  variant="outlined"
                >
                  Read More
                </CustomButtonLink>
              </Paper>
            </ButtonBase>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="lg">
        <Box paddingY={5} paddingX={20}>
          <Divider />
        </Box>
        <Typography variant="h1" align="center" color="secondary">
          Best-of-Breed, Headless Architecture
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h3" className={classes.orangeTitle}>
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
                key="intro-to-ordercloud"
                to="/getting-started/intro-to-ordercloud"
                variant="outlined"
              >
                Learn the Basics
              </CustomButtonLink>
              <div className={classes.spacer} />
              <CustomButtonLink
                key="main-concepts"
                to="/main-concepts/organization-hierarchy"
                variant="contained"
                color={flame[600]}
              >
                Start Coding
              </CustomButtonLink>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box bgcolor={mediumgrey[500]} width="100%" height="100%"></Box>
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
            <Typography
              variant="h3"
              align="right"
              className={classes.orangeTitle}
            >
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
              <CustomButtonLink
                color={flame[500]}
                key="intro-to-ordercloud"
                to="/getting-started/intro-to-ordercloud"
                variant="contained"
              >
                Knowledge Base
              </CustomButtonLink>
              <div className={classes.spacer} />
              <CustomButtonLink
                key="main-concepts"
                to="/main-concepts/organization-hierarchy"
                variant="outlined"
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
          <CustomButtonLink
            color={sherpablue[500]}
            key="intro-to-ordercloud"
            to="/getting-started/intro-to-ordercloud"
            variant="contained"
          >
            Sign Up
          </CustomButtonLink>
          <div className={classes.spacer} />
          <CustomButtonLink
            key="main-concepts"
            to="/main-concepts/organization-hierarchy"
            variant="contained"
            color={flame[500]}
          >
            Join Our Slack
          </CustomButtonLink>
        </Box>
      </Container>
      {/* <Container maxWidth="md">
        <Box paddingTop={7} paddingBottom={14}>
          <Typography variant="h3">
            Four51 OrderCloud™ is an API-first, headless eCommerce platform
            offering nearly limitless customizations and endless freedom for
            growth.
          </Typography>
          <Typography paragraph>
            Your eCommerce data and infrastructure are available in the cloud as
            building blocks via our RESTful API. Create best-of-breed commerce
            applications that easily integrate with your back-end systems and
            3rd party microservices. With OrderCloud, accelerate your commerce
            transformation, increase your agility, and scale limitlessly.
          </Typography>
          <Typography>
            OrderCloud powers custom eCommerce (B2B, B2C, B2X), order
            management, and B2B marketplace applications for some of the world’s
            most well-known brands - processing over 25 million transactions and
            over $5 billion in revenue annually.
          </Typography>
        </Box>
      </Container> */}
    </React.Fragment>
  )
}

export default MainComponent
