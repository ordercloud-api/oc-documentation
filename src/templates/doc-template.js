import React from "react"
import { Helmet } from "react-helmet"
import Layout from "../components/layout"

// import '../css/blog-post.css'; // make it pretty!

export default function Template({
  data
}) {
  const { markdownRemark: post } = data
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
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query GuideTemplateByPath($path: String!) {
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