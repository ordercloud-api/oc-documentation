import React from 'react'
import { Typography } from '@material-ui/core'
import ApiRoute from './ApiRoute'
import ApiParameters from './ApiParameters'

interface ApiOperationProps {
  operation: any
}

const ApiOperation: React.FunctionComponent<ApiOperationProps> = props => {
  const { operation } = props
  console.log(operation)
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
      {operation.parameters && (
        <ApiParameters parameters={operation.parameters}></ApiParameters>
      )}
    </React.Fragment>
  )
}

export default ApiOperation
