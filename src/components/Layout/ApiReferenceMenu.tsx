import React from 'react'
import { map as _map, findIndex as _findIndex } from 'lodash'
import {
  Collapse,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Theme,
  createStyles,
  Drawer,
  Typography,
} from '@material-ui/core'
import OpenApi from '../../openapi.service'
import { ExpandLess, ExpandMore } from '@material-ui/icons'

interface ApiReferenceProps {
  name: string
  x_section_id: string
  x_id: string
  description: string
}

export const drawerWidthSpacingLg = 56
export const drawerWidthSpacing = drawerWidthSpacingLg - 20

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
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
    section: {
      display: 'flex',
      alignItems: 'center',
    },
    resource: {
      display: 'flex',
      alignItems: 'center',
    },
    operations: {
      listStyle: 'none',
      padding: 0,
    },
    operation: {
      ...theme.typography.body1,
      textDecoration: 'none',
    },
  })
)

export default function ApiReferenceMenu(props) {
  const {
    ocApi,
    sectionChange,
    resourceChange,
    operationChange,
    activeIndex,
  } = props
  const classes = useStyles(props)
  return (
    <React.Fragment>
      {_map(ocApi.sections, (section, index) => {
        return (
          <Section
            key={index}
            section={section}
            ocApi={ocApi}
            sectionChange={sectionChange}
            resourceChange={resourceChange}
            operationChange={operationChange}
            activeIndex={activeIndex}
          />
        )
      })}
    </React.Fragment>
  )
}

function Section(props) {
  const {
    section,
    ocApi,
    sectionChange,
    activeIndex,
    resourceChange,
    operationChange,
  } = props

  const classes = useStyles(props)
  const sectionIndex = _findIndex(
    ocApi.sections,
    sect => sect['x-id'] === section['x-id']
  )
  const isActive = sectionIndex === activeIndex
  const [open, setOpen] = React.useState(isActive)

  const resources = ocApi.resources.filter(
    r => r['x-section-id'] == section['x-id']
  )

  function handleClick() {
    setOpen(!open)
    if (open) {
      sectionChange(section)
    }
  }

  return (
    <React.Fragment>
      <Typography
        variant="h3"
        display="block"
        className={classes.section}
        onClick={handleClick}
      >
        {section.name}
        {open ? (
          <ExpandLess onClick={handleClick} />
        ) : (
          <ExpandMore onClick={handleClick} />
        )}
      </Typography>
      <Collapse in={isActive} timeout="auto" unmountOnExit>
        {resources.map((resource, index) => (
          <Resource
            key={index}
            resource={resource}
            operationChange={operationChange}
            resourceChange={resourceChange}
          />
        ))}
      </Collapse>
    </React.Fragment>
  )
}

function Resource(props) {
  const { resource, operationChange, resourceChange } = props
  const classes = useStyles(props)

  const [open, setOpen] = React.useState(false)

  const operations = OpenApi.operationsByResource
    ? OpenApi.operationsByResource[resource.name]
    : null

  function handleClick() {
    setOpen(!open)
    if (!open) {
      resourceChange(resource.name)
    }
  }

  return (
    <React.Fragment>
      <Typography
        variant="button"
        display="block"
        className={classes.resource}
        onClick={handleClick}
      >
        {resource.name}
        {open ? (
          <ExpandLess onClick={handleClick} />
        ) : (
          <ExpandMore onClick={handleClick} />
        )}
      </Typography>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <ul className={classes.operations}>
          {operations && operations.length
            ? operations.map((o, index) => {
                return (
                  <li key={index} onClick={() => operationChange(o)}>
                    <a className={classes.operation} href={`#${o.operationId}`}>
                      {o.summary.replace(/\./g, ' ')}
                    </a>
                  </li>
                )
              })
            : null}
        </ul>
      </Collapse>
    </React.Fragment>
  )
}
