export interface DocsQuery {
  allMdx: {
    totalCount: number
    edges: [
      {
        node: {
          id: string
          fileAbsolutePath: string
          frontmatter: {
            section: string
            title: string
            description: string
            priority: number
          }
        }
      }
    ]
  }
}
