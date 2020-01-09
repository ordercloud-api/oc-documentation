import { Typography } from '@material-ui/core'
import React from 'react'
import { ApiOperation as ApiOperationModel } from '../../../models/openapi.models'
import ApiExampleModel from './ApiExampleModel'
import ApiParameters from './ApiParameters'
import ApiRequestBody from './ApiRequestBody'
import ApiResponses from './ApiResponses'
import ApiRoles from './ApiRoles'
import ApiRoute from './ApiRoute'

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

      <Typography>{operation.description}</Typography>

      <ApiRoles roles={operation.security[0].OAuth2}></ApiRoles>

      <ApiParameters parameters={operation.parameters}></ApiParameters>

      <ApiRequestBody requestBody={operation.requestBody}></ApiRequestBody>

      <ApiExampleModel operation={operation} />

      <ApiResponses responses={operation.responses}></ApiResponses>
    </React.Fragment>
  )
}

export default ApiOperation
