import React from 'react';
import { Paper, Collapse, List, ListItem, ListItemText, Typography } from '@material-ui/core';

export default function ApiReferenceMenu(props) {
  const { apiReference } = props;
  console.log(apiReference);
  return (
    <div>
      {apiReference && apiReference.Sections ? apiReference.Sections.map((section, index) => {
        return (
          <div>
            {apiReference.Resources.map(r => {
              if (r.Section.toLowerCase() === section.replace(/\s/g, '').toLowerCase()) {
                return (
                  <Section key={index} section={section} resources={r} />
                )
              }
            })}
          </div>
        )
      }) : null}
    </div>
  )
}

function Section(props) {
  const { section, resources } = props;
  debugger;
  return (
    <List>
      <ListItem>
        <ListItemText>
          <Typography>
            {section}
            {resources.map(r => <p>{r}</p>)}
          </Typography>
        </ListItemText>
      </ListItem>
      <Collapse>
      </Collapse>
    </List>
  )
}