import React from 'react'
import { Helmet } from 'react-helmet'
import Layout from '../components/Layout/Layout'
import RightMenu from '../components/Layout/RightMenu'
import '../styles/doc-template.css'
import { graphql } from 'gatsby'
import DocFooter from '../components/Layout/DocFooter'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import {
  groupBy as _groupBy,
  forEach as _forEach,
  flatten as _flatten,
} from 'lodash'
import { withStyles, createStyles, Theme } from '@material-ui/core'
import utility from '../components/Shared/utility'

const styles = (theme: Theme) =>
  createStyles({
    docContainer: {
      margin: '0 3rem',
      display: 'flex',
      flexDirection: 'row',
    },
    docBody: {
      maxWidth: '70%',
    },
    docMenu: {
      maxWidth: '30%',
    },
  })

const Template = withStyles(styles)(
  class extends React.Component<any> {
    public render() {
      const { data: post, classes, location } = this.props
      const sections = utility.getSectionsFromQuery(post)
      return (
        <Layout>
          <div className={classes.docContainer}>
            <Helmet
              title={`OrderCloud Documentation - ${post.mdx.frontmatter.title}`}
            />
            <div className={classes.docBody}>
              <h1>{post.mdx.frontmatter.title}</h1>
              <MDXRenderer>{post.mdx.body}</MDXRenderer>
              <DocFooter
                contents={sections}
                currentGuide={post.mdx.frontmatter.path}
              />
            </div>
            <div className={classes.docMenu}>
              <RightMenu sections={sections} currentPath={location.pathname} />
            </div>
          </div>
        </Layout>
      )
    }
  }
)

export const pageQuery = graphql`
  query DocTemplateByPath($path: String!) {
    mdx(frontmatter: { path: { eq: $path } }) {
      body
      frontmatter {
        path
        title
      }
    }
    allMdx(sort: { order: ASC, fields: [frontmatter___priority] }) {
      totalCount
      edges {
        node {
          id
          headings {
            value
          }
          frontmatter {
            section
            title
            path
          }
        }
      }
    }
  }
`

export default Template
