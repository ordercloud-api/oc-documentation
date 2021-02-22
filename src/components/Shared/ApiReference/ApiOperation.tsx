import { Typography } from '@material-ui/core'
import React from 'react'
import { ApiOperation as ApiOperationModel } from '../../../models/openapi.models'
import ApiParameters from './ApiParameters'
import ApiRequestBody from './ApiRequestBody'
import ApiRoles from './ApiRoles'
import ApiRoute from './ApiRoute'
import ApiHeading from './ApiHeading'
import ApiResponseBody from './ApiResponseBody'

interface ApiOperationProps {
  operation: ApiOperationModel
}

const ApiOperation: React.FunctionComponent<ApiOperationProps> = (
  props: ApiOperationProps
) => {
  const { operation } = props
  return (
    <React.Fragment>
      <a id={operation.operationId} />
      <Typography variant="h1">
        {operation.summary.replace(/\./g, '')}
      </Typography>
      <ApiRoute operation={operation}></ApiRoute>

      {operation.description && (
        <React.Fragment>
          <ApiHeading title="Description" variant="h2" />
          <Typography paragraph>{operation.description}</Typography>
        </React.Fragment>
      )}

      <ApiRoles roles={operation.security[0].OAuth2}></ApiRoles>

      <ApiParameters parameters={operation.parameters}></ApiParameters>

      <ApiRequestBody requestBody={operation.requestBody}></ApiRequestBody>

      <ApiResponseBody operation={operation} />
    </React.Fragment>
  )
}

export default ApiOperation
