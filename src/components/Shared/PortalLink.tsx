import { Link as MaterialLink } from '@reach/router'
import React from 'react'

/**
 * Takes in a path and resovles to portal URL
 */

function withPrefix(path) {
  const portalBaseUrl = getBaseUrl()
  const url = [portalBaseUrl, normalizePath(path)].join(`/`)
  return url
}

function getBaseUrl() {
  const protocol = window.location.protocol
  const hostname = window.location.hostname
  let port = ''
  if (window.location.port) {
    port = `:${window.location.port}`
  }
  return `/${protocol}//${hostname}${port}`
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
    const { to, ...rest } = this.props

    const prefixedTo = withPrefix(to)
    return <MaterialLink to={prefixedTo} {...rest} />
  }
}

export function navigate(path) {
  var prefixedTo = (withPrefix(path) as unknown) as Location
  window.location = prefixedTo
}
