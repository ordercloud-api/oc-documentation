import { Typography, Paper } from '@material-ui/core'
import Prism from 'prismjs'
import React, { useEffect, FC } from 'react'
import { OperationRequestBody } from '../../../models/openapi.models'
import ApiHeading from './ApiHeading'
import ApiSchemaTable from './ApiSchemaTable'

interface ApiRequestBodyProps {
  requestBody?: OperationRequestBody
}

const ApiRequestBody: FC<ApiRequestBodyProps> = (
  props: ApiRequestBodyProps
) => {
  useEffect(() => {
    Prism.highlightAll()
  })

  const { requestBody } = props
  return requestBody ? (
    <React.Fragment>
      <ApiHeading title="Request Body" variant="h2" />
      {/** TODO: I have yet to see this appear; scrap or save for future use? */}
      {requestBody.description && (
        <Typography paragraph>{requestBody.description}</Typography>
      )}
      <Paper style={{ overflowX: 'auto' }}>
        {requestBody.content && requestBody.content['application/json'] && (
          <ApiSchemaTable
            schema={requestBody.content['application/json'].schema}
          />
        )}
      </Paper>
    </React.Fragment>
  ) : null
}

export default ApiRequestBody
