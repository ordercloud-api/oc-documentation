import React, { useEffect } from 'react'
import { Typography } from '@material-ui/core'
import Prism from 'prismjs'

interface ApiResponsesProps {
  responses?: {
    [statusCode: string]: any
  }
}

const ApiResponses: React.FunctionComponent<ApiResponsesProps> = (
  props: ApiResponsesProps
) => {
  useEffect(() => {
    Prism.highlightAll()
  })

  const { responses } = props
  return responses ? (
    <React.Fragment>
      <Typography variant="h3">Response</Typography>
      {Object.entries(responses).map(([statusCode, response]) => {
        return (
          <pre key={statusCode}>
            <code className="language-json">
              {response &&
              response.content &&
              response.content['application/json'].schema.example
                ? JSON.stringify(
                    response.content['application/json'].schema.example,
                    null,
                    2
                  )
                : null}
            </code>
          </pre>
        )
      })}
    </React.Fragment>
  ) : null
}

export default ApiResponses
