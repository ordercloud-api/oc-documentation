import React from 'react';
import { ListLink } from '../Shared/ListLink';
import { groupBy as _groupBy, forEach as _forEach } from 'lodash';

export default function RightMenu({ tableOfContents}) {
  const sectionsWithGuides = _groupBy(tableOfContents, 'node.frontmatter.section');
  let contentsArray = [];
  _forEach(sectionsWithGuides, (section, title) => contentsArray = [...contentsArray, {title: title, sections: section.map((s) => s.node)}]);
  return (
    <div>
      { contentsArray.map((guideSection) => {
          return (
            <div>
              <h2>{guideSection.title}</h2>
              <ul>
                { guideSection.sections.map((s) => <ListLink key={s.id} guideProps={{ path: `${s.frontmatter.path}`, title: s.frontmatter.title}} />)}
              </ul>
            </div>
          )
        }) 
      }
    </div>
  )
};