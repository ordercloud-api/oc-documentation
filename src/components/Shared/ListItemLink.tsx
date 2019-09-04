import React from 'react'
import { Link } from 'gatsby'
import ListItem, { ListItemProps } from '@material-ui/core/ListItem'
import { Theme, createStyles, withStyles, makeStyles } from '@material-ui/core'
import { seafoam } from '../../theme/ocPalette.constants'

interface ListItemLinkProps extends ListItemProps {
  to: string
}

const ListItemLink: React.FunctionComponent<ListItemLinkProps> = (
  props: any
) => {
  const classes = useStyles(props)
  console.log(classes)
  return (
    <ListItem
      {...props}
      button
      component={React.forwardRef((props: any, ref: any) => {
        return <Link {...props} to={props.to} ref={ref} />
      })}
      classes={{ selected: classes.navLinkSelected }}
    />
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    navLinkSelected: {
      fontWeight: 'bolder',
      color: seafoam[400],
    },
  })
)
export default ListItemLink
