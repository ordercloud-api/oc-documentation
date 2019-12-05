import React, { useEffect } from 'react'
import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core'
import Prism from 'prismjs'
import { Lock } from '@material-ui/icons';
import { flame, maroon, seafoam, sherpablue, sunset } from '../../../theme/ocPalette.constants'

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

const ApiRequestBody: React.FunctionComponent<ApiRequestBodyProps> = props => {
  useEffect(() => {
    Prism.highlightAll();
  })

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
              <TableCell></TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Format</TableCell>
              <TableCell>Max Length</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(schema.properties).map(
              ([name, field]: [string, any]) => (
                <TableRow key={name}>
                  <TableCell>{name} {required && required.includes(name)
                    ? '(required)'
                    : null}</TableCell>
                  <TableCell>{field.readOnly ? (
                    <Tooltip title="Read Only" placement="top">
                      <Lock />
                    </Tooltip>
                  ) : null}</TableCell>
                  <TableCell><code className={classes[field.type]}>{field.type || 'object'}</code></TableCell>
                  <TableCell>{field.format || '---'}</TableCell>
                  <TableCell>{field.maxLength ? `${field.maxLength} characters` : '---'}</TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
        {/* {schema.example && (
          <React.Fragment>
            <Typography variant="h5">Example</Typography>
            <pre className={classes.pre}>
              <code className="language-json">
                {JSON.stringify(schema.example, null, 2)}
              </code>
            </pre>
          </React.Fragment>
        )} */}
      </React.Fragment>
    )
  }
  return null
}

export default ApiRequestBody
