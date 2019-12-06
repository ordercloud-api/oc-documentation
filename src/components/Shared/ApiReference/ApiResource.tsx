import React from 'react'
import { Typography } from '@material-ui/core'
import ApiOperation from './ApiOperation'

interface ApiResourceProps {
  resource: any
  operations: any[]
}

const ApiResource: React.FunctionComponent<ApiResourceProps> = props => {
  const { resource, operations } = props

  const example = operations.find(operation =>
    operation.requestBody &&
    operation.requestBody.content &&
    operation.requestBody.content['application/json'] &&
    operation.requestBody.content['application/json'].schema &&
    operation.requestBody.content['application/json'].schema.allOf &&
    operation.requestBody.content['application/json'].schema.allOf.length
  );

  return (
    <React.Fragment>
      <Typography variant="h1">{resource.name}</Typography>
      <Typography>{resource.description}</Typography>
      {Boolean(operations) &&
        operations.map(o => <ApiOperation key={o.operationId} operation={o} example={example ? example.requestBody.content['application/json'].schema.allOf[0].example : null} />)}
    </React.Fragment>
  )
}

export default ApiResource
