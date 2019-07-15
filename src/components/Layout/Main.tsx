import React from 'react'
import { Theme, withStyles, createStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { groupBy as _groupBy, forEach as _forEach } from 'lodash'
import ListLink from '../Shared/ListLink'
import Jumbotron from '../Shared/Jumbotron'
import { StaticQuery, graphql } from 'gatsby'
import utility from '../Shared/utility'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      overflow: 'hidden',
    },
    cardGroup: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
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
          <Grid container spacing={3}>
            {sections.map((section, index) =>
              section.title === 'Getting Started' ? (
                <Grid item xs={12} sm={12} key={index}>
                  <Jumbotron />
                </Grid>
              ) : (
                <Grid
                  className={classes.cardGroup}
                  item
                  xs={12}
                  sm={6}
                  key={index}
                >
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
