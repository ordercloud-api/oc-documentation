import { useStaticQuery, graphql } from 'gatsby'
import utility from '../services/utility'
import { DocsQuery } from '../models/docsQuery'

export const useDocsSections = () => {
  const data: DocsQuery = useStaticQuery(graphql`
    query {
      allMdx(
        sort: { order: ASC, fields: [frontmatter___priority] }
        filter: { fileAbsolutePath: { glob: "**/content/docs/**/*.mdx" } }
      ) {
        totalCount
        edges {
          node {
            id
            fileAbsolutePath
            frontmatter {
              section
              title
            }
          }
        }
      }
    }
  `)
  return utility.getSectionsFromDocsQuery(data)
}
