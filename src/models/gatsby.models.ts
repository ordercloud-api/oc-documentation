interface PageInput {
  path: string
  component: string
  layout?: string
  context?: any
}

interface ActionCreators {
  createPage: (page: PageInput) => void
  deletePage: (page: PageInput) => void
  createRedirect: (opts: {
    fromPath: string
    isPermanent?: boolean
    redirectInBrowser?: boolean
    toPath: string
  }) => void
}

export type GatsbyCreatePages = (fns: {
  graphql: any
  actions: ActionCreators
}) => void

export type GatsbyOnCreateWebpackConfig = (fns: {
  actions: ActionCreators
}) => void
