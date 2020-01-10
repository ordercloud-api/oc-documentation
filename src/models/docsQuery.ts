export interface DocsQuery {
  mdx: {
    body: string
    fileAbsolutePath: string
    frontmatter: {
      title: string
    }
  }
  allMdx: {
    totalCount: number
    edges: [
      {
        node: {
          id: string
          fileAbsolutePath: string
          headings: [
            {
              value: string
              depth: number
            }
          ]
          frontmatter: {
            section: string
            title: string
          }
        }
      }
    ]
  }
}
