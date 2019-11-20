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
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import ocLogo from '../../assets/images/four51-logo-nopyramid--full-color.svg'
import { darkgrey, mediumgrey, flame } from '../../theme/ocPalette.constants'
import utility from '../../utility'
import Jumbotron from '../Shared/Jumbotron'
import ListLink from '../Shared/ListLink'
import ButtonLink from '../Shared/ButtonLink'
import ListItemLink from '../Shared/ListItemLink'
import { CustomButton, CustomButtonLink } from '../Shared/ButtonVariants'
import { navHeight } from './Header'

if (typeof window !== 'undefined') {
  // attach smooth scroll to all hrefs
  require('smooth-scroll')('a[href*="#"]')
}

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
      minHeight: '100%',
      height: '100%',
    },
    paperCard: {
      position: 'relative',
      flexFlow: 'column nowrap',
      alignItems: 'center',
      maxWidth: '100vw',
      [theme.breakpoints.up('md')]: {
        minHeight: '30vh',
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
  const data = useStaticQuery(graphql`
    query {
      allMdx(
        sort: { order: ASC, fields: [frontmatter___priority] }
        filter: { fileAbsolutePath: { glob: "**/content/docs/**/*.mdx" } }
      ) {
        totalCount
        edges {
          node {
            id
            fileAbsolutePath
            frontmatter {
              section
              title
              hidden
            }
          }
        }
      }
    }
  `)
  const sections = utility.getSectionsFromDocsQuery(data)
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
    <div className={classes.root}>
      <Jumbotron
        image={{ src: ocLogo, alt: 'Four51 OrderCloud Logo' }}
        heading="A Next Generation Headless eCommerce Platform"
        actions={[
          <CustomButtonLink
            color="#fff"
            to="/getting-started/intro-to-ordercloud"
            variant="contained"
          >
            Introduction
          </CustomButtonLink>,
          <CustomButtonLink
            to="/getting-started/quick-start-guide"
            variant="contained"
            color={flame[600]}
          >
            Quick Start
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
                {section.guides.filter(c => !c.frontmatter.hidden).length >
                0 ? (
                  <Paper elevation={5}>
                    <Box p={2} zIndex={1}>
                      <div className={classes.paperCard}>
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
                          {section.guides
                            .filter(g => !g.frontmatter.hidden)
                            .map(g => {
                              return (
                                <ListItemLink key={g.id} to={g.path}>
                                  {g.frontmatter.title}
                                </ListItemLink>
                              )
                            })}
                        </List>
                      </div>
                    </Box>
                  </Paper>
                ) : null}
              </Grid>
            ))}
        </Grid>
      </Container>
    </div>
  )
}

export default MainComponent
