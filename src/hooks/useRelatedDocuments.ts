import { useStaticQuery, graphql } from 'gatsby'
import utility from '../services/utility'
import { DiscoverQuery } from '../models/discoverQuery'
import { QueryResult } from '../pages/knowledge-base'
import { intersection } from 'lodash'

export const useRelatedDocuments = (tags: string[]) => {
  const allPosts: QueryResult = useStaticQuery(graphql`
    query {
      allMdx(
        sort: { order: DESC, fields: [frontmatter___publishDate] }
        filter: { fileAbsolutePath: { glob: "**/content/documents/**/*.mdx" } }
      ) {
        totalCount
        edges {
          node {
            id
            fileAbsolutePath
            frontmatter {
              type
              title
              description
              publishDate(formatString: "MMMM Do, YYYY")
              updatedDate(formatString: "MMMM Do, YYYY")
              author {
                id
                name
                title
              }
              tags
            }
          }
        }
      }
    }
  `)

  return allPosts.allMdx.edges
    .filter(e => intersection(e.node.frontmatter.tags, tags).length)
    .map(e => e.node)
}
