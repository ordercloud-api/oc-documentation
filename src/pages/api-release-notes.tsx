import React from 'react'
import {
  Theme,
  createStyles,
  makeStyles,
  List,
  ListItem,
  ListItemText,
  Container,
  Grid,
} from '@material-ui/core/'
import { graphql, useStaticQuery, Link } from 'gatsby'
import { Helmet } from 'react-helmet'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {},
    title: {},
    container: {},
    body: {},
  })
)

interface IndexPageData {
  allMdx: {
    totalCount: number
    edges: [
      {
        node: {
          id: string
          frontmatter: {
            apiVersion: string
            date: string
          }
        }
      }
    ]
  }
}

interface IndexPageProps {}

export default function IndexPageComponent(props: IndexPageProps) {
  const classes = useStyles(props)
  const data: IndexPageData = useStaticQuery(graphql`
    query {
      allMdx(
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: {
          fileAbsolutePath: { glob: "**/src/pages/release-notes/**/*.mdx" }
        }
      ) {
        edges {
          node {
            id
            frontmatter {
              apiVersion
              date(formatString: "dddd MMMM Do, YYYY")
            }
          }
        }
      }
    }
  `)
  return (
    <Container maxWidth="lg">
      <Grid container className={classes.container} spacing={3}>
        <Grid item xs={9}>
          <Helmet title={`OrderCloud Release Notes`} />
          <div className={classes.body}>
            <List component="nav">
              {data.allMdx.edges.map(edge => {
                const frontmatter = edge.node.frontmatter
                return (
                  <ListItem
                    component={Link}
                    to={`api-release-notes/v${frontmatter.apiVersion}`}
                  >
                    <ListItemText
                      primary={`API v${frontmatter.apiVersion} released on ${frontmatter.date}`}
                    />
                  </ListItem>
                )
              })}
            </List>
          </div>
        </Grid>
      </Grid>
    </Container>
  )
}
