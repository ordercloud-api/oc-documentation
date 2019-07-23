import React from 'react'
import { Link } from '../Shared/Link'
import {
  createStyles,
  Theme,
  withStyles,
  ListItem,
  ListItemText,
} from '@material-ui/core'

const styles = (theme: Theme) =>
  createStyles({
    listItem: {
      '&:hover': {
        backgroundColor: 'rgba(12, 100, 142, 0.15)',
      },
    },
    listItemLink: {
      color: theme.palette.primary.main,
      '&:hover': {
        color: theme.palette.primary.light,
      },
    },
  })

function humanizePath(path) {
  // TODO: there's got to be a regex to handle this in one go
  // remove slashes
  // remove hyphens
  // title case
  const stringWithoutSlashes = path.replace(/^\/|\/$/g, '')
  const stringWithoutHyphens = stringWithoutSlashes.replace(/-|\s/g, ' ')
  return stringWithoutHyphens
    .split(' ')
    .map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
    .join(' ')
}

class ListLink extends React.Component<any> {
  public render() {
    const { guideProps, classes } = this.props
    return (
      <ListItem button className={classes.listItem}>
        <ListItemText>
          <Link className={classes.listItemLink} to={guideProps.path}>
            {humanizePath(guideProps.title)}
          </Link>
        </ListItemText>
      </ListItem>
    )
  }
}

export default withStyles(styles)(ListLink)
