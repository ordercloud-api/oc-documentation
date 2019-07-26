import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../Layout/Layout';
import RightMenu from '../Layout/RightMenu';
import '../../styles/doc-template.css';
import { graphql } from 'gatsby';
import DocFooter from '../Layout/DocFooter';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';
import {
  groupBy as _groupBy,
  forEach as _forEach,
  flatten as _flatten,
} from 'lodash';
import {
  withStyles,
  createStyles,
  Theme,
  Typography,
  Grid,
  Container,
} from '@material-ui/core';
import utility from '../Shared/utility';

const styles = (theme: Theme) =>
  createStyles({
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
          <Container maxWidth="lg">
            <Grid container className={classes.docContainer} spacing={3}>
              <Grid item xs={9}>
                <Helmet
                  title={`OrderCloud Documentation - ${post.mdx.frontmatter.title}`}
                />
                <div className={classes.docBody}>
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
              </Grid>
              <Grid item className={classes.docMenu} xs={3}>
                <RightMenu
                  sections={sections}
                  currentPath={location.pathname}
                />
              </Grid>
            </Grid>
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
