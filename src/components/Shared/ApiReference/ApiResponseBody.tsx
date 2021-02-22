import { Paper } from '@material-ui/core'
import Prism from 'prismjs'
import React, { useEffect, FC, useMemo } from 'react'
import { ApiOperation } from '../../../models/openapi.models'
import ApiHeading from './ApiHeading'
import ApiSchemaTable from './ApiSchemaTable'

interface ApiResponseBodyProps {
  operation?: ApiOperation
}

const ApiResponseBody: FC<ApiResponseBodyProps> = (
  props: ApiResponseBodyProps
) => {
  useEffect(() => {
    Prism.highlightAll()
  })

  const { operation } = props
  const response = useMemo((): any => {
    if (!operation.responses) return
    return Object.entries(operation.responses)[0][1]
  }, [operation])

  return response &&
    response.content &&
    response.content['application/json'] ? (
    <React.Fragment>
      <ApiHeading title="Response Body" variant="h2" />
      <Paper style={{ overflowX: 'auto' }}>
        <ApiSchemaTable
          isResponse={true}
          schema={response.content['application/json'].schema}
        />
      </Paper>
    </React.Fragment>
  ) : null
}

export default ApiResponseBody
