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
    priority?: string // only set on main-concepts and getting-started guides
  }
}
