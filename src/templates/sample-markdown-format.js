import React from "react"
import { Helmet } from "react-helmet"
import Layout from "../components/layout"
import { Link } from "gatsby"

const ListLink = props => (
  <li style={{ display: `inline-block`, marginRight: `1rem` }}>
    <Link to={props.to}>{props.children}</Link>
  </li>
)

// import '../css/blog-post.css'; // make it pretty!

export default function Template({
  data
}) {
  const { markdownRemark: post } = data
  return (
    <Layout>
      <div className="blog-post-container">
        <Helmet title={`Your Blog Name - ${post.frontmatter.title}`} />
        <div className="blog-post">
          <h1>{post.frontmatter.title}</h1>
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
          {/* { post.frontmatter.relatedDocumentation.map((r) => {
            return (
              <ListLink to={r}>{r}</ListLink>
            )
          })} */}
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query SampleMarkdownByPath($path: String!) {
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