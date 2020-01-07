import React from 'react'
import {
  createStyles,
  Theme,
  withStyles,
  Typography,
  Paper,
  Container,
} from '@material-ui/core'
import { sherpablue, seafoam } from '../../theme/ocPalette.constants'
import ocPlatform from '../../assets/svg/Platform--Ordercloud.svg'

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
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      '-webkit-background-size': 'cover',
      '-moz-background-size': 'cover',
      '-o-background-size': 'cover',
      '&>div': {
        zIndex: 1,
      },
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
    jumbotronIcon: {
      position: 'absolute',
      top: '-10vh',
      left: '45vw',
      opacity: 0.25,
      width: '55%',
      mixBlendMode: 'exclusion',
      [theme.breakpoints.down('md')]: {
        minWidth: '150%',
        left: '6vh',
        top: 0,
      },
    },
    buttonLink: {
      textDecoration: 'none',
    },
    jumbotronContainer: {
      backgroundColor: 'transparent',
      boxShadow: 'none',
      display: 'flex',
      flexDirection: 'column',

      [theme.breakpoints.down('md')]: {
        padding: 20,
      },
    },
    jumbotronLinkGroup: {
      display: 'flex',
      marginTop: theme.spacing(3),
    },
    jumbotronLinkGroupLink: {
      '&:first-of-type': {
        marginRight: theme.spacing(3),
      },
    },
    jumbotronHeading: {
      padding: 0,
      textTransform: 'uppercase',
      marginTop: '.75rem',
      color: seafoam[50],
      [theme.breakpoints.down('md')]: {
        fontSize: '2rem',
        margin: '0 auto',
      },
    },
    jumbotronText: {
      color: seafoam[100],
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
                variant={image ? 'h2' : 'h1'}
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
                {actions.map((a, index) => {
                  return (
                    <div className={classes.jumbotronLinkGroupLink} key={index}>
                      {a}
                    </div>
                  )
                })}
              </div>
            )}
          </Paper>
        </Container>
        <img
          className={classes.jumbotronIcon}
          aria-hidden="true"
          src={ocPlatform}
          alt="OrderCloud Platform Icon"
        />
      </div>
    )
  }
}

export default withStyles(styles)(Jumbotron)
