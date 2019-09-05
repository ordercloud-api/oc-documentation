import React from 'react'
import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core'

interface ApiRequestBodyProps {
  requestBody?: any
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pre: {
      padding: theme.spacing(2),
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
  })
)

const ApiRequestBody: React.FunctionComponent<ApiRequestBodyProps> = props => {
  const { requestBody } = props
  const classes = useStyles({})
  let schema, required
  if (requestBody) {
    required = requestBody.content['application/json'].schema.required
    if (
      requestBody.content &&
      requestBody.content['application/json'] &&
      requestBody.content['application/json'].schema &&
      requestBody.content['application/json'].schema.allOf &&
      requestBody.content['application/json'].schema.allOf.length
    ) {
      schema = requestBody.content['application/json'].schema.allOf[0]
    } else {
      schema = requestBody.content['application/json'].schema
    }
    return (
      <React.Fragment>
        <Typography variant="h4">Request Body</Typography>
        {requestBody.description && (
          <Typography paragraph>{requestBody.description}</Typography>
        )}
        <Typography variant="h5">Properties</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Property</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Format</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(schema.properties).map(
              ([name, field]: [string, any]) => (
                <TableRow key={name}>
                  <TableCell>{`${name} ${
                    required && required.includes(name)
                      ? '(required)'
                      : '(optional)'
                  }`}</TableCell>
                  <TableCell>{field.type || 'object'}</TableCell>
                  <TableCell>{field.format || '---'}</TableCell>
                  <TableCell>{field.maxLength || '---'}</TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
        {schema.example && (
          <React.Fragment>
            <Typography variant="h5">Example</Typography>
            <pre className={classes.pre}>
              {JSON.stringify(schema.example, null, 2)}
            </pre>
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
  return null
}

export default ApiRequestBody
