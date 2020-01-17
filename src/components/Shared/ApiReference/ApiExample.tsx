import React, { useMemo, useEffect } from 'react'
import { ApiOperation } from '../../../models/openapi.models'
import Prism from 'prismjs'
import { omit, keys } from 'lodash'
import ApiHeading from './ApiHeading'

function mapResponse([statusCode, response]) {
  const exampleResponse = `Status Code ${statusCode} HTTP/1.1`
  const exampleResponseBody =
    response && response.content
      ? response.content['application/json'].schema.example
        ? `

${JSON.stringify(response.content['application/json'].schema.example, null, 2)}`
        : response.content['application/json'].schema.properties.Items.items
            .example
        ? `
{
  "Meta": {
    ${response.content['application/json'].schema.properties.Meta.properties
      .Facets &&
      `"Facets": [
      {
        "Name": "",
        "XpPath": "",
        "Values": [
          {
            "Value": "",
            "Count": 0
          }
        ],
        "xp": {}
      }
    ],`}
    "Page": 1,
    "PageSize": 20,
    "TotalCount": 1,
    "TotalPages": 1,
    "ItemRange": [0, 1]
  },
  "Items": [${JSON.stringify(
    response.content['application/json'].schema.properties.Items.items.example,
    null,
    4
  )}]
}`
        : null
      : `
No Content`

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
  const { operation } = props

  //HTTP 1.1 Example
  const exampleRequest = useMemo(() => {
    if (operation) {
      return `${operation.verb.toUpperCase()} https://api.ordercloud.io/v1${
        operation.path
      } HTTP/1.1
Authentication: Bearer eyJ0eXAi0iJKV1QiLCJhbGci0iJ9...
Content-Type: application/json; charset=UTF-8`
    }
  }, [operation])

  //Request Body Example in JSON format
  const exampleRequestBody = useMemo(() => {
    if (operation && operation.requestBody) {
      const readOnlyFields = Object.entries(
        operation.requestBody.content['application/json'].schema.allOf[0]
          .properties
      )
        .filter(([, value]: [string, any]) => value.readOnly)
        .map(([key]) => key)
      let body = omit(
        operation.requestBody.content['application/json'].schema.allOf[0]
          .example,
        readOnlyFields
      ) as any

      if (operation.verb === 'patch') {
        body = omit(body, 'ID')
        body = omit(body, keys(body).slice(3))
      }
      return `

${JSON.stringify(body, null, 2)}`
    }
  }, [operation])

  //Each possible status code & response body
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
      <pre>
        <code className="language-http">{exampleRequest}</code>
        <code className="language-json">{exampleRequestBody}</code>
      </pre>
      {exampleResponses}
    </React.Fragment>
  ) : null
}

export default ApiExampleModel
