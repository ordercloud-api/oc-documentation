import { Link } from 'gatsby'
import React from 'react'
import {
  Theme,
  createStyles,
  withStyles,
  Typography,
  Grid,
  Box,
} from '@material-ui/core'
import Toolbar from '@material-ui/core/Toolbar'
import { mediumgrey } from '../../theme/ocPalette.constants'
import whiteLogo from '../../assets/images/logo-white.svg'

const styles = (theme: Theme) =>
  createStyles({
    ocFooter: {
      position: 'fixed',
      bottom: 0,
      width: '100%',
      zIndex: -1,
      [theme.breakpoints.down('sm')]: {
        paddingBottom: theme.spacing(20),
        position: 'relative',
        zIndex: 0,
      },
      [theme.breakpoints.up('md')]: {
        height: theme.spacing(56),
        paddingLeft: theme.spacing(12),
        paddingRight: theme.spacing(56),
        maxWidth: '67%',
      },
      [theme.breakpoints.up('lg')]: {
        maxWidth: '57%',
      },
      backgroundColor: theme.palette.grey[900],
      borderTop: '2px solid',
      borderColor: mediumgrey[100],
      ...theme.typography.body2,
    },
    logo: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      marginRight: theme.spacing(2),
      width: theme.spacing(8),
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
    footerContainer: {
      paddingTop: theme.spacing(4),
      color: theme.palette.grey[50],
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
      <footer className={classes.ocFooter}>
        <Toolbar className={classes.footerContainer}>
          <Grid
            container
            spacing={3}
            justify="space-between"
            alignItems="center"
          >
            <Grid item xs={12}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="flex-start"
              >
                <img className={classes.logo} src={whiteLogo} alt="OC" />
                <Typography variant="h4">OrderCloud</Typography>
              </Box>
              <Typography variant="body2" className={classes.Typography}>
                © {currentYear} OrderCloud All rights reserved.
              </Typography>
            </Grid>
            <Grid item xs={6} md={4}>
              {sections && (
                <Box marginY={2} display="flex" flexDirection="column">
                  <Typography className={classes.sectionTitle} variant="body1">
                    Docs
                  </Typography>
                  {sections.map(section => (
                    <Link
                      className={classes.footerLinks}
                      key={section.title}
                      to={section.guides[0].frontmatter.path}
                    >
                      {section.title}
                    </Link>
                  ))}
                </Box>
              )}
            </Grid>
            <Grid item xs={6} md={4}>
              <Box display="flex" flexDirection="column" marginY={2}>
                <Typography className={classes.sectionTitle} variant="body1">
                  Channels
                </Typography>
                <Link className={classes.footerLinks} to="/">
                  Slack Community
                </Link>
                <Link className={classes.footerLinks} to="/">
                  Stack Overflow
                </Link>
                <Link className={classes.footerLinks} to="/blog">
                  Blog
                </Link>
              </Box>
            </Grid>
            <Grid item xs={6} md={4}>
              <Box display="flex" flexDirection="column" marginY={2}>
                <Typography className={classes.sectionTitle} variant="body1">
                  More
                </Typography>
                <Link className={classes.footerLinks} to="/api-release-notes">
                  API Release Notes
                </Link>
                <Link className={classes.footerLinks} to="/">
                  Terms
                </Link>
                <Link className={classes.footerLinks} to="">
                  Privacy Policy
                </Link>
                <Link className={classes.footerLinks} to="">
                  Four51
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </footer>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Footer)
