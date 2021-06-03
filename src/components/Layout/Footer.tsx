import { Link } from 'gatsby'
import React from 'react'
import {
  createStyles,
  withStyles,
  Typography,
  Grid,
  Box,
  Container,
  Theme,
} from '@material-ui/core'
import { OpenInNewOutlined } from '@material-ui/icons'
import { mediumgrey, sherpablue } from '../../theme/ocPalette.constants'
import footerLogo from '../../assets/svg/Sitecore_logo_RGB_white.svg'
import { PortalLink } from '../Shared/PortalLink'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      zIndex: 0,
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
      [theme.breakpoints.up('md')]: {
        bottom: 0,
        left: 0,
        right: 0,
      },
      backgroundColor: '#232323',
      borderTop: '2px solid',
      borderColor: '#232323',
      ...theme.typography.body2,
    },
    inner: {
      display: 'flex',
      flexFlow: 'row nowrap',
    },
    footerContent: {
      flex: '1',
    },
    footerAside: {
      [theme.breakpoints.up('md')]: {
        flex: '0 0 350px',
      },
    },
    logo: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      marginRight: theme.spacing(2),
      width: theme.spacing(30),
    },
    Typography: {
      color: mediumgrey[400],
      justifySelf: 'flex-start',
    },
    sectionTitle: {
      letterSpacing: theme.spacing(0.2),
      fontWeight: 700,
      color: 'white',
    },
    footerLogo: {
      maxWidth: 50,
      maxHeight: 50,
    },
    footerLogoSvg: {
      height: 'auto',
      width: '100%',
      fill: mediumgrey[500],
      '&:hover': {
        fill: theme.palette.primary.main,
      },
    },
    footerLinks: {
      display: 'flex',
      alignItems: 'center',
      margin: `${theme.spacing(0.5)}px 0px`,
      fontWeight: 300,
      color: theme.palette.grey[200],
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  })

class Footer extends React.Component<any> {
  public render() {
    const currentYear = new Date().getFullYear()
    const { classes } = this.props
    return (
      <footer className={classes.root}>
        <Container className={classes.inner}>
          <Grid
            className={classes.footerContent}
            container
            spacing={3}
            justify="space-between"
            alignItems="flex-start"
          >
            <Grid item xs={6} md={3}>
              <Box marginY={2} display="flex" flexDirection="column">
                <Typography
                  className={classes.sectionTitle}
                  component="h6"
                  variant="h6"
                >
                  Discover
                </Typography>
                <Link
                  className={classes.footerLinks}
                  to="/discover/platform-overview"
                >
                  Platform Overview
                </Link>
                <Link
                  className={classes.footerLinks}
                  to="/discover/define-your-marketplace"
                >
                  Define Your Marketplace
                </Link>
                <Link
                  className={classes.footerLinks}
                  to="/discover/personalized-shopping"
                >
                  Personalized Shopping
                </Link>
                <Link
                  className={classes.footerLinks}
                  to="/discover/flexible-fulfillment"
                >
                  Flexible Fulfillment Workflows
                </Link>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box marginY={2} display="flex" flexDirection="column">
                <Typography
                  className={classes.sectionTitle}
                  component="h6"
                  variant="h6"
                >
                  Learn
                </Typography>
                <Link
                  className={classes.footerLinks}
                  to="/learn/ordercloud-basics/architecture"
                >
                  OrderCloud Basics
                </Link>
                <Link
                  className={classes.footerLinks}
                  to="/learn/getting-started/welcome-to-ordercloud"
                >
                  Getting Started
                </Link>
                <Link className={classes.footerLinks} to="/developer-tools">
                  Developer Tools
                </Link>
                <Link className={classes.footerLinks} to="/knowledge-base">
                  Knowledge Base
                </Link>
                <Link className={classes.footerLinks} to="/api-reference">
                  API Reference
                </Link>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box display="flex" flexDirection="column" marginY={2}>
                <Typography
                  className={classes.sectionTitle}
                  component="h6"
                  variant="h6"
                >
                  Channels
                </Typography>
                <Link className={classes.footerLinks} to="/slack">
                  Slack Community
                </Link>
                <a
                  className={classes.footerLinks}
                  href="https://stackoverflow.com/questions/tagged/ordercloud"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Stack Overflow
                  <Box marginLeft={0.5} display="flex" alignItems="center">
                    <OpenInNewOutlined fontSize="inherit" />
                  </Box>
                </a>
                <a
                  className={classes.footerLinks}
                  href="https://twitter.com/Sitecore"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                  <Box marginLeft={0.5} display="flex" alignItems="center">
                    <OpenInNewOutlined fontSize="inherit" />
                  </Box>
                </a>
                <a
                  className={classes.footerLinks}
                  href="https://www.youtube.com/user/sitecorechannel"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  YouTube
                  <Box marginLeft={0.5} display="flex" alignItems="center">
                    <OpenInNewOutlined fontSize="inherit" />
                  </Box>
                </a>
                <a
                  className={classes.footerLinks}
                  href="https://www.linkedin.com/company/sitecore/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Linkedin
                  <Box marginLeft={0.5} display="flex" alignItems="center">
                    <OpenInNewOutlined fontSize="inherit" />
                  </Box>
                </a>
              </Box>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box display="flex" flexDirection="column" marginY={2}>
                <Typography
                  className={classes.sectionTitle}
                  component="h6"
                  variant="h6"
                >
                  More
                </Typography>
                <PortalLink className={classes.footerLinks} to="/">
                  OrderCloud Portal
                </PortalLink>
                <Link className={classes.footerLinks} to="/release-notes">
                  API Release Notes
                </Link>
                <Link
                  className={classes.footerLinks}
                  to="/portal-release-notes/v1.0.52"
                >
                  Portal Release Notes
                </Link>
                <a
                  className={classes.footerLinks}
                  href="https://www.sitecore.com/trust/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                  <Box marginLeft={0.5} display="flex" alignItems="center">
                    <OpenInNewOutlined fontSize="inherit" />
                  </Box>
                </a>
                <a
                  className={classes.footerLinks}
                  href="https://www.sitecore.com/company/contact-us"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contact Us
                  <Box marginLeft={0.5} display="flex" alignItems="center">
                    <OpenInNewOutlined fontSize="inherit" />
                  </Box>
                </a>
                <a
                  className={classes.footerLinks}
                  href="https://www.sitecore.com/products/sitecore-commerce"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Sitecore
                  <Box marginLeft={0.5} display="flex" alignItems="center">
                    <OpenInNewOutlined fontSize="inherit" />
                  </Box>
                </a>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="flex-start"
              >
                <img className={classes.logo} src={footerLogo} alt="OC" />
              </Box>
              <Typography variant="body2" className={classes.Typography}>
                © Copyright {currentYear}, Sitecore OrderCloud. All rights
                reserved.
              </Typography>
            </Grid>
          </Grid>
          <div className={classes.footerAside}></div>
        </Container>
      </footer>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Footer)
