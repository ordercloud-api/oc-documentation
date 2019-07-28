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
import utility from '../utility'
import Layout from '../components/Layout/Layout'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {},
    title: {},
    container: {},
    body: {},
  })
)

interface PageData {
  allMdx: {
    totalCount: number
    edges: [
      {
        node: {
          fileAbsolutePath: string
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

interface ReleaseNotesListProps {}

export default function ReleaseNotesListComponent(
  props: ReleaseNotesListProps
) {
  const classes = useStyles(props)
  const data: PageData = useStaticQuery(graphql`
    query {
      allMdx(
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: {
          fileAbsolutePath: { glob: "**/content/release-notes/**/*.mdx" }
        }
      ) {
        edges {
          node {
            id
            fileAbsolutePath
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
    <Layout>
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
                      to={utility.resolvePath(edge.node.fileAbsolutePath)}
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
    </Layout>
  )
}
