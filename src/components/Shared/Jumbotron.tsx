import React, { Fragment } from 'react'
import {
  Link,
  createStyles,
  Theme,
  withStyles,
  Typography,
  Paper,
  Button,
  Hidden,
} from '@material-ui/core'
import { Link as LinkyDinky } from 'gatsby'
import Particles from 'react-particles-js'

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
      overflowY: 'hidden',
    },
    jumbotronContainer: {
      backgroundColor: 'transparent',
      boxShadow: 'none',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      zIndex: 1,
    },
    jumbotronLinkGroup: {
      display: 'flex',
      maxWidth: '75vw',
      marginTop: theme.spacing(5),
    },
    jumbotronLinkGroupLink: {
      '&:first-of-type': {
        marginRight: theme.spacing(3),
      },
    },
    jumbotronHeading: {
      fontWeight: 600,
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
        <Hidden className={classes.hidden} mdDown implementation="css">
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
        <Paper className={classes.jumbotronContainer}>
          <Typography
            className={classes.jumbotronHeading}
            variant="h2"
            component="h1"
          >
            OrderCloud Documentation
          </Typography>
          <div className={classes.jumbotronLinkGroup}>
            <Button
              size="large"
              href="/herp"
              variant="contained"
              className={classes.jumbotronLinkGroupLink}
            >
              Herp!
            </Button>
            <Button
              size="large"
              color="secondary"
              href="/derp"
              variant="outlined"
              className={classes.jumbotronLinkGroupLink}
            >
              Derp?
            </Button>
          </div>
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(Jumbotron)
