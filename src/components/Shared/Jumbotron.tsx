import React from 'react'
import {
  createStyles,
  Theme,
  withStyles,
  Typography,
  Paper,
  Button,
  Hidden,
  SvgIcon,
  Container,
} from '@material-ui/core'
import { Link } from 'gatsby'
import Particles from 'react-particles-js'
import ocLogo from '../../assets/images/four51-white.svg'

const styles = (theme: Theme) =>
  createStyles({
    jumbotron: {
      display: 'flex',
      position: 'relative',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '50vh',
      backgroundColor: 'transparent',
      borderRadius: 0,
      overflowY: 'hidden',
      overflowX: 'hidden',
      backgroundImage: `linear-gradient(62deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.light} 100%)`,
      marginTop: theme.spacing(10),
      [theme.breakpoints.up('md')]: {
        marginTop: 0,
      },
    },
    logo: {
      maxWidth: '40rem',
      width: theme.spacing(40),
      marginBottom: theme.spacing(2),
      '& path': {
        fill: 'white',
      },
    },
    hidden: {
      position: 'absolute',
      width: '100vw',
      height: '100%',
    },
    jumbotronParticle: {
      position: 'absolute',
      backgroundColor: 'transparent',
      width: '100vw',
      height: '100vh',
    },
    buttonLink: {
      textDecoration: 'none',
    },
    jumbotronContainer: {
      backgroundColor: 'transparent',
      boxShadow: 'none',
      display: 'flex',
      flexDirection: 'column',
      color: 'white',
      zIndex: 1,
      [theme.breakpoints.down('md')]: {
        padding: 20,
      },
    },
    jumbotronLinkGroup: {
      display: 'flex',
      // maxWidth: '75vw',
      marginTop: theme.spacing(3),
    },
    jumbotronLinkGroupLink: {
      '&:first-of-type': {
        marginRight: theme.spacing(3),
      },
    },
    jumbotronHeading: {
      fontWeight: 300,
      [theme.breakpoints.down('md')]: {
        fontSize: '2rem',
        margin: '0 auto',
      },
    },
  })

class Jumbotron extends React.Component<any> {
  public render() {
    const { classes } = this.props
    return (
      <div className={classes.jumbotron}>
        <Hidden mdDown implementation="js">
          <Particles
            className={classes.jumbotronParticle}
            params={{
              particles: {
                number: {
                  value: 250,
                },
                size: {
                  value: 0.25,
                },
              },
              interactivity: {
                events: {
                  onhover: {
                    enable: true,
                    mode: 'repulse',
                  },
                },
              },
            }}
          />
        </Hidden>
        <Container maxWidth="xl">
          <Paper className={classes.jumbotronContainer}>
            <img
              className={classes.logo}
              src={ocLogo}
              alt="OrderCloud by Four51"
            />
            <Typography
              className={classes.jumbotronHeading}
              variant="h4"
              component="h1"
            >
              Welcome to Documentation for OrderCloud by Four51
            </Typography>
            <div className={classes.jumbotronLinkGroup}>
              <Link
                to="/getting-started/intro-to-ordercloud"
                className={classes.buttonLink}
              >
                <Button
                  variant="contained"
                  className={classes.jumbotronLinkGroupLink}
                >
                  Intro to OrderCloud
                </Button>
              </Link>
              <Link
                to="/getting-started/quick-start-guide"
                className={classes.buttonLink}
              >
                <Button
                  color="secondary"
                  variant="contained"
                  className={classes.jumbotronLinkGroupLink}
                >
                  Quick Start Guide
                </Button>
              </Link>
            </div>
          </Paper>
        </Container>
      </div>
    )
  }
}

export default withStyles(styles)(Jumbotron)
