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
import ButtonLink from './ButtonLink'

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
    jumbotronSecondary: {
      backgroundImage: `linear-gradient(62deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.secondary.light} 100%)`,
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
      padding: 0,
      [theme.breakpoints.down('md')]: {
        fontSize: '2rem',
        margin: '0 auto',
      },
    },
  })

class Jumbotron extends React.Component<any> {
  public render() {
    const {
      classes,
      image,
      heading,
      text,
      actions,
      height,
      secondary,
    } = this.props
    return (
      <div
        className={`${classes.jumbotron} ${
          secondary ? classes.jumbotronSecondary : undefined
        }`}
        style={{ height }}
      >
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
        <Container>
          <Paper className={classes.jumbotronContainer}>
            {image && (
              <img className={classes.logo} src={image.src} alt={image.alt} />
            )}
            {heading && (
              <Typography
                className={classes.jumbotronHeading}
                variant={image ? 'h4' : 'h1'}
                component="h1"
              >
                {heading}
              </Typography>
            )}
            {text && (
              <Typography
                className={classes.jumbotronHeading}
                variant={image ? 'h6' : 'h4'}
                component="p"
              >
                {text}
              </Typography>
            )}
            {actions && (
              <div className={classes.jumbotronLinkGroup}>
                {actions.map(a => {
                  return (
                    <div className={classes.jumbotronLinkGroupLink}>{a}</div>
                  )
                })}
              </div>
            )}
          </Paper>
        </Container>
      </div>
    )
  }
}

export default withStyles(styles)(Jumbotron)
