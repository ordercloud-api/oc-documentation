import React from 'react'
import { Typography } from '@material-ui/core'
import ApiRoute from './ApiRoute'
import ApiParameters from './ApiParameters'
import ApiRequestBody from './ApiRequestBody'
import ApiResponses from './ApiResponses'

interface ApiOperationProps {
  operation: any
}

const ApiOperation: React.FunctionComponent<ApiOperationProps> = props => {
  const { operation } = props
  return (
    <React.Fragment>
      <a
        id={operation.operationId}
        style={{
          position: 'relative',
          top: -60,
          paddingBottom: 20,
          display: 'block',
        }}
      />
      <Typography variant="h3">
        {operation.summary.replace(/\./g, '')}
      </Typography>

      <ApiRoute operation={operation}></ApiRoute>

      <ApiParameters parameters={operation.parameters}></ApiParameters>

      <ApiRequestBody requestBody={operation.requestBody}></ApiRequestBody>

      <ApiResponses responses={operation.responses}></ApiResponses>
      {/* <pre>{JSON.stringify(operation, null, 2)}</pre> */}
    </React.Fragment>
  )
}

export default ApiOperation
