import { resolve } from 'path'
import openApiService from './src/services/openapi.service'
import { GatsbyCreatePages } from './src/models/gatsby.models'
import Case from 'case'

export const createPages: GatsbyCreatePages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const docTemplate = resolve('src/components/Templates/DocTemplate.tsx')
  const blogTemplate = resolve('src/components/Templates/BlogTemplate.tsx')
  const releaseNotesTemplate = resolve(
    'src/components/Templates/ReleaseNotes.tsx'
  )
  const apiReferenceTemplate = resolve(
    'src/components/Templates/ApiReferenceTemplate.tsx'
  )

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

  const apiRef = openApiService
    .initialize()
    .then(result => {
      //create doc menu
      const docMenu = []
      const pages = []
      const referencePath = '/api-reference'
      pages.push({
        path: referencePath,
        component: apiReferenceTemplate,
        context: {
          type: 'reference',
          currentPath: referencePath,
        },
      })
      result.sections.forEach(s => {
        const sectionPath = `${referencePath}/${Case.kebab(s['x-id'])}`
        const docMenuSection = {
          name: s.name,
          path: sectionPath,
          resources: [],
          context: {
            currentPath: sectionPath,
          },
        }
        pages.push({
          path: sectionPath,
          component: apiReferenceTemplate,
          context: {
            currentPath: sectionPath,
            section: s,
            type: 'reference',
          },
        })
        result.resources
          .filter(r => r['x-section-id'] === s['x-id'])
          .forEach(r => {
            const resourcePath = `${sectionPath}/${Case.kebab(r.name)}`
            const docMenuResource = {
              name: r.name,
              path: resourcePath,
              operations: [],
              context: {
                currentPath: resourcePath,
              },
            }
            pages.push({
              path: resourcePath,
              component: apiReferenceTemplate,
              context: {
                currentPath: resourcePath,
                section: s,
                resource: r,
                type: 'reference',
              },
            })
            result.operationsByResource[r.name].forEach(o => {
              const operationPath = `${resourcePath}/${Case.kebab(
                o.operationId.split('.')[1]
              )}`
              docMenuResource.operations.push({
                name: o.summary,
                path: operationPath,
                context: {
                  currentPath: operationPath,
                },
              })
              pages.push({
                path: operationPath,
                component: apiReferenceTemplate,
                context: {
                  currentPath: operationPath,
                  section: s,
                  resource: r,
                  operation: o,
                  type: 'reference',
                },
              })
            })
            docMenuSection.resources.push(docMenuResource)
          })
        docMenu.push(docMenuSection)
        pages.forEach(p => {
          createPage({ ...p, context: { ...p.context, menuData: docMenu } })
        })
      })
    })
    .catch(ex => {
      console.error('error initializing open API service')
      throw ex
    })

  return Promise.all([staticDocs, apiRef])
}
