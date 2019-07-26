import React, { Fragment } from 'react'
import {
  Theme,
  withStyles,
  createStyles,
  Paper,
  Grid,
  Typography,
  Container,
  List,
  Box,
} from '@material-ui/core/'
import { groupBy as _groupBy, forEach as _forEach } from 'lodash'
import ListLink from '../Shared/ListLink'
import Jumbotron from '../Shared/Jumbotron'
import { StaticQuery, graphql } from 'gatsby'
import utility from '../Shared/utility'
import { mediumgrey, darkgrey } from '../../theme/ocPalette.constants'
import { navigate } from '../Shared/PortalLink'

if (typeof window !== 'undefined') {
  // attach smooth scroll to all hrefs
  require('smooth-scroll')('a[href*="#"]')
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      // overflowX: 'hidden',
      // overflowY: 'auto',
      [theme.breakpoints.up('md')]: {
        marginLeft: theme.spacing(9),
      },
      // flexGrow: 1,
      // flex: '1 1 auto',
      // height: '100vh',
      backgroundColor: mediumgrey[50],
    },
    // cardContainer: {
    //   display: 'flex',
    //   flex: '1 1 auto',
    // },
    paperRoot: {
      zIndex: 1,
    },
    paperCard: {
      position: 'relative',
      minHeight: '35vh',
      flexFlow: 'column nowrap',
      alignItems: 'center',
      maxWidth: '100vw',
    },
    paperTitleHeading: {
      color: darkgrey[900],
      paddingLeft: theme.spacing(2),
      textAlign: 'left',
    },
    paperTitleSubeading: {
      color: mediumgrey[300],
      paddingLeft: theme.spacing(2),
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
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      '@media (max-width:768px)': {
        gridTemplateColumns: '1fr',
      },
    },
  })

const Main = withStyles(styles)(
  class extends React.Component<any> {
    public render() {
      const { tableOfContents, classes } = this.props
      const sections = utility.getSectionsFromQuery(tableOfContents)

      return (
        <div className={classes.root}>
          <Jumbotron />
          <Container maxWidth="xl">
            <Box marginTop={-15}>
              <Grid container spacing={5} className={classes.cardContainer}>
                {sections.map((section, index) =>
                  section.title === 'Getting Started' ? (
                    <Grid item xs={12} sm={12} key={index}></Grid>
                  ) : (
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={6}
                      lg={4}
                      key={index}
                      className={classes.paperRoot}
                    >
                      {section.guides.filter(c => !c.frontmatter.hidden)
                        .length > 0 ? (
                        <Paper elevation={2}>
                          <Box p={2} zIndex={1}>
                            <div className={classes.paperCard}>
                              <Typography
                                className={classes.paperTitleHeading}
                                variant="h5"
                                component="h2"
                              >
                                {section.title}
                              </Typography>
                              {/* TODO: ALEXA CAN YOU MAKE THIS??? <Typography>{section.subtitle}</Typography> */}
                              <Typography
                                className={classes.paperTitleSubeading}
                                variant="body2"
                              >
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Duis vel libero sed arcu
                                convallis tempus.
                              </Typography>
                              <List
                                disablePadding={true}
                                dense={true}
                                className={classes.paperList}
                              >
                                {section.guides
                                  .filter(c => !c.frontmatter.hidden)
                                  .map(s => {
                                    return (
                                      <ListLink
                                        key={s.id}
                                        guideProps={{
                                          path: s.frontmatter.path,
                                          title: s.frontmatter.title,
                                        }}
                                      />
                                    )
                                  })}
                              </List>
                            </div>
                          </Box>
                        </Paper>
                      ) : null}
                    </Grid>
                  )
                )}
              </Grid>
            </Box>
          </Container>
        </div>
      )
    }
  }
)

export default () => (
  <StaticQuery
    query={graphql`
      query {
        allMdx(sort: { order: ASC, fields: [frontmatter___priority] }) {
          totalCount
          edges {
            node {
              id
              frontmatter {
                section
                title
                path
                hidden
              }
            }
          }
        }
      }
    `}
    render={data => <Main tableOfContents={data} />}
  />
)
