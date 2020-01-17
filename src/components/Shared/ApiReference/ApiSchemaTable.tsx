import {
  Box,
  Collapse,
  createStyles,
  IconButton,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Theme,
} from '@material-ui/core'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import React, { useCallback, useMemo, useState } from 'react'
import {
  flame,
  maroon,
  seafoam,
  sherpablue,
  sunset,
} from '../../../theme/ocPalette.constants'
import SmallChip from '../../Styled/Chip'
import { red } from '@material-ui/core/colors'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pre: {
      padding: theme.spacing(2),
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    requiredChip: {
      backgroundColor: red[500],
      color: 'white',
    },
    string: {
      color: flame[600],
    },
    boolean: {
      color: sunset[600],
    },
    array: {
      color: maroon[600],
    },
    object: {
      color: sherpablue[600],
    },
    integer: {
      color: seafoam[600],
    },
  })
)

interface ApiSchemaTableProps {
  schema: any
  isResponse?: boolean
  readOnlyOverride?: boolean
}

const ApiSchemaTable = (props: ApiSchemaTableProps) => {
  const { schema, isResponse, readOnlyOverride } = props
  const { required } = schema
  const classes = useStyles({})

  const [expanded, setExpanded] = useState<string[]>([])

  const schemaRef = useMemo(() => {
    return schema.allOf && schema.allOf.length
      ? schema.allOf[0]
      : schema.items
      ? schema.items.allOf && schema.items.allOf.length
        ? schema.items.allOf[0].length
        : schema.items
      : schema
  }, [schema])

  const handleToggleExpand = useCallback(
    field => () => {
      if (expanded.includes(field)) {
        setExpanded(expanded.filter(f => f !== field))
      } else {
        setExpanded([...expanded, field])
      }
    },
    [expanded]
  )

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell style={{ minWidth: 200 }}>Property</TableCell>
          {!isResponse && <TableCell style={{ minWidth: 40 }}></TableCell>}
          <TableCell style={{ minWidth: 100 }}>Type</TableCell>
          <TableCell style={{ minWidth: 100 }}>Format</TableCell>
          <TableCell style={{ minWidth: 150 }}>Max Length</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.entries(schemaRef.properties).map(
          ([name, field]: [string, any]) => {
            console.log(field)
            const hasSubSchema =
              field.properties ||
              (field.allOf && field.allOf.length) ||
              (field.items && field.items.properties)
            const isExpanded = expanded.includes(name)
            return (
              <React.Fragment key={name}>
                <TableRow>
                  <TableCell padding={hasSubSchema ? 'checkbox' : undefined}>
                    {hasSubSchema && (
                      <IconButton
                        size="small"
                        onClick={handleToggleExpand(name)}
                      >
                        {isExpanded ? (
                          <ExpandLess fontSize="inherit" />
                        ) : (
                          <ExpandMore fontSize="inherit" />
                        )}
                      </IconButton>
                    )}
                    {name}
                  </TableCell>
                  {!isResponse && (
                    <TableCell padding="checkbox" align="center">
                      {Boolean(required && required.includes(name)) && (
                        <SmallChip
                          className={classes.requiredChip}
                          label="Required"
                        />
                      )}
                      {Boolean(field.readOnly || readOnlyOverride) && (
                        <SmallChip label="Read Only" />
                      )}
                    </TableCell>
                  )}
                  <TableCell style={{ width: 100 }}>
                    <code className={classes[field.type]}>
                      {field.type || 'object'}
                    </code>
                  </TableCell>
                  <TableCell>{field.format || '---'}</TableCell>
                  <TableCell>
                    {field.maxLength ? `${field.maxLength} characters` : '---'}
                  </TableCell>
                </TableRow>
                {hasSubSchema && (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      padding="none"
                      style={{ border: isExpanded ? undefined : 'none' }}
                    >
                      <Collapse in={isExpanded}>
                        <Box padding={1} bgcolor="#f2f2f2">
                          <Paper>
                            <ApiSchemaTable
                              isResponse={isResponse}
                              readOnlyOverride={
                                readOnlyOverride || field.readOnly
                              }
                              schema={field}
                            />
                          </Paper>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            )
          }
        )}
      </TableBody>
    </Table>
  )
}

export default ApiSchemaTable
