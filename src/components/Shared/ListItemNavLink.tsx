import React from "react"
import { Route } from "react-router"
import { Link } from "react-router-dom"
import {
  ListItem,
  ListItemText,
  Theme,
  createStyles,
  withStyles,
} from "@material-ui/core"

/**
 * Toggles an "active" icon for the nav link
 * that is currently active
 */
const style = (theme: Theme) =>
  createStyles({
    activeIcon: {
      color: theme.palette.secondary.main,
    },
  })

interface ListItemNavLinkProps {
  to: string
  activeClass: string
  primary?: string
  secondary?: string
  exact?: boolean
  strict?: boolean
}

class ListItemNavLink extends React.Component<ListItemNavLinkProps> {
  public renderLink = (listItemProps: any) => (
    <Link {...listItemProps} to={this.props.to} />
  )

  public render() {
    const { strict, exact, primary, secondary, activeClass } = this.props
    const path = this.props.to

    // Regex taken from: https://github.com/pillarjs/path-to-regexp/blob/master/index.js#L202
    const escapedPath =
      path && path.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1")
    return (
      <Route
        path={escapedPath}
        exact={exact}
        strict={strict}
        children={({ match }) => {
          const isActive = !!match

          return (
            <ListItem
              button
              component={this.renderLink}
              className={isActive ? activeClass : null}
            >
              <ListItemText primary={primary} secondary={secondary} />
            </ListItem>
          )
        }}
      />
    )
  }
}

export default withStyles(style)(ListItemNavLink)
