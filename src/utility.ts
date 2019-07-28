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
      guides: section.map(s => s.node),
    }
    sections = [...sections, formattedSection]
  })
  return sections
}

/**
 * takes in gatsby's fileAbsolutePath and returns
 * a shortened routable path
 */
function resolvePath(fileAbsolutePath: string): string {
  return fileAbsolutePath.split('/content')[1].replace('.mdx', '')
}

export default service
