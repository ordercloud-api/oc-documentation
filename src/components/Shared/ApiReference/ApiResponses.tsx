import React, { useEffect } from 'react'
import { Typography, makeStyles, Theme, createStyles } from '@material-ui/core'
import Prism from 'prismjs'

interface ApiResponsesProps {
  responses?: {
    [statusCode: string]: any
  }
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
const ApiResponses: React.FunctionComponent<ApiResponsesProps> = props => {
  useEffect(() => {
    Prism.highlightAll();
  })

  const { responses } = props

  const classes = useStyles({})
  return responses ? (
    <React.Fragment>
      <Typography variant="h4">Responses</Typography>
      {Object.entries(responses).map(([statusCode, response]) => {
        let schema
        if (
          response.content &&
          response.content['application/json'] &&
          response.content['application/json'].schema
        ) {
          schema = response.content['application/json'].schema
          if (
            response.content['application/json'].schema.allOf &&
            response.content['application/json'].schema.allOf.length
          ) {
            schema = response.content['application/json'].schema.allOf[0]
          }
        }
        return (
          <React.Fragment>
            <Typography variant="h5">{statusCode}</Typography>
            {response.description && (
              <Typography paragraph>{response.description}</Typography>
            )}
            {schema && schema.properties && (
              <pre className={classes.pre}>
                <code className="language-json">
                  {JSON.stringify(schema.properties, null, 2)}
                </code>
              </pre>
            )}
          </React.Fragment>
        )
      })}
    </React.Fragment>
  ) : null
}

export default ApiResponses
