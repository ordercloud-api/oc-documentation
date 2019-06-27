import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../components/Layout/Layout';
import RightMenu from '../components/Layout/RightMenu';
import '../styles/doc-template.css';

export default function Template({
  data
}) {
  const { markdownRemark: post } = data
  const gitHubUrl = 'https://github.com/ordercloud-api/oc-documentation/tree/development/src/pages/docs';
  return (
    <Layout>
      <div className="documentation-container" style={{margin: '0 3rem', display: 'flex', 'flex-direction': 'row'}}>
        <Helmet title={`OrderCloud Documentation - ${post.frontmatter.title}`} />
        <div className="documentation-body" style={{ maxWidth: '60%'}}>
          <h1>{post.frontmatter.title}</h1>
          <div
            className="documentation-contents"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
          <a href={`${gitHubUrl}${post.frontmatter.path}.md`} target="_blank">Contribute to this doc</a>
        </div>
        <RightMenu style={{ maxWidth: '40%'}}/>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query DocTemplateByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`