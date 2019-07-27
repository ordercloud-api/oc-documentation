const path = require('path')
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions
  const docTemplate = path.resolve('src/components/Templates/DocTemplate.tsx')
  const releaseNotesTemplate = path.resolve(
    'src/components/Templates/ReleaseNotes.tsx'
  )
  return graphql(`
    query CreatePagesQuery {
      docsQuery: allMdx(
        sort: { order: ASC, fields: [frontmatter___priority] }
        filter: { fileAbsolutePath: { glob: "**/src/pages/docs/**/*.mdx" } }
      ) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
      releaseNotesQuery: allMdx(
        sort: { order: ASC, fields: [frontmatter___date] }
        filter: {
          fileAbsolutePath: { glob: "**/src/pages/release-notes/**/*.mdx" }
        }
      ) {
        edges {
          node {
            frontmatter {
              apiVersion
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }
    // create docs pages
    result.data.docsQuery.edges.forEach(edge => {
      const path = edge.node.frontmatter.path
      createPage({
        path,
        component: docTemplate,
      })
    })
    // create release notes pages
    result.data.releaseNotesQuery.edges.forEach(edge => {
      const apiVersion = edge.node.frontmatter.apiVersion
      const path = `/api-release-notes/v${apiVersion}`
      createPage({
        path,
        component: releaseNotesTemplate,
        context: {
          apiVersion,
        },
      })
    })
  })
}
