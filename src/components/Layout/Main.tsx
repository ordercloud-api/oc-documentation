import React, { Fragment } from "react"
import Particles from "react-particles-js"
import { Theme, withStyles, createStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"
import { groupBy as _groupBy, forEach as _forEach } from "lodash"

import ListLink from "../Shared/ListLink"
import { StaticQuery, graphql } from "gatsby"
import { Typography, Button } from "@material-ui/core"

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    jumbotron: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "50vh",
      backgroundColor: "transparent",
      color: "white",
      borderRadius: 0,
      position: "relative",
    },
    jumbotronParticle: {
      position: "absolute",
      backgroundColor: theme.palette.primary.main,
      backgroundImage: `linear-gradient(62deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.light} 100%)`,
      width: "100vw",
      height: "50vh",
    },
    jumbotronHeading: {
      zIndex: 1,
    },
    btnGroup: {
      display: "flex",
      maxWidth: "75vw",
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
      const sectionsWithGuides = _groupBy(
        tableOfContents.allMarkdownRemark.edges,
        "node.frontmatter.section"
      )
      let contentsArray = []
      _forEach(
        sectionsWithGuides,
        (section, title) =>
          (contentsArray = [
            ...contentsArray,
            { title: title, sections: section.map(s => s.node) },
          ])
      )
      return (
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
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
                        mode: "repulse",
                      },
                    },
                  },
                }}
              />
              <Paper className={classes.jumbotron}>
                <Typography
                  className={classes.jumbotronHeading}
                  variant="h2"
                  component="h1"
                >
                  OrderCloud Documentation
                </Typography>
                <div className={classes.btnGroup}>
                  <Button className={classes.mr3} color="inherit">
                    Getting Started With Ordercloud
                  </Button>
                  <Button color="inherit">What Is Ordercloud?</Button>
                </div>
              </Paper>
            </Grid>
            {contentsArray.map((section, index) => {
              return (
                <Grid
                  item
                  xs={12}
                  sm={section.title != "Getting Started" ? 6 : 12}
                  key={index}
                >
                  {/** only display sections that have more than one visible guide */}
                  {section.sections.filter(c => !c.frontmatter.hidden).length >
                  0 ? (
                    <Paper className={classes.paper}>
                      <Typography variant="h4">
                        {section.title === "Getting Started"
                          ? "Welcome to OrderCloud"
                          : section.title}
                      </Typography>
                      <ul>
                        {section.sections
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
            })}
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
        allMarkdownRemark(
          sort: { order: ASC, fields: [frontmatter___priority] }
        ) {
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
