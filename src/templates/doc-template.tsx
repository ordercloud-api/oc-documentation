import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../components/Layout/Layout';
import RightMenu from '../components/Layout/RightMenu';
import '../styles/doc-template.css';
import { graphql } from 'gatsby';
import  DocFooter  from '../components/Layout/DocFooter';
import { groupBy as _groupBy, forEach as _forEach, flatten as _flatten } from 'lodash';
import { withStyles, createStyles, Theme } from '@material-ui/core';

const styles = (theme: Theme) => 
  createStyles({
    docContainer: {
      margin: '0 3rem',
      display: 'flex',
      flexDirection: 'row'
    },
    docBody: {
      maxWidth: '70%'
    },
    docMenu: {
      maxWidth: '30%'
    }
  })

const Template = withStyles(styles)(
  class extends React.Component<any> {
    public render() {
      const { data: post, classes } = this.props;
      // THIS SNIPPET IS REUSED IN Main.js CONSIDER MOVING TO A SERVICE
      const sectionsWithGuides = _groupBy(post.allMdx.edges, 'node.frontmatter.section');
      let contentsArray = [];
      _forEach(sectionsWithGuides, (section, title) => contentsArray = [...contentsArray, {title: title, sections: section.map((s) => s.node)}]);

      return (
        <Layout>
          <div className={classes.docContainer}>
            <Helmet title={`OrderCloud Documentation - ${post.mdx.frontmatter.title}`} />
            <div className={classes.docBody}>
              <h1>{post.mdx.frontmatter.title}</h1>
              <div dangerouslySetInnerHTML={{ __html: post.mdx.html }}
              />
              <DocFooter contents={contentsArray} currentGuide={post.mdx.frontmatter.path} />
            </div>
            <div className={classes.docMenu}>
              <RightMenu tableOfContents={contentsArray} />
            </div>
          </div>
        </Layout>
      )
    }
  }
)

export const pageQuery = graphql`
  query DocTemplateByPath($path: String!) {
    mdx(
      frontmatter: { path: { eq: $path } }
    ) {
      html
      frontmatter {
        path
        title
      }
    }
    allMdx(
      sort: { order: ASC, fields: [frontmatter___priority] }
    ) {
      totalCount
      edges {
        node {
          id
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

export default Template;