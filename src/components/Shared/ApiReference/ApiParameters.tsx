import React from 'react'
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from '@material-ui/core'

interface ApiParametersProps {
  parameters?: any[]
}

const ApiParameters: React.FunctionComponent<ApiParametersProps> = props => {
  const { parameters } = props
  return parameters ? (
    <React.Fragment>
      <Typography variant="h4">Parameters</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Fields</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {parameters.map((param, index) => (
            <TableRow key={index}>
              <TableCell>{param.name}</TableCell>
              <TableCell>{param.schema.type}</TableCell>
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
