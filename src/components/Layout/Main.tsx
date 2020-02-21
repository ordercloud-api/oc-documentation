import {
  Box,
  Container,
  createStyles,
  Grid,
  List,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core/'
import React from 'react'
import ocLogo from '../../assets/images/four51-logo-nopyramid--full-color.svg'
import { darkgrey, mediumgrey, flame } from '../../theme/ocPalette.constants'
import Jumbotron from '../Shared/Jumbotron'
import ListItemLink from '../Shared/ListItemLink'
import { CustomButtonLink } from '../Shared/ButtonVariants'
import { navHeight } from './Header'
import { useDocsSections } from '../../hooks/useDocsSections'

if (typeof window !== 'undefined') {
  // attach smooth scroll to all hrefs
  // we ignore lint rule because we want to dynamically resolve smooth-scroll in browser env only
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('smooth-scroll')('a[href*="#"]')
}
import './../../../custom.d.ts' // custom type definitions

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchBox: {
      position: 'absolute',
      right: theme.spacing(4),
      top: theme.spacing(3),
    },
    root: {
      minHeight: `calc(100vh - ${navHeight}px)`,
      [theme.breakpoints.up('md')]: {
        minHeight: `calc(100vh - ${navHeight}px)`,
      },
    },
    paperRoot: {
      zIndex: 1,
      flexGrow: 1,
    },
    paperCard: {
      position: 'relative',
      flexFlow: 'column nowrap',
      alignItems: 'center',
      maxWidth: '100vw',
      padding: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        height: '100%',
      },
    },
    paperTitleHeading: {
      padding: theme.spacing(1, 0, 0, 2),
      color: darkgrey[900],
      textAlign: 'left',
    },
    paperTitleSubheading: {
      color: mediumgrey[300],
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    paperBody: {
      position: 'absolute',
      top: '12vh',
      left: '20vh',
      margin: '0 auto',
      width: '75%',
      padding: 0,
      minHeight: 'min-content',
      zIndex: 1,
      '@media (max-width:992px)': {
        left: '10vh',
      },
    },
    paperList: {
      [theme.breakpoints.up('md')]: {
        columns: 2,
      },
    },
    cardWrapper: {
      overflowX: 'hidden',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        margin: '0',
      },
      [theme.breakpoints.up('sm')]: {
        marginTop: '-7rem',
      },
      [theme.breakpoints.up('md')]: {
        marginTop: '-5rem',
      },
    },
  })
)

const MainComponent: React.FunctionComponent = props => {
  const classes = useStyles(props)
  const sections = useDocsSections()
  const getSectionSubtitle = title => {
    switch (title) {
      case 'Getting Started':
        // self-explanatory
        return ``
      case 'Main Concepts':
        return `Establish a firm foundation by learning fundamental OrderCloud concepts`
      case 'Features':
        return `Explore some of our API features that can help you solve complex B2B scenarios`
      case 'Guides':
        return `Walkthrough some common scenarios you'll encounter in the OrderCloud API`
      default:
        return ''
    }
  }

  return (
    <React.Fragment>
      <Jumbotron
        image={{ src: ocLogo, alt: 'Four51 OrderCloud Logo' }}
        heading="A Next-Generation Headless eCommerce Platform"
        actions={[
          <CustomButtonLink
            color="#fff"
            key="intro-to-ordercloud"
            to="/getting-started/intro-to-ordercloud"
            variant="contained"
          >
            Introduction
          </CustomButtonLink>,
          <CustomButtonLink
            key="main-concepts"
            to="/main-concepts/organization-hierarchy"
            variant="contained"
            color={flame[600]}
          >
            Main Concepts
          </CustomButtonLink>,
        ]}
      />
      <Container>
        <Grid container className={classes.cardWrapper} spacing={3}>
          {sections
            .filter(section => section.title !== 'Getting Started')
            .map((section, index) => (
              <Grid
                item
                sm={12}
                md={6}
                lg={4}
                key={index}
                className={classes.paperRoot}
              >
                <Paper elevation={5} className={classes.paperCard}>
                  <Typography
                    className={classes.paperTitleHeading}
                    variant="h3"
                  >
                    {section.title}
                  </Typography>
                  <Typography
                    className={classes.paperTitleSubheading}
                    variant="subtitle1"
                  >
                    {getSectionSubtitle(section.title)}
                  </Typography>
                  <List
                    disablePadding={true}
                    dense={true}
                    className={classes.paperList}
                  >
                    {section.guides.map(g => {
                      return (
                        <ListItemLink key={g.id} to={g.path}>
                          {g.frontmatter.title}
                        </ListItemLink>
                      )
                    })}
                  </List>
                </Paper>
              </Grid>
            ))}
        </Grid>
      </Container>
      <Container maxWidth="md">
        <Box paddingTop={7} paddingBottom={14}>
          <Typography variant="h3">
            Four51 OrderCloud™ is an API-first, headless eCommerce platform
            offering nearly limitless customizations and endless freedom for
            growth.
          </Typography>
          <Typography paragraph>
            Your eCommerce data and infrastructure are available in the cloud as
            building blocks via our RESTful API. Create best-of-breed commerce
            applications that easily integrate with your back-end systems and
            3rd party microservices. With OrderCloud, accelerate your commerce
            transformation, increase your agility, and scale limitlessly.
          </Typography>
          <Typography>
            OrderCloud powers custom eCommerce (B2B, B2C, B2X), order
            management, and B2B marketplace applications for some of the world’s
            most well-known brands - processing over 25 million transactions and
            over $5 billion in revenue annually.
          </Typography>
        </Box>
      </Container>
    </React.Fragment>
  )
}

export default MainComponent
