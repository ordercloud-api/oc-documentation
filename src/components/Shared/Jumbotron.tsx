import React, { Fragment } from 'react'
// import { Link } from 'gatsby';
import {
  createStyles,
  Theme,
  withStyles,
  Typography,
  Paper,
} from '@material-ui/core'
import Particles from 'react-particles-js'

const styles = (theme: Theme) =>
  createStyles({
    jumbotron: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '50vh',
      backgroundColor: 'transparent',
      color: 'white',
      borderRadius: 0,
      position: 'relative',
      backgroundImage: `linear-gradient(62deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.light} 100%)`,
    },
    jumbotronParticle: {
      position: 'absolute',
      // backgroundColor: theme.palette.primary.main,
      width: '100vw',
      height: '50vh',
    },
    jumbotronHeading: {
      zIndex: 1,
    },
    jumbtronBtnGroup: {
      display: 'flex',
      maxWidth: '75vw',
      marginTop: theme.spacing(4),
    },
    jumbtronBtnGroupLink: {
      color: theme.palette.text.primary,
    },
  })

class Jumbotron extends React.Component<any> {
  public render() {
    const { classes } = this.props
    return (
      <Fragment>
        <Particles
          className={classes.jumbotronParticle}
          params={{
            particles: {
              number: {
                value: 150,
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
        <Paper className={classes.jumbotron}>
          <Typography
            className={classes.jumbotronHeading}
            variant="h2"
            component="h1"
          >
            OrderCloud Documentation
          </Typography>
        </Paper>
      </Fragment>
    )
  }
}

export default withStyles(styles)(Jumbotron)
