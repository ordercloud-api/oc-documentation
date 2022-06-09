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
  CallMade,
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
import {
  darkgrey,
  sherpablue,
  sizzlingred,
} from '../../theme/ocPalette.constants'
import { sc_primary, sc_teal } from '../../theme/sitecorePalette.constants'
import themeConstants from '../../theme/theme.constants'
import ButtonLink from '../Shared/ButtonLink'
import { CustomButtonLink } from '../Shared/ButtonVariants'
import Jumbotron from '../Shared/Jumbotron'
import ListItemLink from '../Shared/ListItemLink'
import { navigate } from '../Shared/PortalLink'
import './../../../custom.d.ts' // custom type definitions
import { navHeight, navHeightMobile } from './Header'
import logoAngular from '../../assets/svg/technology-logos/angular.svg'
import logoJavascript from '../../assets/svg/technology-logos/js.svg'
import logoTypescript from '../../assets/svg/technology-logos/ts.svg'
import logoCSharp from '../../assets/svg/technology-logos/csharp.svg'
import logoNext from '../../assets/svg/technology-logos/nextjs.svg'
import logoReact from '../../assets/svg/technology-logos/react.svg'
import logoVue from '../../assets/svg/technology-logos/vue.svg'

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
    paperCardAction: {
      transition: 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)',
      borderRadius: theme.shape.borderRadius,
      display: 'flex',
      '&:hover': {
        textDecoration: 'none',
        transform: 'translateY(-3px)',
      },
    },
    buttonEndArrowIcon: {
      fontSize: '1rem !important',
      fill: sizzlingred[300],
      transform: 'rotate(45deg)', // <CallMade/> icon most accurately matches Sitecore guidelines; however, it needs to be rotated.
    },
    paperCard: {
      width: '100%',
      display: 'flex',
      flexFlow: 'column nowrap',
      alignItems: 'flex-start',
      padding: theme.spacing(3),
      [theme.breakpoints.up('md')]: {
        height: '100%',
        minHeight: 375,
      },
    },
    btnCardAction: {
      alignSelf: 'flex-end',
      marginTop: 'auto',
      padding: theme.spacing(1, 2),
      [theme.breakpoints.up('lg')]: {
        marginTop: theme.spacing(2),
      },
    },
    paperTitleHeading: {
      padding: 0,
      margin: theme.spacing(1.5, 0),
      fontWeight: 700,
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
    iconTech: {
      height: 75,
      width: 75,
      overflow: 'hidden',
      boxShadow: theme.shadows[1],
      display: 'flex',
      flexFlow: 'row wrap',
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing(2),
      '& img': {
        height: 'auto',
        maxWidth: '100%',
      },
    },
    List: {
      '& .MuiButtonBase-root': {
        textDecortation: 'none',
      },
    },
    marginTopMd: {
      marginTop: theme.spacing(5),
      [theme.breakpoints.up('md')]: {
        marginTop: theme.spacing(10),
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
        heading="Sitecore OrderCloud"
        text={[
          'With Sitecore OrderCloud®, design your own commerce solution with an API-first, headless cloud platform for B2B, B2C, and B2X. OrderCloud powers custom eCommerce experiences, order management, and B2B marketplace applications for some of the world’s most well-known brands - processing over 25 million transactions and $5 billion in revenue annually.',
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
              className={classes.paperCardAction}
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
                <ButtonLink
                  className={classes.btnCardAction}
                  to="/discover/define-your-marketplace"
                  endIcon={
                    <CallMade
                      fontSize="small"
                      aria-hidden="true"
                      className={classes.buttonEndArrowIcon}
                    />
                  }
                >
                  Read More
                </ButtonLink>
              </Paper>
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm={6} lg={3} className={classes.paperRoot}>
            <ButtonBase
              className={classes.paperCardAction}
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
                <ButtonLink
                  className={classes.btnCardAction}
                  to="/discover/define-your-marketplace"
                  endIcon={
                    <CallMade
                      fontSize="small"
                      aria-hidden="true"
                      className={classes.buttonEndArrowIcon}
                    />
                  }
                >
                  Read More
                </ButtonLink>
              </Paper>
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm={6} lg={3} className={classes.paperRoot}>
            <ButtonBase
              className={classes.paperCardAction}
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
                <ButtonLink
                  className={classes.btnCardAction}
                  to="/discover/personalized-shopping"
                  endIcon={
                    <CallMade
                      fontSize="small"
                      aria-hidden="true"
                      className={classes.buttonEndArrowIcon}
                    />
                  }
                >
                  Read More
                </ButtonLink>
              </Paper>
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm={6} lg={3} className={classes.paperRoot}>
            <ButtonBase
              className={classes.paperCardAction}
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
                <ButtonLink
                  className={classes.btnCardAction}
                  to="/discover/flexible-fulfillment"
                  endIcon={
                    <CallMade
                      fontSize="small"
                      aria-hidden="true"
                      className={classes.buttonEndArrowIcon}
                    />
                  }
                >
                  Read More
                </ButtonLink>
              </Paper>
            </ButtonBase>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="lg">
        <Box pt={6} pb={3} px={20}>
          <Divider />
        </Box>
        <Typography variant="h1" align="center">
          Future-Proof with Headless Architecture
        </Typography>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} sm={6}>
            <Typography variant="h3">
              Our RESTful API was built
              <br />
              by developers, for developers.
            </Typography>
            <Typography variant="h5" color="textSecondary">
              OrderCloud’s proven architecture has enabled developers from
              around the world to bring powerful B2B applications to life. We
              aim to provide unmatched interoperability by using standardized
              W3C web standards, extensible data models, and rich feature-sets.
            </Typography>
            <Box
              display="flex"
              flexDirection="row"
              flexWrap="noWrap"
              marginTop={3}
              style={{ gap: 24 }}
            >
              <CustomButtonLink
                color={sc_primary[500]}
                to="/learn/ordercloud-basics/architecture"
                variant="contained"
                size="large"
              >
                Learn the Basics
              </CustomButtonLink>
              <ButtonLink
                to="/learn/getting-started/welcome-to-ordercloud"
                size="large"
                endIcon={
                  <CallMade
                    fontSize="small"
                    aria-hidden="true"
                    className={classes.buttonEndArrowIcon}
                  />
                }
              >
                Start Coding
              </ButtonLink>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              gutterBottom
              color="textSecondary"
              variant="body2"
              align="center"
            >
              <em>Use any stack with OrderCloud</em>
            </Typography>
            <Box
              display="flex"
              justifyContent="center"
              flexWrap="wrap"
              style={{ gap: 16 }}
            >
              <div className={classes.iconTech}>
                <img src={logoJavascript} title="Javascript" alt="JS Logo" />
              </div>
              <div className={classes.iconTech}>
                <img src={logoTypescript} title="Typescript" alt="TS Logo" />
              </div>
              <div className={classes.iconTech}>
                <img src={logoCSharp} title="C#" alt="C# Logo" />
              </div>
              <div className={classes.iconTech}>
                <img src={logoNext} title="Next" alt="Next Logo" />
              </div>
              <div style={{ flexBasis: '100%' }} aria-hidden="true"></div>
              <div className={classes.iconTech}>
                <img src={logoReact} title="React" alt="React Logo" />
              </div>
              <div className={classes.iconTech}>
                <img src={logoAngular} title="Angular" alt="Angular Logo" />
              </div>
              <div className={classes.iconTech}>
                <img src={logoVue} title="Vue" alt="Vue Logo" />
              </div>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={4} className={classes.marginTopMd}>
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
            <Typography variant="h5" align="right" color="textSecondary">
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
              style={{ gap: 16 }}
            >
              <CustomButtonLink
                to="/developer-tools"
                variant="contained"
                size="large"
                color={sc_primary[500]}
              >
                Developer Tools
              </CustomButtonLink>
              <ButtonLink
                to="/knowledge-base"
                size="large"
                endIcon={
                  <CallMade
                    fontSize="small"
                    aria-hidden="true"
                    className={classes.buttonEndArrowIcon}
                  />
                }
              >
                Knowledge Base
              </ButtonLink>
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
        <Typography
          variant="h5"
          paragraph
          component="p"
          align="center"
          color="textSecondary"
        >
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
          style={{ gap: 16 }}
        >
          <Button
            onClick={() => navigate('/register')}
            color="primary"
            variant="contained"
            size="large"
          >
            Sign Up
          </Button>
          <ButtonLink
            to="/slack"
            size="large"
            color="primary"
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
