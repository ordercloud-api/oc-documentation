export interface Article {
  title: string
  path: string
  headings: Heading[]
}

export interface Heading {
  depth: number
  value: string
}
