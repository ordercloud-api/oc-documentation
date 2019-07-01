import React from 'react';
import { ListLink } from '../Shared/ListLink';
import { groupBy as _groupBy, forEach as _forEach } from 'lodash';

export default function RightMenu({ tableOfContents }) {
  let contentsArray = [];
  _forEach(tableOfContents, (section, title) => contentsArray = [...contentsArray, {title: title, sections: section.map((s) => s.node)}]);
  return (
    <div>
      { contentsArray.map((guideSection, index) => {
          return (
            <div key={index}>
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