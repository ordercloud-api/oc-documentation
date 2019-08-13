const path = require('path')
const openApiService = require('./openapi.service.tsx')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const docTemplate = path.resolve('src/components/Templates/DocTemplate.tsx')
  const blogTemplate = path.resolve('src/components/Templates/BlogTemplate.tsx')
  const releaseNotesTemplate = path.resolve(
    'src/components/Templates/ReleaseNotes.tsx'
  )
  const apiReferenceTemplate = path.resolve('src/pages/api-reference.tsx')

  const staticDocs = graphql(`
    query CreatePagesQuery {
      allMdx {
        edges {
          node {
            id
            fileAbsolutePath
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }
    result.data.allMdx.edges.forEach(edge => {
      let path = edge.node.fileAbsolutePath
        .split('/content')[1]
        .replace('.mdx', '')

      let component
      if (path.startsWith('/docs')) {
        path = path.replace('/docs', '') // served from root
        component = docTemplate
      } else if (path.startsWith('/blog')) {
        component = blogTemplate
      } else if (path.startsWith('/release-notes')) {
        component = releaseNotesTemplate
      } else {
        throw new Error(`Can't resolve path ${edge.node.fileAbsolutePath}`)
      }
      createPage({
        path,
        component,
        context: {
          nodeID: edge.node.id,
        },
      })
    })
  })

  const apiRef = new Promise((resolve, reject) => {
    resolve(openApiService.Initialize())
  })(async () => {
    await apiRef
  })()
    .then(result => {
      createPage({
        path: '/api-reference',
        component: apiReferenceTemplate,
        context: {
          OcApi: result,
        },
      })
    })
    .catch(e => console.log('error initializing open API service'))

  return Promise.all([staticDocs, apiRef])
}
