import { DocsQuery } from "./models/docsQuery";
import { groupBy, forEach } from 'lodash';
import { Section } from "./models/section.model";

const service = {
    getSectionsFromQuery
}

function getSectionsFromQuery(query: DocsQuery): Section[] {
    const sectionsWithGuides = groupBy(query.allMdx.edges, 'node.frontmatter.section');
    let sections: Section[] = [];
    forEach(sectionsWithGuides, (section, title) =>  {
        const formattedSection = {
            title, 
            guides: section.map((s) => s.node)
        }
        sections = [...sections, formattedSection]
    });
    return sections;
}

export default service;