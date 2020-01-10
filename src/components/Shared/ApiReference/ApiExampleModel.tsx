import { createStyles, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { useMemo, useEffect } from 'react'
import { ApiOperation } from '../../../models/openapi.models'
import Prism from 'prismjs'
import { omit, keys } from 'lodash'
import ApiHeading from './ApiHeading'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pre: {
      padding: theme.spacing(2),
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
  })
)

function mapResponse([statusCode, response]) {
  console.log(statusCode, response)

  const exampleResponse = `Status Code ${statusCode} HTTP/1.1`
  const exampleResponseBody =
    response &&
    response.content &&
    response.content['application/json'].schema.example
      ? `

${JSON.stringify(response.content['application/json'].schema.example, null, 2)}`
      : null

  return (
    <React.Fragment key={statusCode}>
      <pre>
        <code className="language-http">{exampleResponse}</code>
        {exampleResponseBody && (
          <code className="language-json">{exampleResponseBody}</code>
        )}
      </pre>
    </React.Fragment>
  )
}

const ApiExampleModel = (props: { operation: ApiOperation }) => {
  const classes = useStyles({})
  const { operation } = props
  const exampleRequest = useMemo(() => {
    if (operation) {
      return `${operation.verb.toUpperCase()} ${operation.path} HTTP/1.1
Authentication: Bearer eyJ0eXAi0iJKV1QiLCJhbGci0iJ9...
Content-Type: application/json; charset=UTF-8`
    }
  }, [operation])

  const exampleRequestBody = useMemo(() => {
    if (operation && operation.requestBody) {
      const readOnlyFields = Object.entries(
        operation.requestBody.content['application/json'].schema.allOf[0]
          .properties
      )
        .filter(([k, v]: [string, any]) => v.readOnly)
        .map(([k, v]) => k)
      let body = omit(
        operation.requestBody.content['application/json'].schema.allOf[0]
          .example,
        [
          ...readOnlyFields,
          ...(operation.verb === 'put' || operation.verb === 'patch'
            ? ['ID', 'Password']
            : []),
        ]
      )

      if (operation.verb === 'patch') {
        body = omit(body, keys(body).slice(3))
      }
      return `

//Request Body
${JSON.stringify(body, null, 2)}`
    }
  }, [operation])

  const exampleResponses = useMemo(() => {
    if (operation && operation.responses) {
      return (
        <React.Fragment>
          <ApiHeading title="Response" variant="h3" />
          {Object.entries(operation.responses).map(mapResponse)}
        </React.Fragment>
      )
    }
  }, [operation])

  useEffect(() => {
    Prism.highlightAll()
  }, [exampleRequest, exampleResponses])

  return exampleRequest ? (
    <React.Fragment>
      <ApiHeading title="Example" variant="h2" />
      <ApiHeading title="Request" variant="h3" />
      <pre className={classes.pre}>
        <code className="language-http">{exampleRequest}</code>
        <code className="language-json">{exampleRequestBody}</code>
      </pre>
      {exampleResponses}
    </React.Fragment>
  ) : null
}

export default ApiExampleModel
