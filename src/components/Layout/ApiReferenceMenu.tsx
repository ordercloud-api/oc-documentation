import React from 'react';
import { groupBy as _groupBy, remove as _remove, map as _map } from 'lodash';
import { Paper, Collapse, List, ListItem, ListItemText, Typography, makeStyles, Theme, createStyles } from '@material-ui/core';

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
  const { apiReference } = props;
  const sections = _groupBy(_remove(apiReference, (ref: ApiReferenceProps) => ref.x_section_id != null), 'x_section_id');

  return (
    <Paper>
      {_map(sections, (section, index) => {
        return (
          <Section section={section} sectionTitle={index} />
        )
      })}
    </Paper>
  )
}

function Section(props) {
  const { section, sectionTitle } = props;
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
        {section.map(s => <Resource resource={s} />)}
      </Collapse>
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
          {resource.name}
        </ListItemText>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List>
          {/** TODO: MAP ENDPOINTS HERE */}
        </List>
      </Collapse>
    </List>
  )
}