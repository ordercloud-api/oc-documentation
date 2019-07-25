import React from 'react';
import { groupBy as _groupBy, remove as _remove } from 'lodash';
import { Paper, Collapse, List, ListItem, ListItemText, Typography } from '@material-ui/core';

interface ApiReferenceProps {
  name: string;
  x_section_id: string;
  x_id: string;
  description: string
}

export default function ApiReferenceMenu(props) {
  const { apiReference } = props;
  // const sections: ApiReferenceProps[] = _groupBy(_remove(apiReference, (ref: ApiReferenceProps) => ref.x_section_id != null), 'x_section_id');
  const sectionIds = apiReference.filter(ref => ref.x_id);
  console.log('sections', sectionIds);
  return (
    <div>
      {apiReference.map((section, index) => {
        return (
          <Section section={section} sectionTitle={index} />
        )
      })}
    </div>
  )
}

function Section(props) {
  const { section, sectionTitle } = props;
  const [open, setOpen] = React.useState(false);

  function handleClick() {
    setOpen(!open)
  }

  return (
    <List>
      <ListItem button onClick={handleClick}>
        <ListItemText>
          <Typography>
            <Collapse in={open} timeout="auto" unmountOnExit>
              {section.x_section_id ? sectionTitle : (
                <Resource resource={section} />
              )}
            </Collapse>
          </Typography>
        </ListItemText>
      </ListItem>
    </List>
  )
}

function Resource(props) {
  const { resource } = props;
  const [open, setOpen] = React.useState(false);

  function handleClick() {
    setOpen(!open)
  }

  return (
    <List>
      <ListItem button onClick={handleClick}>
        <ListItemText>
          <Typography>
            <Collapse in={open} timeout="auto" unmountOnExit>
              {resource.name}
            </Collapse>
          </Typography>
        </ListItemText>
      </ListItem>
    </List>
  )
}