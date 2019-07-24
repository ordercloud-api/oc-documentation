import React from 'react';
import { Paper } from '@material-ui/core';

export default function ApiReferenceMenu(props) {
  const { apiReference } = props;
  return (
    <div>
      {apiReference && apiReference.Sections ? apiReference.Sections.map(s => {
        return (
          <div key={s}>
            <h1>{s}</h1>
            {apiReference.Resources.map(r => {
              if (r.Section.toLowerCase() === s.replace(/\s/g, '').toLowerCase()) {
                return (
                  <div>
                    <h2>{r.Name}</h2>
                    <ul>
                      {r.Endpoints.map(e => <li>{e.UriTemplate}</li>)}
                    </ul>
                  </div>
                )
              }
            })}
          </div>
        )
      }) : null}
    </div>
  )
}