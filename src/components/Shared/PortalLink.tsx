import { Link } from '@material-ui/core'
import React from 'react'

/**
 * Takes in a path and resolves to portal URL
 */

function withPrefix(path) {
  const portalBaseUrl = getBaseUrl()
  return [portalBaseUrl, normalizePath(path)].join(`/`)
}

export function getBaseUrl() {
  const hostname = window.location.hostname
  if (hostname === 'localhost') {
    return 'http://localhost:3000'
  }
  if (hostname.includes('azurewebsites')) {
    if (hostname.includes('test')) {
      return 'https://oc-portal-test.azurewebsites.net'
    }
    return 'https://oc-portal.azurewebsites.net'
  }
  if (hostname.includes('ordercloud-qa')) {
    return 'https://portal.ordercloud-qa.com'
  }
  return 'https://portal.ordercloud.io'
}

function normalizePath(path) {
  // removes extra fourward slashes to ensure a proper URL
  if (path.charAt(0) === '/') {
    return path.replace(/\//, ``)
  }
  return path
}

interface PortalLinkProps {
  to: string
}

export class PortalLink extends React.Component<PortalLinkProps> {
  constructor(props) {
    super(props)
  }

  public render() {
    const { to, children } = this.props
    return <Link onClick={() => navigate(to)}>{children}</Link>
  }
}

export function navigate(path) {
  const prefixedTo = withPrefix(path)
  window.location.assign(prefixedTo)
}
