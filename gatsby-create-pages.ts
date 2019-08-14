import { resolve } from 'path'
import openApiService from './src/openapi.service'
import { GatsbyCreatePages } from './src/models/gatsby.models'

const createPages: GatsbyCreatePages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const docTemplate = resolve('src/components/Templates/DocTemplate.tsx')
  const blogTemplate = resolve('src/components/Templates/BlogTemplate.tsx')
  const releaseNotesTemplate = resolve(
    'src/components/Templates/ReleaseNotes.tsx'
  )
  const apiReferenceTemplate = resolve('src/pages/api-reference.tsx')

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

  // const apiRef = openApiService
  //   .initialize()
  //   .then(result => {
  //     debugger
  //     console.log('RESULTS', result)
  //     return createPage({
  //       path: '/api-reference',
  //       component: apiReferenceTemplate,
  //       context: {
  //         OcApi: result,
  //       },
  //     })
  //   })
  //   .catch(e => console.log('error initializing open API service'))

  return Promise.all([staticDocs])
}
