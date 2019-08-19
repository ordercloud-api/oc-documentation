import {
  Box,
  Chip,
  ListItem,
  ListItemText,
  Typography,
  Theme,
} from '@material-ui/core'
import { Link } from 'gatsby'
import React from 'react'
import { connectHits, Highlight } from 'react-instantsearch-dom'
import service from '../../utility'
import { makeStyles, createStyles } from '@material-ui/styles'
import { Scrollbars } from 'react-custom-scrollbars'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: (props: any) => ({
      zIndex: 1,
      background: theme.palette.primary.main,
      position: 'absolute',
      bottom: 0,
      top: props.offsetTop,
      width: '100%',
      overflow: 'hidden',
    }),
    searchResultsScrollbar: {
      zIndex: 10000,
      left: 'auto',
      right: 0,
      top: 0,
      bottom: 0,
      '& > div': {
        borderRadius: theme.shape.borderRadius,
        background: 'white !important',
      },
    },
    hitItemPrimary: {
      color: theme.palette.common.white,
    },
    hitItemSecondary: {
      color: theme.palette.grey[400],
    },
  })
)

function ListItemLink(props) {
  return <ListItem button component={Link} {...props} />
}
function HitItem(hit, classes) {
  const url = service.resolvePath(hit.fileAbsolutePath)
  return (
    <ListItemLink button to={url}>
      <Box display="flex" flexDirection="column">
        <ListItemText
          primary={hit.title}
          classes={{
            primary: classes.hitItemPrimary,
            secondary: classes.hitItemSecondary,
          }}
          secondary={
            <Highlight
              color="inherit"
              attribute="excerpt"
              tagName="mark"
              hit={hit}
            />
          }
        ></ListItemText>
      </Box>
    </ListItemLink>
  )
}
const OrderCloudSearchHits = ({ hits }) => {
  const classes = useStyles({ offsetTop: 115 })

  return (
    <div className={classes.root}>
      <Scrollbars
        autoHide
        style={{ width: '100%', height: '100%' }}
        renderTrackHorizontal={props => (
          <div
            {...props}
            style={{ display: 'none' }}
            className="track-horizontal"
          />
        )}
        renderTrackVertical={props => (
          <div {...props} className={classes.searchResultsScrollbar} />
        )}
        renderView={props => (
          <div {...props} style={{ ...props.style, overflowX: 'hidden' }} />
        )}
      >
        {hits
          .filter(h => h.category === 'Docs')
          .map(hit => {
            return HitItem(hit, classes)
          })}

        {hits
          .filter(h => h.category === 'Blog')
          .map(hit => {
            return HitItem(hit, classes)
          })}
      </Scrollbars>
    </div>
  )
}

export default connectHits(OrderCloudSearchHits)
