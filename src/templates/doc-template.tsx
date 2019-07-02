import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../components/Layout/Layout';
import RightMenu from '../components/Layout/RightMenu';
import '../styles/doc-template.css';
import { graphql } from 'gatsby';
import  DocFooter  from '../components/Layout/DocFooter';
import { groupBy as _groupBy, forEach as _forEach, flatten as _flatten } from 'lodash';


const Template = ({ data }) => {
  const { markdownRemark: post } = data;
  // THIS SNIPPET IS REUSED IN Main.js CONSIDER MOVING TO A SERVICE
  const sectionsWithGuides = _groupBy(data.allMarkdownRemark.edges, 'node.frontmatter.section');
  let contentsArray = [];
  _forEach(sectionsWithGuides, (section, title) => contentsArray = [...contentsArray, {title: title, sections: section.map((s) => s.node)}]);

  return (
    <Layout>
      <div className="documentation-container" style={{margin: '0 3rem', display: 'flex', flexDirection: 'row'}}>
        <Helmet title={`OrderCloud Documentation - ${post.frontmatter.title}`} />
        <div className="documentation-body" style={{ maxWidth: '70%'}}>
          <h1>{post.frontmatter.title}</h1>
          <div
            className="documentation-contents"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
          <DocFooter contents={contentsArray} currentGuide={post.frontmatter.path} />
        </div>
        <div style={{ maxWidth: '30%'}}>
          <RightMenu tableOfContents={contentsArray} />
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query DocTemplateByPath($path: String!) {
    markdownRemark(
      frontmatter: { path: { eq: $path } }
    ) {
      html
      frontmatter {
        path
        title
      }
    }
    allMarkdownRemark(
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