export interface Section {
  title: string
  guides: Guide[]
}

export interface Guide {
  id: string
  path: string
  fileAbsolutePath: string
  frontmatter: {
    section: string
    title: string
  }
  headings: [
    {
      depth: number
      value: string
    }
  ]
}
