import { DocsQuery } from './models/docsQuery'
import { groupBy, forEach } from 'lodash'
import { Section } from './models/section.model'

const service = {
  getSectionsFromDocsQuery,
  resolvePath,
}

function getSectionsFromDocsQuery(query: DocsQuery): Section[] {
  const sectionsWithGuides = groupBy(
    query.allMdx.edges,
    'node.frontmatter.section'
  )
  let sections: Section[] = []
  forEach(sectionsWithGuides, (section, title) => {
    const formattedSection = {
      title,
      guides: section.map(s => {
        return { ...s.node, path: service.resolvePath(s.node.fileAbsolutePath) }
      }),
    }
    sections = [...sections, formattedSection]
  })
  return sections
}

/**
 * takes in gatsby's fileAbsolutePath and returns the routeable path
 */
function resolvePath(fileAbsolutePath: string): string {
  var path = fileAbsolutePath.split('/content')[1].replace('.mdx', '')
  if (path.startsWith('/docs')) {
    return path.replace('/docs', '') // served from root
  }
  return path
}

export default service
