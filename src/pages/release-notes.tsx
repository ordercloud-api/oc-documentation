import React from 'react'
import { Redirect } from '@reach/router'
import { graphql, useStaticQuery } from 'gatsby'

const ReleaseNotes: React.FC = () => {
  const data: IQueryResult = useStaticQuery(graphql`
    query {
      allMdx(
        sort: { fields: frontmatter___date, order: DESC }
        filter: {
          fileAbsolutePath: { glob: "**/content/release-notes/**/*.mdx" }
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
      to={`/release-notes/v${mostRecentApiVersionWithReleaseNote}`}
      noThrow
    />
  )
}
export interface IQueryResult {
  allMdx: IMdx;
}

interface IMdx {
  edges: IEdges[];
}

interface IEdges {
  node: INode;
}

export interface INode {
  id: string;
  body: string;
  fileAbsolutePath: string;
  frontmatter: IFrontmatter;
}

interface IFrontmatter {
  apiVersion: string;
  date: string;
  year: string;
  month: string;
  day: string;
}

export default ReleaseNotes
