import React from 'react'
import { Helmet } from 'react-helmet'
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
  SvgIcon,
} from '@material-ui/core'

interface SlackCommunityProps {
  classes: any
}

export default function SlackCommunityComoponent(props: SlackCommunityProps) {
  const classes = useStyles(props)
  const [values, setValues] = React.useState({
    email: 'example@example.com',
  })
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }
  return (
    <Layout>
      <Helmet title={`OrderCloud Slack Workspace`} />
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
          <SvgIcon viewBox="0 0 270 270" className={classes.svgIcon}>
            <path
              fill="#e01e5a"
              d="M99.4 151.2c0 7.1-5.8 12.9-12.9 12.9-7.1 0-12.9-5.8-12.9-12.9 0-7.1 5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9v-32.3z"
            />
            <path
              fill="#36c5f0"
              d="M118.8 99.4c-7.1 0-12.9-5.8-12.9-12.9 0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v12.9h-12.9zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H86.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3z"
            />
            <path
              fill="#2eb67d"
              d="M170.6 118.8c0-7.1 5.8-12.9 12.9-12.9 7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9h-12.9v-12.9zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9-7.1 0-12.9-5.8-12.9-12.9V86.5c0-7.1 5.8-12.9 12.9-12.9 7.1 0 12.9 5.8 12.9 12.9v32.3z"
            />
            <path
              fill="#ecb22e"
              d="M151.2 170.6c7.1 0 12.9 5.8 12.9 12.9 0 7.1-5.8 12.9-12.9 12.9-7.1 0-12.9-5.8-12.9-12.9v-12.9h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9 0-7.1 5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9 0 7.1-5.8 12.9-12.9 12.9h-32.3z"
            />
          </SvgIcon>
          <Typography className={classes.h1} variant="h1">
            Join OrderCloud on Slack
          </Typography>
          <Typography color="textSecondary" variant="subtitle1">
            Our community of developers is here to help.
          </Typography>
          <form className={classes.containerForm} noValidate autoComplete="off">
            <TextField
              label="Email"
              className={classes.mr1}
              onChange={handleChange('email')}
            />
            <Button color="primary" variant="contained">
              Get My Invite
            </Button>
          </form>
          <Box display="flex" alignItems="center">
            <Typography
              className={classes.mr1}
              color="textSecondary"
              variant="subtitle2"
            >
              Already a member?
            </Typography>
            <Button
              size="small"
              color="inherit"
              href="https://ordercloudapi.slack.com/"
            >
              Sign In
            </Button>
          </Box>
        </div>
      </Box>
    </Layout>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    svgIcon: {
      fontSize: theme.typography.h1.fontSize,
    },
    h1: {
      color: theme.palette.grey[50],
      marginBottom: theme.spacing(1),
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
      marginBlock: '1rem',
    },
    mr1: {
      marginRight: '1rem',
    },
  })
)
