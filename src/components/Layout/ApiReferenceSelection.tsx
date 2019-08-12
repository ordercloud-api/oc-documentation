import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import Prism from 'prismjs';

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

class ApiReferenceSelection extends React.Component<any> {
  public async componentDidMount() {
    // Use setTimeout to push onto callback queue so it runs after the DOM is updated
    setTimeout(() => Prism.highlightAll(), 0)
  }

  public render() {
    const { method } = this.props;
    /** 
     * parameters []
     * path
     * responses {}
     * security [{}]
     * summary
     * tags []
     * verb
     * */
    const path = <pre><code className="language-http">{method.path}</code></pre>
    const requestBody = <pre><code className="language-json">{JSON.stringify(method.requestBody.content['application/json'].schema.allOf[0].example, null, 2)}</code></pre>

    return (
      <div>
        <p>{method.summary}</p>
        <p>{method.verb} {path}</p>
        {method.requestBody ? requestBody : null}
        {method.parameters ? <Parameters parameters={method.parameters} /> : null}
        {method.security[0] && method.security[0].OAuth2 ? method.security[0].OAuth2.map(role => <p>{role}</p>) : null}

      </div>
    )
  }
}

export default ApiReferenceSelection
