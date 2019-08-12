import React from 'react';
import { groupBy as _groupBy, map as _map, find as _find } from 'lodash';
import { Paper, Collapse, List, ListItem, ListItemText, Typography, makeStyles, Theme, createStyles } from '@material-ui/core';
import OpenApi from '../../openapi.service';

interface ApiReferenceProps {
  name: string;
  x_section_id: string;
  x_id: string;
  description: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  })
)

export default function ApiReferenceMenu(props) {
  const { apiReference, resourceChange } = props;
  const sections = _groupBy(apiReference.filter(apiRef => apiRef.x_section_id != null), 'x_section_id');

  return (
    <Paper>
      {_map(sections, (section, index) => {
        const sectionDescription = _find(apiReference, r => r.x_id === index).description;
        return (
          <Section key={index}
            section={section}
            sectionTitle={index}
            sectionDescription={sectionDescription}
            resourceChange={resourceChange} />
        )
      })}
    </Paper>
  )
}

function Section(props) {
  const { section, sectionTitle, sectionDescription, resourceChange } = props;
  const classes = useStyles(props);
  const [open, setOpen] = React.useState(false);

  function handleClick() {
    setOpen(!open)
  }

  return (
    <List className={classes.root}>
      <ListItem button onClick={handleClick}>
        <ListItemText>
          <Typography>
            {sectionTitle}
          </Typography>
        </ListItemText>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {section.map((s, index) => <Resource key={index} resource={s} resourceChange={resourceChange} />)}
      </Collapse>
    </List>
  )
}

function Resource(props) {
  const { resource, resourceChange } = props;
  const operations = OpenApi.operationsByResource[resource.name];
  const [open, setOpen] = React.useState(false);

  function handleClick() {
    setOpen(!open)
  }

  return (
    <List>
      <ListItem button onClick={handleClick}>
        <ListItemText>
          {resource.name}
        </ListItemText>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List>
          {operations && operations.length ? operations.map((o, index) => {
            return (
              <ListItem key={index} onClick={() => resourceChange(o)}>
                <ListItemText primary={o.summary.replace(/\./g, ' ')} />
              </ListItem>
            )
          }) : null}
        </List>
      </Collapse>
    </List>
  )
}