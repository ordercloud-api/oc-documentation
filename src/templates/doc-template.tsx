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
import {
  withStyles,
  createStyles,
  Theme,
  Typography,
  Grid,
  Container,
} from '@material-ui/core'
import utility from '../components/Shared/utility'

const drawerWidth = 240

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginRight: drawerWidth,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    docContainer: {
      display: 'flex',
    },
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
    docContainer: {
      marginBlockStart: '2rem',
      marginBlockEnd: '4rem',
    },
  })

const Template = withStyles(styles)(
  class extends React.Component<any> {
    public render() {
      const { data: post, classes, location } = this.props
      const sections = utility.getSectionsFromQuery(post)
      return (
        <Layout>
          <Container className={classes.docContainer} maxWidth="lg">
            <div className={classes.docBody}>
              <Helmet
                title={`OrderCloud Documentation - ${post.mdx.frontmatter.title}`}
              />
              <Typography variant="h2" component="h1">
                {post.mdx.frontmatter.title}
              </Typography>
              <Typography>
                <MDXRenderer>{post.mdx.body}</MDXRenderer>
              </Typography>
              <DocFooter
                contents={sections}
                currentGuide={post.mdx.frontmatter.path}
              />
            </div>
            <RightMenu sections={sections} currentPath={location.pathname} />
          </Container>
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
