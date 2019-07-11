import React from 'react'
import { Theme, withStyles, createStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { groupBy as _groupBy, forEach as _forEach } from 'lodash'
import Particles from 'react-particles-js'
import ListLink from '../Shared/ListLink'
import { StaticQuery, graphql } from 'gatsby'
import utility from '../Shared/utility'
import { Typography } from '@material-ui/core'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    jumbotron: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '50vh',
      backgroundColor: 'transparent',
      color: 'white',
      borderRadius: 0,
      position: 'relative',
    },
    jumbotronParticle: {
      position: 'absolute',
      backgroundColor: theme.palette.primary.main,
      backgroundImage: `linear-gradient(62deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.light} 100%)`,
      width: '100vw',
      height: '50vh',
    },
    jumbotronHeading: {
      zIndex: 1,
    },
    btnGroup: {
      display: 'flex',
      maxWidth: '75vw',
      marginTop: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
      minHeight: 300,
    },
    //utility classes
    mr3: {
      marginRight: theme.spacing(3),
    },
    ml3: {
      marginLeft: theme.spacing(3),
    },
    mt3: {
      marginTop: theme.spacing(3),
    },
    mb3: {
      marginBottom: theme.spacing(3),
    },
  })

const Main = withStyles(styles)(
  class extends React.Component<any> {
    public render() {
      const { tableOfContents, classes } = this.props
      const sections = utility.getSectionsFromQuery(tableOfContents)

      return (
        <div className={classes.root}>
          <Grid container spacing={3}>
            {sections.map((section, index) =>
              section.title === 'Getting Started' ? (
                <Grid item xs={12} sm={12} key={index}>
                  <Particles
                    className={classes.jumbotronParticle}
                    params={{
                      particles: {
                        number: {
                          value: 150,
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
                  {section.guides.filter(g => !g.frontmatter.hidden).length >
                  0 ? (
                    <Paper className={classes.jumbotron}>
                      <Typography
                        className={classes.jumbotronHeading}
                        variant="h2"
                        component="h1"
                      >
                        OrderCloud Documentation
                      </Typography>
                      <ul>
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
                      </ul>
                    </Paper>
                  ) : null}
                </Grid>
              ) : (
                <Grid item xs={12} sm={6} key={index}>
                  {section.guides.filter(c => !c.frontmatter.hidden).length >
                  0 ? (
                    <Paper className={classes.paper}>
                      <h2>{section.title}</h2>
                      <ul>
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
                      </ul>
                    </Paper>
                  ) : null}
                </Grid>
              )
            )}
          </Grid>
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
