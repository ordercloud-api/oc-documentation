import React from 'react';
import { ListLink } from '../Shared/ListLink';

const RightMenu = ({ tableOfContents }) => (
  <div>
    <h1>Right Menu</h1>
    {tableOfContents.map((section, index) => {
      return (
        <span key={index}>
          <h2>{section.title}</h2>
          <ul>
            { section.guides.map((guide, key) => {
              return (
                <ListLink key={key} guideProps={{ path: `${section.path}${guide}`, title: guide}} />
              )
            }) }
          </ul>
        </span>
      )
    })}
  </div>
)

export default RightMenu;