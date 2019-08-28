import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  withStyles,
  createStyles,
  Container,
  responsiveFontSizes,
} from '@material-ui/core'

import Prism from 'prismjs'
import { map, forIn as _forIn } from 'lodash'

const styles = () => {
  createStyles({
    highlight: {
      backgroundColor: '#141414',
      borderRadius: '0.3em',
      margin: '0.5em 0',
      padding: '1em',
      overflow: 'auto',
    },
  })
}

function Section(props) {
  const { title, body, language } = props
  console.log(body)
  return (
    <div>
      <h2>{title}</h2>
      <pre>
        <code className={`language-${language}`}>{body}</code>
      </pre>
    </div>
  )
}

function RequestBody(props) {
  const { body } = props
  const requestBody = JSON.stringify(
    body.content['application/json'].schema.allOf[0].example,
    null,
    2
  )

  return (
    <div>
      <h2>RequestBody</h2>
      <CodeBlock code={requestBody} lang="http" />
    </div>
  )
}

function Parameters(props) {
  const { parameters } = props
  return (
    <div>
      <h2>Parameters</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {parameters.map((param, index) => (
            <TableRow key={index}>
              <TableCell>{param.name}</TableCell>
              <TableCell>{param.schema.type}</TableCell>
              <TableCell>{param.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function Responses(props) {
  const { response } = props
  const responseBody = response.content
    ? JSON.stringify(
        response.content['application/json'].schema.example,
        null,
        2
      )
    : null

  return <CodeBlock code={responseBody} lang="http" />
}

function Roles(props) {
  const { roles } = props
  return (
    <div>
      <h2>Roles</h2>
      <CodeBlock
        code={roles.map(role => (
          <span>{role}&nbsp;</span>
        ))}
        lang="http"
      />
    </div>
  )
}

function CodeBlock(props) {
  const { code, lang } = props
  return (
    <pre>
      <code className={`language-${lang}`}>{code}</code>
    </pre>
  )
}

class ApiReferenceSelection extends React.Component<any> {
  public async componentDidMount() {
    // Use setTimeout to push onto callback queue so it runs after the DOM is updated
    setTimeout(() => Prism.highlightAll(), 0)
  }

  public render() {
    const { method } = this.props
    console.log(method)
    const path = (
      <pre>
        <code className="language-http">
          {method.verb.toUpperCase()} {method.path}
        </code>
      </pre>
    )
    const roles =
      method.security[0] && method.security[0].OAuth2
        ? method.security[0].OAuth2.map(role => (
            <span key={role}>{role}&nbsp;</span>
          ))
        : null
    const requestBody = method.requestBody
      ? JSON.stringify(
          method.requestBody.content['application/json'].schema.allOf[0]
            .example,
          null,
          2
        )
      : null

    console.log('METHOD', method)

    return (
      <React.Fragment>
        <a
          id={method.operationId}
          style={{
            position: 'relative',
            top: -60,
            paddingBottom: 20,
            display: 'block',
          }}
        />
        <h1>{method.summary.replace(/\./g, ' ')}</h1>
        {path}
        {requestBody && (
          <Section title="Request Body" body={requestBody} language="json" />
        )}
        {Boolean(method.parameters) && (
          <Parameters parameters={method.parameters} />
        )}
        {Boolean(Object.values(method.responses).length) && (
          <React.Fragment>
            <h2>Responses</h2>
            {map(method.responses, (response, code) => (
              <Section
                key={code}
                language="json"
                title={code}
                body={
                  Boolean(
                    response.content &&
                      response.content['application/json'] &&
                      response.content['application/json'].schema &&
                      response.content['application/json'].schema.example
                  )
                    ? JSON.stringify(
                        method.responses[code].content['application/json']
                          .schema.example,
                        null,
                        2
                      )
                    : response.description || 'No Content'
                }
              />
            ))}
          </React.Fragment>
        )}
        {Boolean(roles.length) && (
          <Section title="Roles" body={roles} language="markup" />
        )}
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(ApiReferenceSelection)
