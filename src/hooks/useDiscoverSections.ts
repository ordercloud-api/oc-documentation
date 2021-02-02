import { useStaticQuery, graphql } from 'gatsby'
import utility from '../services/utility'
import { DiscoverQuery } from '../models/discoverQuery'

export const useDiscoverSections = () => {
  const data: DiscoverQuery = useStaticQuery(graphql`
    query {
      allMdx(
        sort: { order: ASC, fields: [frontmatter___priority] }
        filter: { fileAbsolutePath: { glob: "**/content/discover/*.mdx" } }
      ) {
        totalCount
        edges {
          node {
            id
            fileAbsolutePath
            frontmatter {
              title
              priority
            }
            headings {
              depth
              value
            }
          }
        }
      }
    }
  `)
  return utility.getArticlesFromDiscoverQuery(data)
}
