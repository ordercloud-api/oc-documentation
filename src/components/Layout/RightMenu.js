import React from 'react';
import { ListLink } from '../Shared/ListLink';

export default function RightMenu({ tableOfContents }) {
  return (
    <div>
      { tableOfContents.map((guideSection, index) => {
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