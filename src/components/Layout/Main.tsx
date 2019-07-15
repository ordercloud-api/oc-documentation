import React, { Fragment } from 'react'
import { Theme, withStyles, createStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { groupBy as _groupBy, forEach as _forEach } from 'lodash'
import ListLink from '../Shared/ListLink'
import Jumbotron from '../Shared/Jumbotron'
import { StaticQuery, graphql } from 'gatsby'
import utility from '../Shared/utility'
import { Typography, Container, List } from '@material-ui/core'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      overflow: 'hidden',
    },
    cardContainer: {
      display: 'flex',
      flex: '1 1 auto',
      'paperTitle:nth-of-type(1)': {
        backgroundImage:
          'url(https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80)',
      },
      'paperTitle:nth-of-type(2)': {
        backgroundImage:
          'url(https://images.unsplash.com/photo-1559762691-617a33825bc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80)',
      },
      'paperTitle:nth-of-type(3)': {
        backgroundImage:
          'url(https://images.unsplash.com/photo-1560131323-29d50e8d1b22?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2167&q=80)',
      },
    },
    paperCard: {
      position: 'relative',
      minHeight: '50vh',
      display: 'flex',
      flexFlow: 'column nowrap',
      alignItems: 'center',
    },
    paperTitle: {
      width: '100%',
      backgroundColor: theme.palette.primary.dark,
      backgroundSize: 'cover',
      minHeight: '15vh',
      display: 'flex',
      paddingLeft: theme.spacing(2),
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
    },
    paperBody: {
      position: 'absolute',
      top: '12vh',
      margin: '0 auto',
      width: '85%',
      padding: theme.spacing(2),
      color: 'white',
      minHeight: 'min-content',
      zIndex: 1,
    },
    paperList: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
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
    my3: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
    mx3: {
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3),
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
            <Grid container spacing={5} className={classes.cardContainer}>
              {sections.map((section, index) =>
                section.title === 'Getting Started' ? (
                  <Grid item xs={12} sm={12} key={index}></Grid>
                ) : (
                  <Grid item xs={12} sm={6} key={index}>
                    {section.guides.filter(c => !c.frontmatter.hidden).length >
                    0 ? (
                      <div className={classes.paperCard}>
                        <Paper className={classes.paperTitle}>
                          <Typography variant="h4" component="h2">
                            {section.title}
                          </Typography>
                        </Paper>
                        <Paper className={classes.paperBody}>
                          <List className={classes.paperList} component="nav">
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
                        </Paper>
                      </div>
                    ) : null}
                  </Grid>
                )
              )}
            </Grid>
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
