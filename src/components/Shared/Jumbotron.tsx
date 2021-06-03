import {
  Container,
  createStyles,
  lighten,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { FunctionComponent } from 'react'
import { seafoam } from '../../theme/ocPalette.constants'
import ocPlatform from '../../assets/svg/four51-banner-bg.svg'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    jumbotron: ({ overlayed }: any) => {
      return {
        display: 'flex',
        position: 'relative',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 60,
        [theme.breakpoints.up('sm')]: {
          paddingBottom: overlayed ? 120 : 50,
        },
        [theme.breakpoints.down('xs')]: {
          paddingBottom: 30,
        },
        borderRadius: 0,
        overflowY: 'hidden',
        overflowX: 'hidden',
        backgroundImage:
          'linear-gradient(-44deg, #28A7C5 0, #2AA1C8 27%, #2C96CE 66%, #3C8DD5 100%)',
        backgroundSize: '400% 400%',
        // background: `linear-gradient(${lighten(
        //   theme.palette.secondary.main,
        //   0.0
        // )}, ${lighten(theme.palette.secondary.main, 0.6)})`,
      }
    },
    jumbotronPattern: {
      backgroundImage: `url(https://sitecorecdn.azureedge.net/-/media/sitecoresite/images/global/homepagerefresh/sitecore-pattern-cross-circle-white.svg)`,
      content: '',
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      backgroundRepeat: 'repeat-y',
      backgroundSize: '45%',
      mixBlendMode: 'soft-light',
      opacity: 1,
      width: '100%',
      backgroundPosition: 'right',
    },
    logo: {
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
      opacity: 0.2,
      width: '100%',
      top: 0,
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
      [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(2),
      },
    },
    jumbotronLinkGroup: {
      display: 'flex',
      marginTop: theme.spacing(3),
    },
    jumbotronLinkGroupLink: ({ align }: any) => ({
      '&:first-of-type':
        align === 'center'
          ? {
              justifyContent: 'center',
            }
          : {
              marginRight: theme.spacing(1),
            },
    }),
    jumbotronHeading: {
      padding: 0,
      fontWeight: 700,
      marginTop: '.75rem',
      marginBottom: '0.5rem',
      color: 'white',
      textShadow: '1px 1px 2px rgba(0,0,0,0.25)',
      [theme.breakpoints.down('sm')]: {
        fontSize: '2rem',
        marginTop: '0.25rem',
      },
    },
    jumbotronText: ({ align }) => ({
      color: seafoam[50],
      maxWidth: align === 'center' ? 700 : 900,
      margin: align === 'center' ? '0 auto' : undefined,
      textShadow: '1px 1px 2px rgba(0,0,0,0.25)',
    }),
  })
)

const Jumbotron: FunctionComponent<any> = ({
  image,
  heading,
  text,
  actions,
  height,
  secondary,
  overlayed,
  align,
}: any) => {
  const classes = useStyles({ overlayed, align })
  return (
    <div className={classes.jumbotron} style={{ height }}>
      <div className={classes.jumbotronPattern}></div>
      <Container>
        <Paper className={classes.jumbotronContainer}>
          {image && (
            <img className={classes.logo} src={image.src} alt={image.alt} />
          )}
          {heading && (
            <Typography
              align={align}
              className={classes.jumbotronHeading}
              variant={image ? 'h2' : 'h1'}
              component="h1"
            >
              {heading}
            </Typography>
          )}
          {text && (
            <Typography
              align={align}
              className={classes.jumbotronText}
              variant={image ? 'subtitle1' : 'h5'}
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
    </div>
  )
}

export default Jumbotron
