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

interface PageData {
  allMdx: {
    totalCount: number
    edges: [
      {
        node: {
          id: string
          frontmatter: {
            title: string
            date: string
            tags: string
            authors: string
            summary: string
          }
        }
      }
    ]
  }
}

interface BlogListProps {}

export default function BlogListComponent(props: BlogListProps) {
  const classes = useStyles(props)
  const data: PageData = useStaticQuery(graphql`
    query {
      allMdx(
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: { fileAbsolutePath: { glob: "**/content/blog/**/*.mdx" } }
      ) {
        totalCount
        edges {
          node {
            id
            frontmatter {
              title
              date(formatString: "dddd MMMM Do, YYYY")
              tags
              authors
              summary
            }
          }
        }
      }
    }
  `)
  return (
    <Container maxWidth="lg">
      <Grid container className={classes.container} spacing={3}>
        <Helmet title={`OrderCloud Blog`} />
        <div className={classes.body}>
          {data.allMdx.edges.map(edge => {
            return (
              <div key={edge.node.id}>
                <h3>
                  {/* TODO: fix this */}
                  <Link style={{ boxShadow: `none` }} to="/">
                    {edge.node.frontmatter.title}
                  </Link>
                </h3>
                <small>{edge.node.frontmatter.date}</small>
                <p
                  dangerouslySetInnerHTML={{
                    __html: edge.node.frontmatter.summary,
                  }}
                />
              </div>
            )
          })}
        </div>
      </Grid>
    </Container>
  )
}
