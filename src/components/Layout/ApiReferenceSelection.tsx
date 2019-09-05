import React from 'react'
import {
  createStyles,
  Typography,
} from '@material-ui/core'

import Prism from 'prismjs'
import { forIn as _forIn } from 'lodash'
import ApiOperation from '../Shared/ApiReference/ApiOperation'

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
  return (
    <div>
      <h2>{title}</h2>
      <pre>
        <code className={`language-${language}`}>{body}</code>
      </pre>
    </div>
  )
}

class ApiReferenceMethod extends React.Component<any> {
  public async componentDidMount() {
    // Use setTimeout to push onto callback queue so it runs after the DOM is updated
    setTimeout(() => Prism.highlightAll(), 0)
  }

  public render() {
    const { method } = this.props
    const roles =
      method.security[0] && method.security[0].OAuth2
        ? method.security[0].OAuth2.map(role => (
          <span key={role}>{role}&nbsp;</span>
        ))
        : null;

    return (
      <React.Fragment>
        <ApiOperation operation={method} />
        {Boolean(roles.length) && (
          <Section title="Roles" body={roles} language="markup" />
        )}
        <p>ROLES HERE: </p>{JSON.stringify(method.security[0])}
      </React.Fragment>
    )
  }
}

const ApiReferenceSelection: React.FunctionComponent<any> = (props: any) => {
  const { resource, operations } = props
  return (
    <React.Fragment>
      <Typography variant="h1">{resource}</Typography>
      {operations.map(o => (
        <ApiReferenceMethod key={o.operationId} method={o} />
      ))}
    </React.Fragment>
  )
}

export default ApiReferenceSelection
