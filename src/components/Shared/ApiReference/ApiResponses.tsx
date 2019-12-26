import React, { useEffect } from 'react'
import { Typography } from '@material-ui/core'
import Prism from 'prismjs'

interface ApiResponsesProps {
  responses?: {
    [statusCode: string]: string
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
      <Typography variant="h4">Responses</Typography>
      {Object.entries(responses).map(([statusCode, response]) => {
        return (
          <Typography key={response} variant="h5">
            {statusCode}
          </Typography>
        )
      })}
    </React.Fragment>
  ) : null
}

export default ApiResponses
