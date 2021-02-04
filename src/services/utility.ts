import { DocsQuery } from '../models/docsQuery'
import { DiscoverQuery } from '../models/discoverQuery'
import { groupBy, forEach } from 'lodash'
import { Article, Heading } from '../models/tableOfContents.model'
import { Section, Guide } from '../models/section.model'

const service = {
  getOffsetTop,
  getSectionsFromDocsQuery,
  getArticlesFromDiscoverQuery,
  resolvePath,
}

const DOCS_SECTION_ORDER = [
  'Getting Started',
  'Main Concepts',
  'Features',
  'Guides',
]

function getOffsetTop(element) {
  let offsetTop = 0
  while (element) {
    offsetTop += element.offsetTop
    element = element.offsetParent
  }
  return offsetTop
}

function getArticlesFromDiscoverQuery(query: DiscoverQuery): Article[] {
  return query.allMdx.edges
    .sort((a, b) => a.node.frontmatter.priority - b.node.frontmatter.priority)
    .map(e => {
      return {
        title: e.node.frontmatter.title,
        path: service.resolvePath(e.node.fileAbsolutePath),
        headings: e.node.headings.filter(h => h.depth === 2),
      }
    })
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
      guides: section
        .map(s => {
          return {
            ...s.node,
            path: service.resolvePath(s.node.fileAbsolutePath),
          }
        })
        .sort(sortGuides(title)),
    }
    sections = [...sections, formattedSection]
  })
  return DOCS_SECTION_ORDER.map(s => sections.find(sec => sec.title === s))
}

const sortGuides = (sectionTitle: string) => (first: Guide, second: Guide) => {
  if (sectionTitle === 'Main Concepts' || sectionTitle === 'Getting Started') {
    // sort by priority
    return (
      parseInt(first.frontmatter.priority, 10) -
      parseInt(second.frontmatter.priority, 10)
    )
  }
  // sort alphabetically
  if (first.frontmatter.title < second.frontmatter.title) {
    return -1
  }
  if (first.frontmatter.title > second.frontmatter.title) {
    return 1
  }
  return 0
}

/**
 * takes in gatsby's fileAbsolutePath and returns the routeable path
 */
function resolvePath(fileAbsolutePath: string): string {
  const path = fileAbsolutePath.split('/content')[1].replace('.mdx', '')
  if (path.startsWith('/docs')) {
    return path.replace('/docs', '') // served from root
  }
  return path
}

export default service
