const path = require('path')

exports.createPages = ({
  actions,
  graphql
}) => {
  const {
    createPage
  } = actions

  const docTemplate = path.resolve(`src/templates/doc-template.tsx`)

  return graphql(`
    {
      allMdx(
        sort: { order: ASC, fields: [frontmatter___priority] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              title
              path
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    result.data.allMdx.edges.forEach(edge => {
      const path = edge.node.frontmatter.path
      createPage({
        path: path,
        component: docTemplate,
        context: {}, // additional data can be passed via context
      })
    })
  })
}
