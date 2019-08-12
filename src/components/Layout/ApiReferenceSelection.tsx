import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import Prism from 'prismjs';
import { forIn as _forIn } from 'lodash';

function Parameters(props) {
  const { parameters } = props;
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>Description</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {parameters.map(param => (
          <TableRow>
            <TableCell>{param.name}</TableCell>
            <TableCell>{param.schema.type}</TableCell>
            <TableCell>{param.description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function Responses(props) {
  const { response } = props;
  return (
    <pre><code className="language-http">{JSON.stringify(response.content['application/json'].schema.example, null, 2)}</code></pre>
  )
}

function CodeBlock(code, lang) {
  return (
    <pre><code className={`language-${lang}`}>{code}</code></pre>
  )
}

class ApiReferenceSelection extends React.Component<any> {
  public async componentDidMount() {
    // Use setTimeout to push onto callback queue so it runs after the DOM is updated
    setTimeout(() => Prism.highlightAll(), 0)
  }

  public render() {
    const { method } = this.props;

    const path = <pre><code className="language-http">{method.verb.toUpperCase()} {method.path}</code></pre>
    const requestBody = method.requestBody ? CodeBlock(JSON.stringify(method.requestBody.content['application/json'].schema.allOf[0].example, null, 2), 'http') : null;
    const roles = method.security[0] && method.security[0].OAuth2 ?
      CodeBlock(method.security[0].OAuth2.map(role => <span>{role}&nbsp;</span>), 'http')
      : null;
    const responseCodes = Object.keys(method.responses);

    return (
      <div>
        <h1>{method.summary.replace(/\./g, ' ')}</h1>
        <p>{path}</p>
        {requestBody}
        {method.parameters ? <Parameters parameters={method.parameters} /> : null}
        {roles}
        {responseCodes.map(code => <Responses response={method.responses[code]} />)}
      </div>
    )
  }
}

export default ApiReferenceSelection
