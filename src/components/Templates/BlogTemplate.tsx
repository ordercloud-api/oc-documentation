import { Typography } from '@material-ui/core'
import { graphql } from 'gatsby'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import React from 'react'
import { Helmet } from 'react-helmet'
import Layout from '../Layout/Layout'
import LayoutContainer from '../Layout/LayoutContainer'
import LayoutMain from '../Layout/LayoutMain'
import LayoutMenu from '../Layout/LayoutMenu'

interface BlogComponentProps {
  location: any
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
  const { data, location } = props
  return (
    <Layout location={location}>
      <Helmet
        title={`OrderCloud Blog | ${data.mdx.frontmatter.title}`}
        meta={[
          {
            name: 'description',
            content: data.mdx.frontmatter.summary,
          },
        ]}
      />
      <LayoutContainer>
        <LayoutMain>
          <Typography variant="h1">{data.mdx.frontmatter.title}</Typography>
          <MDXRenderer>{data.mdx.body}</MDXRenderer>
        </LayoutMain>
        <LayoutMenu>
          <Typography variant="h5">Related Articles</Typography>
          <Typography variant="h5">Recent Articles</Typography>
          <Typography variant="h5">Social Share</Typography>
        </LayoutMenu>
      </LayoutContainer>
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
