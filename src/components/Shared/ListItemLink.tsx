import React from 'react'
import { Link } from 'gatsby'
import ListItem, { ListItemProps } from '@material-ui/core/ListItem'
import { Theme, createStyles, makeStyles } from '@material-ui/core'
import { seafoam } from '../../theme/ocPalette.constants'

interface ListItemLinkProps extends ListItemProps {
  to: string
}

const ListItemLink: React.FunctionComponent<ListItemLinkProps> = (
  props: any
) => {
  const classes = useStyles(props)
  const to = props.to
  return (
    <ListItem
      {...props}
      button
      component={React.forwardRef((childProps: any, ref: any) => {
        return <Link {...childProps} to={to} ref={ref} />
      })}
      classes={{ selected: classes.navLinkSelected }}
    />
  )
}

const useStyles = makeStyles(() =>
  createStyles({
    navLinkSelected: {
      fontWeight: 'bolder',
      color: seafoam[400],
    },
  })
)
export default ListItemLink
