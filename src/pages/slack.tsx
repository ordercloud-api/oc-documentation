import React from 'react'
import { Helmet } from 'react-helmet'
import Layout from '../components/Layout/Layout'
import BackgroundImage from '../assets/images/DegreePattern.svg'
import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Box,
  Button,
  TextField,
  SvgIcon,
} from '@material-ui/core'
import { navHeight } from '../components/Layout/Header'
import DevcenterMiddleware from '../services/devcenterMiddleware.service'
import { Alert } from '../components/Shared/Alert'
import { isEmail } from 'validator'
import LoadingIndicator from '../components/Shared/LoadingIndicator'

interface SlackCommunityProps {
  classes: any
}

export default function SlackCommunityComoponent(props: SlackCommunityProps) {
  const classes = useStyles(props)
  const [email, setEmail] = React.useState('')
  const [errorText, setErrorText] = React.useState('')
  const [isLoading, setIsloading] = React.useState(false)

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value
    const errorText = isEmail(email) ? '' : 'Please set a valid email'
    setErrorText(errorText)
    setEmail(email)
  }

  const handleSubmit = async () => {
    setIsloading(true)
    try {
      await DevcenterMiddleware.Post('/api/slack/signup', {
        Email: email,
      })
      Alert.success('Please check your email for an invite')
      setEmail('')
    } catch (e) {
      if (e && e.status === 409) {
        Alert.warn('An email has already been sent, please check your inbox')
        setEmail('')
      } else {
        Alert.error(
          'Whoops, an error occurred. Please make sure your email address is valid'
        )
      }
    } finally {
      setIsloading(false)
    }
  }

  return (
    <Layout>
      <div className={classes.doop}>
        <Helmet title={`OrderCloud Slack Community`} />
        <Box display="flex" flexDirection="column" alignItems="center">
          <SvgIcon viewBox="0 0 200 200" className={classes.svgIcon}>
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
          <Typography variant="subtitle1">
            Our community of developers is here to help.
          </Typography>

          <form className={classes.containerForm} noValidate autoComplete="off">
            <LoadingIndicator active={isLoading}>
              <Box display="flex" flex="1" marginBottom={1}>
                <TextField
                  value={email}
                  error={Boolean(errorText.length)}
                  helperText={errorText}
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Email Address"
                  variant="outlined"
                  className={classes.mr1}
                  type="email"
                  onChange={handleEmailChange}
                  fullWidth
                />
                <Button
                  disabled={Boolean(errorText.length)}
                  color="primary"
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Join
                </Button>
              </Box>
            </LoadingIndicator>
          </form>

          <Box display="flex" alignItems="center">
            <Typography
              className={classes.mr1}
              color="textSecondary"
              variant="subtitle2"
            >
              Already a member?
            </Typography>
            <a href="https://ordercloudapi.slack.com/">Sign In</a>
          </Box>
        </Box>
      </div>
    </Layout>
  )
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    h1: {
      marginBottom: theme.spacing(2),
    },
    svgIcon: {
      fontSize: '8rem',
    },
    doop: {
      display: 'flex',
      position: 'relative',
      alignItems: 'flex-start',
      justifyContent: 'center',
      height: `calc(100vh - ${navHeight}px)`,
      borderRadius: 0,
      overflowY: 'hidden',
      overflowX: 'hidden',
      backgroundColor: 'rgba(28, 33, 41, 0.05)',
      backgroundImage: `url(${BackgroundImage})`,
      backgroundSize: 'cover',
      '-webkit-background-size': 'cover',
      '-moz-background-size': 'cover',
      '-o-background-size': 'cover',
      padding: '2rem 2rem',
      [theme.breakpoints.up('md')]: {
        padding: '6rem 10rem',
      },
    },
    containerForm: {
      display: 'flex',
      alignItems: 'center',
      marginBlock: '1rem',
      marginTop: theme.spacing(10),
    },
    mr1: {
      marginRight: '1rem',
    },
    slackIllustration: {
      width: '45rem',
    },
  })
)
