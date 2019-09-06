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
import {
  flame,
  sherpablue,
  sunset,
  mediumgrey,
} from '../../theme/ocPalette.constants'
import ocDegrees from '../../assets/images/four51-background-degrees-light.svg'

const styles = (theme: Theme) =>
  createStyles({
    jumbotron: {
      display: 'flex',
      position: 'relative',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '50vh',
      borderRadius: 0,
      overflowY: 'hidden',
      overflowX: 'hidden',
      backgroundColor: sherpablue[500],
      backgroundImage: `linear-gradient(90deg, ${sherpablue[500]} 0%, ${sherpablue[400]} 100%)`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      '-webkit-background-size': 'cover',
      '-moz-background-size': 'cover',
      '-o-background-size': 'cover',
    },
    jumbotronSecondary: {
      backgroundColor: theme.palette.secondary.main,
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
      padding: 0,
      fontWeight: 'bolder',
      textTransform: 'uppercase',
      color: sherpablue[50],
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
                className={classes.jumbotronText}
                variant={image ? 'subtitle1' : 'h4'}
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
