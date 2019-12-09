import React from 'react'
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core'
import { flame, maroon, seafoam, sherpablue, sunset } from '../../../theme/ocPalette.constants'

interface ApiParametersProps {
  parameters?: any[]
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pre: {
      padding: theme.spacing(2),
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    string: {
      color: flame[600]
    },
    boolean: {
      color: sunset[600]
    },
    array: {
      color: maroon[600]
    },
    object: {
      color: sherpablue[600]
    },
    integer: {
      color: seafoam[600]
    }
  })
)

const ApiParameters: React.FunctionComponent<ApiParametersProps> = props => {
  const { parameters } = props
  const classes = useStyles({})

  return parameters ? (
    <React.Fragment>
      <Typography variant="h4">Parameters</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Fields <small>(descending by priority)</small></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {parameters.map((param, index) => (
            <TableRow key={index}>
              <TableCell>{param.name}</TableCell>
              <TableCell><code className={classes[param.schema.type]}>{param.schema.type}</code></TableCell>
              <TableCell>{param.description}</TableCell>
              <TableCell>{param.schema.items && param.schema.items.enum ? param.schema.items.enum.map((e, i) => <span>{param.schema.items.enum.length - 1 == i ? e : `${e},`} </span>) : '---'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  ) : null
}

export default ApiParameters
