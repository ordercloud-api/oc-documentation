import React from 'react'
import Layout from '../components/Layout/Layout'
import Particles from 'react-particles-js'
import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Box,
  Button,
  Hidden,
  TextField,
} from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    h1: {
      color: theme.palette.grey[50],
    },
    doop: {
      display: 'flex',
      position: 'relative',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
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
      width: '150vw',
      height: '150vh',
    },
    containerForm: {
      display: 'flex',
      alignItems: 'center',
      '&:first-child': {
        marginRight: '1rem',
      },
    },
  })
)

interface slackCommunityProps {}

export default function slackCommunity(props: slackCommunityProps) {
  const classes = useStyles(props)
  const [values, setValues] = React.useState({
    email: 'example@example.com',
  })
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }
  return (
    <Layout>
      <Box display="flex" flexDirection="column">
        <div className={classes.doop}>
          <Hidden mdDown implementation="js">
            <Particles
              className={classes.jumbotronParticle}
              params={{
                particles: {
                  number: {
                    value: 350,
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
          <Typography className={classes.h1} variant="h1">
            Dude! Join our Slack Channel!
          </Typography>
          <form className={classes.containerForm} noValidate autoComplete="off">
            <TextField
              label="Email"
              className={classes.textField}
              onChange={handleChange('email')}
              variant="filled"
            />
            <Button color="primary" variant="contained">
              Join it
            </Button>
          </form>
        </div>
      </Box>
    </Layout>
  )
}
