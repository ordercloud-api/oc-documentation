import { Link } from 'gatsby'
import React from 'react'
import {
  Theme,
  createStyles,
  withStyles,
  Typography,
  Grid,
  Box,
  Container,
} from '@material-ui/core'
import { OpenInNewOutlined } from '@material-ui/icons'
import { mediumgrey, blackpearl } from '../../theme/ocPalette.constants'
import ocOrange from '../../../src/assets/images/four51-logo--orange.svg'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      zIndex: 0,
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
      [theme.breakpoints.up('md')]: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: -1,
      },
      backgroundColor: blackpearl[500],
      borderTop: '2px solid',
      borderColor: mediumgrey[100],
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
      flex: '0 0 350px',
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
      textTransform: 'uppercase',
      letterSpacing: theme.spacing(0.2),
      fontWeight: 600,
      color: theme.palette.grey[600],
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
    const { siteTitle, classes, right, theme, sections } = this.props
    return (
      <div className={classes.root}>
        <Container className={classes.inner}>
          <Grid
            className={classes.footerContent}
            container
            spacing={3}
            justify="space-between"
            alignItems="flex-start"
          >
            <Grid item xs={12}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="flex-start"
              >
                <img className={classes.logo} src={ocOrange} alt="OC" />
                {/* <Typography variant="h4">OrderCloud</Typography> */}
              </Box>
              <Typography variant="body2" className={classes.Typography}>
                © {currentYear} OrderCloud All rights reserved.
              </Typography>
            </Grid>
            <Grid item xs={6} md={4}>
              {sections && (
                <Box marginY={2} display="flex" flexDirection="column">
                  <Typography
                    className={classes.sectionTitle}
                    component="h6"
                    variant="h6"
                  >
                    Docs
                  </Typography>
                  {sections.map(section => (
                    <Link
                      className={classes.footerLinks}
                      key={section.title}
                      to={section.guides[0].path}
                    >
                      {section.title}
                    </Link>
                  ))}
                  <Link className={classes.footerLinks} to="/api-reference">
                    API Reference
                  </Link>
                </Box>
              )}
            </Grid>
            <Grid item xs={6} md={4}>
              <Box display="flex" flexDirection="column" marginY={2}>
                <Typography
                  className={classes.sectionTitle}
                  component="h6"
                  variant="h6"
                >
                  Channels
                </Typography>
                <a
                  className={classes.footerLinks}
                  href="https://developer.ordercloud.io/community"
                  target="_blank"
                >
                  Slack Community
                  <Box marginLeft={0.5} display="flex" alignItems="center">
                    <OpenInNewOutlined fontSize="inherit" />
                  </Box>
                </a>
                <a
                  className={classes.footerLinks}
                  href="https://stackoverflow.com/questions/tagged/ordercloud"
                  target="_blank"
                >
                  Stack Overflow
                  <Box marginLeft={0.5} display="flex" alignItems="center">
                    <OpenInNewOutlined fontSize="inherit" />
                  </Box>
                </a>
                <a
                  className={classes.footerLinks}
                  href="https://twitter.com/OrderCloudIO"
                  target="_blank"
                >
                  Twitter
                  <Box marginLeft={0.5} display="flex" alignItems="center">
                    <OpenInNewOutlined fontSize="inherit" />
                  </Box>
                </a>
                <Link className={classes.footerLinks} to="/blog">
                  Blog
                </Link>
              </Box>
            </Grid>
            <Grid item xs={6} md={4}>
              <Box display="flex" flexDirection="column" marginY={2}>
                <Typography
                  className={classes.sectionTitle}
                  component="h6"
                  variant="h6"
                >
                  More
                </Typography>
                <Link
                  className={classes.footerLinks}
                  to="/release-notes/v1.0.109"
                >
                  API Release Notes
                </Link>
                <Link className={classes.footerLinks} to="/">
                  Terms
                </Link>
                <Link className={classes.footerLinks} to="/">
                  Privacy Policy
                </Link>
                <Link className={classes.footerLinks} to="/">
                  Four51
                </Link>
              </Box>
            </Grid>
          </Grid>
          <div className={classes.footerAside}></div>
        </Container>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Footer)
