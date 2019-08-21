import React from 'react';
import { map as _map, findIndex as _findIndex } from 'lodash';
import { Paper, Collapse, List, ListItem, ListItemText, makeStyles, Theme, createStyles, Container, Drawer } from '@material-ui/core';
import OpenApi from '../../openapi.service';
import { ExpandLess, ExpandMore } from '@material-ui/icons'

interface ApiReferenceProps {
  name: string;
  x_section_id: string;
  x_id: string;
  description: string
}

export const drawerWidthSpacingLg = 56
export const drawerWidthSpacing = drawerWidthSpacingLg - 20

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // position: 'fixed',
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    drawer: {
      [theme.breakpoints.up('lg')]: {
        width: theme.spacing(drawerWidthSpacingLg),
        flexShrink: 0,
      },
    },
  })
)

export default function ApiReferenceMenu(props) {
  const { ocApi, sectionChange, resourceChange, operationChange, activeIndex } = props;
  const classes = useStyles(props);
  return (
    <Drawer variant="permanent" className={classes.drawer}>
      {_map(ocApi.sections, (section, index) => {
        return (
          <Section key={index}
            section={section}
            ocApi={ocApi}
            sectionChange={sectionChange}
            resourceChange={resourceChange}
            operationChange={operationChange}
            activeIndex={activeIndex} />
        )
      })}
    </Drawer>

  )
}

function Section(props) {
  const { section, ocApi, sectionChange, activeIndex, resourceChange, operationChange } = props;

  const classes = useStyles(props);
  const sectionIndex = _findIndex(ocApi.sections, (sect) => sect['x-id'] === section['x-id']);
  const isActive = sectionIndex === activeIndex;
  const [open, setOpen] = React.useState(isActive);

  const resources = ocApi.resources.filter(r => r['x-section-id'] == section['x-id']);

  function handleClick() {
    setOpen(!open)
    if (!open) {
      sectionChange(section);
    }
  }

  return (
    <List className={classes.root}>
      <ListItem button onClick={handleClick}>
        <ListItemText>
          {section.name}
        </ListItemText>
        {open ? (
          <ExpandLess onClick={handleClick} />
        ) : (
            <ExpandMore onClick={handleClick} />
          )}
      </ListItem>
      <Collapse in={isActive} timeout="auto" unmountOnExit>
        {resources.map((resource, index) => <Resource key={index} resource={resource} operationChange={operationChange} resourceChange={resourceChange} />)}
      </Collapse>
    </List>
  )
}

function Resource(props) {
  const { resource, operationChange, resourceChange } = props;
  const [open, setOpen] = React.useState(false);

  const operations = OpenApi.operationsByResource ? OpenApi.operationsByResource[resource.name] : null;

  function handleClick() {
    setOpen(!open)
    if (!open) {
      resourceChange(resource.name);
    }
  }

  return (
    <List>
      <ListItem button onClick={handleClick}>
        <ListItemText>{resource.name}</ListItemText>
        {open ? (
          <ExpandLess onClick={handleClick} />
        ) : (
            <ExpandMore onClick={handleClick} />
          )}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List>
          {operations && operations.length ? operations.map((o, index) => {
            return (
              <ListItem key={index} onClick={() => operationChange(o)}>
                <ListItemText primary={o.summary.replace(/\./g, ' ')} />
              </ListItem>
            )
          }) : null}
        </List>
      </Collapse>
    </List>
  )
}