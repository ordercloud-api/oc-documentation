import React from 'react'
import { Link } from 'gatsby'
import ListItem, { ListItemProps } from '@material-ui/core/ListItem'

interface ListItemLinkProps extends ListItemProps {
  to: string
}

const ListItemLink: React.FunctionComponent<ListItemLinkProps> = (
  props: any
) => {
  return (
    <ListItem
      {...props}
      button
      component={React.forwardRef((props: any, ref: any) => {
        return <Link {...props} to={props.to} ref={ref} />
      })}
    />
  )
}

export default ListItemLink
