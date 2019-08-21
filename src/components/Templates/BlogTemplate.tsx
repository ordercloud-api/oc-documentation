import {
  Container,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core'
import { graphql } from 'gatsby'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import React from 'react'
import { Helmet } from 'react-helmet'
import Layout from '../Layout/Layout'
import DocSearch from '../Shared/DocSearch'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchBox: {
      width: '100%',
      marginTop: theme.spacing(3),
    },
    container: {
      marginBlockStart: '2rem',
      marginBlockEnd: '4rem',
    },
    body: {},
  })
)

interface BlogComponentProps {
  data: {
    mdx: {
      body: string
      frontmatter: {
        title: string
        tags: string
        authors: string
        summary: string
        date: number
      }
    }
  }
}

function BlogComponent(props: BlogComponentProps) {
  const { data } = props
  const classes = useStyles(props)
  return (
    <Layout>
      <Helmet title={`${data.mdx.frontmatter.title} - OrderCloud Blog`} />
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item md={9}>
            <Typography variant="h1">{data.mdx.frontmatter.title}</Typography>
            <MDXRenderer>{data.mdx.body}</MDXRenderer>
          </Grid>
          <Grid item md={3}>
            <DocSearch
              darkMode={false}
              classes={{ searchBox: classes.searchBox }}
            />
            <Typography variant="h5">Related Articles</Typography>
            <Typography variant="h5">Recent Articles</Typography>
            <Typography variant="h5">Social Share</Typography>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogByPath($nodeID: String!) {
    mdx(id: { eq: $nodeID }) {
      body
      frontmatter {
        title
        tags
        authors
        summary
        date
      }
    }
  }
`

export default BlogComponent
