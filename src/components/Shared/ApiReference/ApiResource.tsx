import React from 'react'
import { Typography } from '@material-ui/core'
import ApiOperation from './ApiOperation'

interface ApiResourceProps {
  resource: any
  operations: any[]
}

const ApiResource: React.FunctionComponent<ApiResourceProps> = props => {
  const { resource, operations } = props
  return (
    <React.Fragment>
      <Typography variant="h1">{resource.name}</Typography>
      <Typography>{resource.description}</Typography>
      {Boolean(operations) &&
        operations.map(o => <ApiOperation key={o.operationId} operation={o} />)}
    </React.Fragment>
  )
}

export default ApiResource
