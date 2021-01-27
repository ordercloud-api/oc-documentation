import React, { useCallback } from 'react'
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
  Theme,
  createStyles,
  Paper,
} from '@material-ui/core'
import {
  flame,
  maroon,
  seafoam,
  sherpablue,
  sunset,
} from '../../../theme/ocPalette.constants'
import { OperationParameter } from '../../../models/openapi.models'
import ApiHeading from './ApiHeading'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pre: {
      padding: theme.spacing(2),
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
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

interface ApiParametersProps {
  parameters?: OperationParameter[]
}
const ApiParameters: React.FunctionComponent<ApiParametersProps> = (
  props: ApiParametersProps
) => {
  const { parameters } = props
  const classes = useStyles({})

  const mapEnumValues = useCallback(
    l => (e, i) => <span key={i}>{l - 1 == i ? e : `${e}, `}</span>,
    []
  )

  return parameters ? (
    <React.Fragment>
      <ApiHeading title="Parameters" variant="h2" />
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell style={{ width: 100 }}>Type</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Possible Values</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {parameters.map((param, index) => (
              <TableRow key={index}>
                <TableCell>{param.name}</TableCell>
                <TableCell style={{ width: 100 }}>
                  <code className={classes[param.schema.type]}>
                    {param.schema.type}
                  </code>
                </TableCell>
                <TableCell style={{ width: '50%' }}>
                  {param.description}
                </TableCell>
                <TableCell>
                  {/* <pre>{JSON.stringify(param, null, 2)}</pre> */}
                  {param.schema.items &&
                  param.schema.items.enum &&
                  param.schema.items.enum.length
                    ? param.schema.items.enum.map(
                        mapEnumValues(param.schema.items.enum.length)
                      )
                    : param.schema.enum && param.schema.enum.length
                    ? param.schema.enum.map(
                        mapEnumValues(param.schema.enum.length)
                      )
                    : '---'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </React.Fragment>
  ) : null
}

export default ApiParameters
