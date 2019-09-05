import { Theme, Typography } from '@material-ui/core'
import { graphql } from 'gatsby'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import React from 'react'
import { Helmet } from 'react-helmet'
import { DocsQuery } from '../../models/docsQuery'
import '../../styles/doc-template.css'
import utility from '../../utility'
import DocFooter from '../Layout/DocFooter'
import DocMenu from '../Layout/DocMenu'
import Layout from '../Layout/Layout'
import LayoutContainer from '../Layout/LayoutContainer'
import LayoutMain from '../Layout/LayoutMain'
import LayoutMenu from '../Layout/LayoutMenu'

interface DocTemplateProps {
  data: DocsQuery
  location: any
  theme: Theme
}

class Template extends React.Component<DocTemplateProps> {
  public render() {
    const gitHubUrl =
      'https://github.com/ordercloud-api/oc-documentation/tree/development/content/docs'
    const { data: post, location, theme } = this.props
    const sections = utility.getSectionsFromDocsQuery(post)
    return (
      <Layout location={location}>
        <Helmet
          title={`${post.mdx.frontmatter.title} - OrderCloud Documentation`}
        />
        <LayoutContainer>
          <LayoutMain>
            <Typography variant="h1">{post.mdx.frontmatter.title}</Typography>
            <MDXRenderer>{post.mdx.body}</MDXRenderer>
            <DocFooter
              contents={sections}
              currentGuide={utility.resolvePath(post.mdx.fileAbsolutePath)}
            />
          </LayoutMain>
          <LayoutMenu>
            <DocMenu sections={sections} currentPath={location.pathname} />
          </LayoutMenu>
        </LayoutContainer>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query DocTemplateByPath($nodeID: String!) {
    mdx(id: { eq: $nodeID }) {
      body
      fileAbsolutePath
      frontmatter {
        title
      }
    }
    allMdx(
      sort: { order: ASC, fields: [frontmatter___priority] }
      filter: { fileAbsolutePath: { glob: "**/content/docs/**/*.mdx" } }
    ) {
      totalCount
      edges {
        node {
          id
          fileAbsolutePath
          headings {
            value
            depth
          }
          frontmatter {
            section
            title
          }
        }
      }
    }
  }
`

export default Template
