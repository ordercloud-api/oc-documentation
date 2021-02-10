export interface DiscoverQuery {
  allMdx: {
    totalCount: number
    edges: [
      {
        node: {
          id: string
          fileAbsolutePath: string
          frontmatter: {
            title: string
            priority: number
          }
          headings: Headings[]
        }
      }
    ]
  }
}

interface Headings {
  depth: number
  value: string
}
