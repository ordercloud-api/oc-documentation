import {
  Box,
  ListItem,
  ListItemText,
  Theme,
  ListSubheader,
  Popper,
  Grow,
  Paper,
  Typography,
  Divider,
} from '@material-ui/core'
import { Link } from 'gatsby'
import React from 'react'
import { groupBy, map } from 'lodash'
import { connectHits, Snippet } from 'react-instantsearch-dom'
import service from '../../../utility'
import { makeStyles, createStyles } from '@material-ui/styles'
import { Scrollbars } from 'react-custom-scrollbars'
import DocSearchFooter from './DocSearchFooter'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      zIndex: 1,
    },
    inner: (props: any) => ({
      zIndex: 2,
      position: 'relative',
      background: props.darkMode
        ? theme.palette.primary.dark
        : theme.palette.background.paper,
      width: 500,
      height: 500,
      overflow: 'hidden',
      borderRadius: theme.shape.borderRadius,
      transformOrigin: 'top right',
      '&:hover $searchResultsScrollbar > div': {
        opacity: 1,
      },
    }),
    searchResultsScrollbar: {
      zIndex: 3,
      left: 'auto',
      right: 0,
      top: 0,
      bottom: 0,
      '& > div': {
        borderRadius: `${theme.shape.borderRadius}px !important`,
        background: `${theme.palette.primary.light} !important`,
        opacity: 0.5,
        transition: theme.transitions.create('opacity', {
          duration: theme.transitions.duration.short,
        }),
      },
    },
    searchResultsScrollbarView: {
      overflowX: 'hidden',
      paddingBottom: theme.spacing(2),
      display: 'flex',
      flexFlow: 'column nowrap',
    },
    subheader: (props: any) => ({
      padding: theme.spacing(2),
      color: props.darkMode ? theme.palette.common.white : undefined,
      background: props.darkMode
        ? theme.palette.primary.dark
        : theme.palette.background.paper,
      borderBottom: `1px solid ${
        props.darkMode ? theme.palette.primary.main : theme.palette.divider
      }`,
    }),
    hitItemPrimary: (props: any) => ({
      color: props.darkMode ? theme.palette.common.white : undefined,
    }),
    hitItemSecondary: (props: any) => ({
      color: props.darkMode ? theme.palette.grey[400] : undefined,
    }),
  })
)

function ListItemLink(props) {
  return <ListItem button component={Link} {...props} />
}

function HitItem(hit, classes) {
  const url = service.resolvePath(hit.fileAbsolutePath)
  return (
    <ListItemLink button to={url} key={hit.id}>
      <Box display="flex" flexDirection="column">
        <ListItemText
          primary={hit.title}
          classes={{
            primary: classes.hitItemPrimary,
            secondary: classes.hitItemSecondary,
          }}
          secondary={
            <Snippet
              attribute="excerpt"
              hit={hit}
              tagName="mark"
              // Optional parameters
              // tagName={string}
              // nonHighlightedTagName={string}
              // separator={React.Node}
            />
          }
        ></ListItemText>
      </Box>
    </ListItemLink>
  )
}
const OrderCloudSearchHits = ({
  hits,
  open,
  anchorEl,
  container,
  darkMode,
}) => {
  const classes = useStyles({ darkMode })
  const sections = groupBy(hits, 'section')
  return (
    anchorEl && (
      <Popper
        open={true}
        anchorEl={anchorEl}
        placement="bottom-end"
        className={classes.root}
        container={container}
      >
        <Grow in={open}>
          <Paper className={classes.inner} elevation={5}>
            <Scrollbars
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
                <div
                  {...props}
                  className={classes.searchResultsScrollbarView}
                />
              )}
            >
              <div>
                {map(sections, (items, section) => {
                  return (
                    Boolean(items.length) && (
                      <React.Fragment>
                        <ListSubheader
                          component="div"
                          className={classes.subheader}
                        >
                          <Typography variant="h4">
                            {section === 'undefined'
                              ? 'OrderCloud Blog'
                              : section}
                          </Typography>
                        </ListSubheader>
                        {items.map(hit => {
                          return HitItem(hit, classes)
                        })}
                      </React.Fragment>
                    )
                  )
                })}
              </div>
              {Boolean(hits.length) && <Divider />}
              <DocSearchFooter darkMode={darkMode} />
            </Scrollbars>
          </Paper>
        </Grow>
      </Popper>
    )
  )
}

export default connectHits(OrderCloudSearchHits)
