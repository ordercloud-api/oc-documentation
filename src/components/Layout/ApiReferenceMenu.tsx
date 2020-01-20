import React, { FC, useMemo, useState, useCallback } from 'react'
import {
  Typography,
  makeStyles,
  Theme,
  createStyles,
  Collapse,
  Box,
  IconButton,
} from '@material-ui/core'
import { Link } from 'gatsby'
import { ExpandLess, ExpandMore } from '@material-ui/icons'

interface ApiReferenceMenuOperation {
  name: string
  path: string
}

interface ApiReferenceMenuResource extends ApiReferenceMenuOperation {
  operations: ApiReferenceMenuOperation[]
}

interface ApiReferenceMenuSection extends ApiReferenceMenuOperation {
  resources: ApiReferenceMenuResource[]
}

export type ApiReferenceMenuData = ApiReferenceMenuSection[]

interface ApiReferenceMenuProps {
  data: ApiReferenceMenuData
  uri: string
}

const ApiReferenceMenu: FC<ApiReferenceMenuProps> = (
  props: ApiReferenceMenuProps
) => {
  const { data, uri } = props
  return (
    <aside>
      {data.map(s => (
        <ApiReferenceMenuSection key={s.path} data={s} uri={uri} />
      ))}
    </aside>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    linkItem: (props: any) => {
      const defaultColor = theme.palette.getContrastText(
        theme.palette.background.paper
      )
      const typeStyles = (() => {
        switch (props.type) {
          case 'section':
            return {
              color: props.isActive
                ? theme.palette.secondary.main
                : defaultColor,
              marginBottom: theme.spacing(1),
              maxWidth: '80%',
              fontWeight: 'bold' as any,
            }
          case 'resource':
            return {
              color: defaultColor,
            }
          case 'operation':
            return {
              color: props.isActive ? defaultColor : theme.palette.grey[500],
              marginBottom: theme.spacing(0.5),
              ...(props.isActive
                ? {
                    marginLeft: -theme.spacing(2.25),
                    borderLeft: `${theme.spacing(0.5)}px solid ${
                      theme.palette.secondary.light
                    }`,
                    paddingLeft: theme.spacing(1.75),
                  }
                : {}),
            }
          default:
            return {}
        }
      })()
      return {
        textDecoration: 'none',
        fontWeight: props.isActive ? 'bold' : undefined,
        ...typeStyles,
      }
    },
  })
)

const ApiReferenceMenuSection = (props: {
  data: ApiReferenceMenuSection
  uri: string
}) => {
  const { data, uri } = props
  const isActive = useMemo(() => {
    return uri.includes(data.path)
  }, [uri])
  const classes = useStyles({ isActive, type: 'section' })
  return (
    <Box key={data.path} marginBottom={3}>
      <Typography
        variant="h4"
        display="block"
        className={classes.linkItem}
        component={Link}
        to={data.path}
      >
        {data.name}
      </Typography>
      {data.resources.map(r => (
        <ApiReferenceMenuResource key={r.path} data={r} uri={uri} />
      ))}
    </Box>
  )
}

const ApiReferenceMenuResource = (props: {
  data: ApiReferenceMenuResource
  uri: string
}) => {
  const { data, uri } = props
  const isActive = useMemo(() => {
    return uri.includes(data.path)
  }, [uri])
  const [isExpanded, setExpand] = useState(isActive)
  const classes = useStyles({ isActive, type: 'resource' })

  const handleToggleExpand = useCallback(() => {
    setExpand(!isExpanded)
  }, [isExpanded])

  return (
    <React.Fragment key={data.path}>
      <Box display="inline-flex" marginLeft={-3}>
        <IconButton size="small" onClick={handleToggleExpand}>
          {isExpanded ? (
            <ExpandLess fontSize="inherit" />
          ) : (
            <ExpandMore fontSize="inherit" />
          )}
        </IconButton>
        <Typography
          variant="button"
          display="block"
          className={classes.linkItem}
          component={Link}
          to={data.path}
        >
          {data.name}
        </Typography>
      </Box>
      <Collapse in={isExpanded}>
        <Box paddingTop={1} paddingBottom={2}>
          {data.operations.map(o => (
            <ApiReferenceMenuOperation key={o.path} data={o} uri={uri} />
          ))}
        </Box>
      </Collapse>
    </React.Fragment>
  )
}

const ApiReferenceMenuOperation = (props: {
  data: ApiReferenceMenuOperation
  uri: string
}) => {
  const { data, uri } = props
  const isActive = useMemo(() => {
    return uri === data.path
  }, [uri])
  const classes = useStyles({ isActive, type: 'operation' })
  return (
    <Typography
      display="block"
      variant="body1"
      className={classes.linkItem}
      component={Link}
      to={data.path}
      key={data.path}
    >
      {data.name}
    </Typography>
  )
}

export default ApiReferenceMenu
