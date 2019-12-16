import React from 'react'
import { Helmet } from 'react-helmet'
import Layout from '../components/Layout/Layout'
import BackgroundImage from '../assets/images/DegreePattern.svg'
import slackMark from '../assets/svg/slack/slack_Mark.svg';
import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  Box,
  Button,
  TextField,
  SvgIcon,
  Paper,
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
      <div className={classes.slackLayout}>
        <Helmet title={`OrderCloud Slack Community`} />
        <Paper elevation={3} className={classes.cardSignIn}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <SvgIcon viewBox="0 0  270 270" className={classes.svgIcon}>
              <path style={{ fill: '#e01e5a' }} d="M99.4 151.2c0 7.1-5.8 12.9-12.9 12.9-7.1 0-12.9-5.8-12.9-12.9 0-7.1 5.8-12.9 12.9-12.9h12.9v12.9zM105.9 151.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9v-32.3z" />
              <path style={{ fill: '#36c5f0' }} d="M118.8 99.4c-7.1 0-12.9-5.8-12.9-12.9 0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v12.9h-12.9zM118.8 105.9c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H86.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3z" />
              <path style={{ fill: '#2eb67d' }} d="M170.6 118.8c0-7.1 5.8-12.9 12.9-12.9 7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9h-12.9v-12.9zM164.1 118.8c0 7.1-5.8 12.9-12.9 12.9-7.1 0-12.9-5.8-12.9-12.9V86.5c0-7.1 5.8-12.9 12.9-12.9 7.1 0 12.9 5.8 12.9 12.9v32.3z" />
              <path style={{ fill: '#ecb22e' }} d="M151.2 170.6c7.1 0 12.9 5.8 12.9 12.9 0 7.1-5.8 12.9-12.9 12.9-7.1 0-12.9-5.8-12.9-12.9v-12.9h12.9zM151.2 164.1c-7.1 0-12.9-5.8-12.9-12.9 0-7.1 5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9 0 7.1-5.8 12.9-12.9 12.9h-32.3z" />
            </SvgIcon>
            <Typography variant="h3" component="h1">
              Join OrderCloud on Slack
          </Typography>
            <Typography variant="caption">
              Our community of developers is here to help.
          </Typography>
            <div className={classes.loadingWrapper}>
              <LoadingIndicator active={isLoading}>
                <form className={classes.containerForm} noValidate autoComplete="off">
                  <TextField
                    value={email}
                    error={Boolean(errorText.length)}
                    helperText={errorText}
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    variant="outlined"
                    type="email"
                    onChange={handleEmailChange}
                    fullWidth
                  />
                  <Button
                    disabled={Boolean(errorText.length)}
                    color="primary"
                    size="large"
                    variant="contained"
                    onClick={handleSubmit}
                  >
                    Join
                </Button>
                  <Box display="flex" alignItems="center">
                    <Typography
                      color="textSecondary"
                      variant="body2"
                      style={{ marginRight: '.5rem' }}
                    >
                      Already a member?
            </Typography>
                    <Button size="small" target="_blank" href="https://ordercloudapi.slack.com/">Sign In</Button>
                  </Box>
                </form>
              </LoadingIndicator>
            </div>
          </Box>
        </Paper>
      </div>
    </Layout>
  )
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    svgIcon: {
      height: theme.spacing(11),
      width: theme.spacing(11),
    },
    slackLayout: {
      display: 'flex',
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
      height: `calc(100vh - ${navHeight}px)`,
      overflow: 'hidden',
      backgroundColor: 'rgba(28, 33, 41, 0.05)',
      backgroundImage: `url(${BackgroundImage})`,
      backgroundSize: 'cover',
      '-webkit-background-size': 'cover',
      '-moz-background-size': 'cover',
      '-o-background-size': 'cover',
      [theme.breakpoints.up('md')]: {
        padding: '6rem 10rem',
      },
    },
    cardSignIn: {
      padding: theme.spacing(4),
    },
    loadingWrapper: {
      width: '100%',
    },
    containerForm: {
      display: 'flex',
      flexFlow: 'column nowrap',
      '& > *': {
        marginTop: theme.spacing(2),
        justifyContent: 'center',
      }
    },
  })
)
