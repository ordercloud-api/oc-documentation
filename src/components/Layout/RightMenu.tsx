import React from 'react';
import ListLink from '../Shared/ListLink';
import { Section } from '../Shared/models/section.model';

export default function RightMenu({ tableOfContents }: {tableOfContents: Section[]}) {

  function toSectionLink(heading: string): string {
      return '#' + heading.toLowerCase()
      .replace(/[!@#$%^&*()=_+|;':",.<>?'’]/g, '') // remove punctuation 
      .replace(/  +/g, ' ') // replace multiple whitespaces by just one
      .replace(/ /g, '-'); // replace spaces with hypens
  }

  return (
    <div>
      { tableOfContents.map((section, index) => {
          return (
            <div key={index}>
              <h2>{section.title}</h2>
              <ul>
                { section.guides.map((s) =>  {
                  return (
                    <div>
                      <ListLink key={s.id} guideProps={{ path: `${s.frontmatter.path}`, title: s.frontmatter.title}} />
                      <ul>
                        {s.headings.map(sectionHeading => {
                          const sectionLink = s.frontmatter.path + toSectionLink(sectionHeading.value);
                          return <ListLink key={sectionLink} guideProps={{ path: `${sectionLink}`, title: sectionHeading.value}} />
                        })}
                      </ul>
                    </div>
                  );
                })}
              </ul>
            </div>
          )
        }) 
      }
    </div>
  )
};