import {
  createStyles,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core'
import React from 'react'
import { Helmet } from 'react-helmet'
import BackgroundImage from '../assets/images/DegreePattern.svg'
import { navHeight } from '../components/Layout/Header'
import Layout from '../components/Layout/Layout'

interface SlackCommunityProps {
  classes: any
}

export default function SlackCommunityComoponent(props: SlackCommunityProps) {
  const classes = useStyles(props)
  return (
    <Layout>
      <Helmet title={`Join Sitecore Chat`}>
        <link
          rel="icon"
          type="image/png"
          href="/images/favicon.ico"
          sizes="16x16"
        />
      </Helmet>
      <div className={classes.slackLayout}>
        <Paper elevation={3} className={classes.cardSignIn}>
          <Typography variant="h3" component="h1">
            Join Sitecore Chat
          </Typography>
          <Typography variant="body1" paragraph>
            The OrderCloud Slack community has been migrated to Sitecore Chat
          </Typography>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://docs.google.com/forms/d/e/1FAIpQLScsJX9PC3m8u-labRn_BNnByR0aiAxPYowN-doed6_t45aPhg/viewform"
          >
            Sign Up Here
          </a>
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
    },
    cardSignIn: {
      padding: theme.spacing(3, 4, 5),
      textAlign: 'center',
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
      },
    },
  })
)
