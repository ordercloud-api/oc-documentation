import { createStyles, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { useMemo } from 'react'
import { ApiOperation } from '../../../models/openapi.models'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pre: {
      padding: theme.spacing(2),
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
  })
)

const ApiExampleModel = (props: { operation: ApiOperation }) => {
  const classes = useStyles({})
  const { operation } = props
  const operationExample = useMemo(() => {
    if (!operation) return ''
    const result = `${operation.verb.toUpperCase()} ${operation.path}
Authorization Bearer XXXX...${
      operation.requestBody
        ? `
${JSON.stringify(
  operation.requestBody.content['application/json'].schema.allOf[0].example,
  null,
  2
)}
`
        : undefined
    }`
    return result
  }, [operation])
  return operationExample ? (
    <React.Fragment>
      {operationExample && (
        <React.Fragment>
          <Typography variant="h2">Example</Typography>
          <pre className={classes.pre}>
            <code className="language-curl">{operationExample}</code>
          </pre>
        </React.Fragment>
      )}
    </React.Fragment>
  ) : null
}

export default ApiExampleModel
