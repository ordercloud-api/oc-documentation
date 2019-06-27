import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../components/Layout/Layout';

export default function Template({
  data
}) {
  const { markdownRemark: post } = data
  const gitHubUrl = 'https://github.com/ordercloud-api/oc-documentation/tree/development/src/pages/docs';
  return (
    <Layout>
      <div className="documentation-container">
        <Helmet title={`OrderCloud Documentation - ${post.frontmatter.title}`} />
        <div className="documentation-body">
          <h1>{post.frontmatter.title}</h1>
          <div
            className="documentation-contents"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
          <a href={`${gitHubUrl}${post.frontmatter.path}.md`} target="_blank">Contribute to this doc</a>
        </div>
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