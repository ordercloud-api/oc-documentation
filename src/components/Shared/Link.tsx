import { Link as GatsbyLink } from 'gatsby'
import React from 'react'

/**
 * We create a thin wrapper for Gatsby's link that prefixes our links on deployed versions of the app
 */

function withPrefix(path) {
  // we need this prefix because the deployed site has the gatsby docs served from /documentation
  return normalizePath([isDeployed() ? '/documentation' : '', path].join(`/`))
}

function isDeployed() {
  // this gets set to production when running gatsby build
  return process.env.NODE_ENV === 'production'
}

function normalizePath(path) {
  return path.replace(/\/+/g, `/`)
}

interface OrderCloudLinkProps {
  to: string
}

class OrderCloudLink extends React.Component<OrderCloudLinkProps> {
  constructor(props) {
    super(props)
  }

  public render() {
    const { to, ...rest } = this.props

    const prefixedTo = withPrefix(to)
    return <GatsbyLink to={prefixedTo} {...rest} />
  }
}

export { OrderCloudLink as Link }
