import React from 'react'
import { Link } from 'gatsby'
import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core'
import { RssFeed } from '@material-ui/icons'

interface RSSFeedLinkProps {
  to: string
}

const RSSFeedLink: React.FunctionComponent<RSSFeedLinkProps> = (
  props: any
) => {
  const classes = useStyles(props)
  const to = props.to
  return (
    <a href={to}><Typography className={classes.rssLink} variant="body2"><RssFeed fontSize="small" /> Subscribe to RSS Feed</Typography></a>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rssLink: {
      display: "flex",
      alignItems: "center",
      color: theme.palette.grey[500],
      marginTop: theme.spacing(3)
    }
  })
)
export default RSSFeedLink
