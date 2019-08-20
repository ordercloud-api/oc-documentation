import React from 'react'
import {
  Theme,
  createStyles,
  makeStyles,
  Container,
  Grid,
} from '@material-ui/core/'
import { graphql, useStaticQuery, Link } from 'gatsby'
import { Helmet } from 'react-helmet'
import utility from '../utility'
import Layout from '../components/Layout/Layout'
import DocSearch from '../components/Shared/DocSearch'

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
          fileAbsolutePath: string
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
            fileAbsolutePath
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
    <Layout>
      <Container maxWidth="lg">
        <Grid container className={classes.container} spacing={3}>
          <DocSearch darkMode={false} />
          <Helmet title={`OrderCloud Blog`} />
          <div className={classes.body}>
            {data.allMdx.edges.map(edge => {
              return (
                <div key={edge.node.id}>
                  <h3>
                    <Link
                      style={{ boxShadow: `none` }}
                      to={utility.resolvePath(edge.node.fileAbsolutePath)}
                    >
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
    </Layout>
  )
}
