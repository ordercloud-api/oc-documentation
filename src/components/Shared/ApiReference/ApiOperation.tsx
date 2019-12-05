import React from 'react'
import { Typography } from '@material-ui/core'
import ApiRoute from './ApiRoute'
import ApiParameters from './ApiParameters'
import ApiRequestBody from './ApiRequestBody'
import ApiResponses from './ApiResponses'
import ApiRoles from './ApiRoles'
import ApiExampleModel from './ApiExampleModel'

interface ApiOperationProps {
  operation: any,
  example: any
}

const ApiOperation: React.FunctionComponent<ApiOperationProps> = props => {
  const { operation, example } = props;

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

      <ApiExampleModel example={example} />

      <Typography variant="body1">
        {operation.description}
      </Typography>


      <ApiRoute operation={operation}></ApiRoute>

      <ApiParameters parameters={operation.parameters}></ApiParameters>

      <ApiRequestBody requestBody={operation.requestBody}></ApiRequestBody>

      <ApiResponses responses={operation.responses}></ApiResponses>
      {/* <pre>{JSON.stringify(operation, null, 2)}</pre> */}
      <ApiRoles roles={operation.security[0].OAuth2}></ApiRoles>
    </React.Fragment>
  )
}

export default ApiOperation
