import React from 'react'
import { Redirect } from '@reach/router'
import { graphql, useStaticQuery } from 'gatsby'

const PortalReleaseNotes = () => {
  const data = useStaticQuery(graphql`
    query {
      allMdx(
        sort: { fields: frontmatter___date, order: DESC }
        filter: {
          fileAbsolutePath: { glob: "**/content/portal-release-notes/**/*.mdx" }
        }
        limit: 1
      ) {
        edges {
          node {
            id
            frontmatter {
              apiVersion
            }
          }
        }
      }
    }
  `)
  const mostRecentApiVersionWithReleaseNote =
    data.allMdx.edges[0].node.frontmatter.apiVersion
  return (
    <Redirect
      to={`/portal-release-notes/v${mostRecentApiVersionWithReleaseNote}`}
      noThrow
    />
  )
}

export default PortalReleaseNotes
