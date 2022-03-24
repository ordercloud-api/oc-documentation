import {
  Box,
  Divider,
  Grow,
  ListItem,
  ListItemText,
  ListSubheader,
  Paper,
  Popper,
  Theme,
} from '@material-ui/core'
import { ArrowDropUp } from '@material-ui/icons'
import { createStyles, makeStyles, CSSProperties } from '@material-ui/styles'
import { Link } from 'gatsby'
import { groupBy, map } from 'lodash'
import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { connectHits, Snippet } from 'react-instantsearch-dom'
import service from '../../../services/utility'
import DocSearchFooter from './DocSearchFooter'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: (props: any) => ({
      pointerEvents: props.open ? 'all' : 'none',
      zIndex: theme.zIndex.appBar + 3,
    }),
    caret: (props: any) => ({
      display: props.noPopper ? 'none' : undefined,
      position: 'absolute',
      zIndex: theme.zIndex.appBar + 2,
      color: props.darkMode
        ? theme.palette.primary.dark
        : theme.palette.background.paper,
      right: theme.spacing(3),
      fontSize: '4rem',
      margin: '-1rem 0 -1rem 0',
    }),
    // caretBackground: (props: any) => ({
    //   display: props.noPopper ? 'none' : undefined,
    //   position: 'absolute',
    //   zIndex: theme.zIndex.appBar + 1,
    //   color: 'rgba(0,0,0,0.1)',
    //   right: theme.spacing(3),
    //   fontSize: '4rem',
    //   lineHeight: '1rem',
    //   // padding: '-1rem',
    // }),
    inner: (props: any) => {
      const noPopperStyles: CSSProperties = {
        maxWidth: '100vw',
        position: 'fixed',
        left: 0,
        height: `calc(100vh - ${theme.spacing(7)}px)`,
        top: theme.spacing(5),
        transform: 'none',
      }
      return {
        width: 500,
        height: 415,
        transformOrigin: 'top right',
        ...(props.noPopper ? noPopperStyles : {}),
      }
    },
    paper: (props: any) => ({
      zIndex: theme.zIndex.appBar + 1,
      top: '1.25rem',
      position: 'relative',
      background: props.darkMode
        ? theme.palette.primary.dark
        : theme.palette.background.paper,
      width: '100%',
      height: '100%',
      overflow: 'hidden',
    }),
    searchResultsScrollbar: {
      zIndex: theme.zIndex.appBar + 1,
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
      // padding: theme.spacing(2),
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
  return (
    <ListItemLink
      button
      to={service.resolvePath(hit.fileAbsolutePath)}
      key={hit.objectID}
    >
      <Box display="flex" flexDirection="column">
        <ListItemText
          primary={hit.title}
          classes={{
            primary: classes.hitItemPrimary,
            secondary: classes.hitItemSecondary,
          }}
          secondary={<Snippet attribute="excerpt" hit={hit} tagName="mark" />}
        ></ListItemText>
      </Box>
    </ListItemLink>
  )
}

function ReferenceHitItem(hit, classes) {
  return (
    <ListItemLink button to={hit.link} key={hit.objectID}>
      <Box display="flex" flexDirection="column">
        <ListItemText
          primary={<Snippet attribute="summary" hit={hit} tagName="mark" />}
          classes={{
            primary: classes.hitItemPrimary,
            secondary: classes.hitItemSecondary,
          }}
        />
      </Box>
    </ListItemLink>
  )
}
const OrderCloudSearchHits = ({
  hits,
  open,
  anchorEl,
  container,
  noPopper,
  classes,
}) => {
  const classesSelf = useStyles({ darkMode: false, noPopper, open })
  const sections = groupBy(hits, 'section')
  const inner = (
    <div
      id="searchHits"
      className={`${classesSelf.inner} ${classes.searchHits}`}
    >
      <ArrowDropUp className={classesSelf.caret} />
      <Paper
        className={`${classesSelf.paper} ${classes.searchHitsPaper}`}
        elevation={5}
      >
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
            <div {...props} className={classesSelf.searchResultsScrollbar} />
          )}
          renderView={props => (
            <div
              {...props}
              className={classesSelf.searchResultsScrollbarView}
            />
          )}
        >
          <div>
            {map(sections, (items, section) => {
              return (
                Boolean(items.length) && (
                  <React.Fragment key={section}>
                    <ListSubheader
                      component="div"
                      className={classesSelf.subheader}
                    >
                      {section === 'undefined' ? 'Knowledge Base' : section}
                    </ListSubheader>
                    {items.map(hit => {
                      return hit.verb
                        ? ReferenceHitItem(hit, classesSelf)
                        : HitItem(hit, classesSelf)
                    })}
                  </React.Fragment>
                )
              )
            })}
          </div>
          {Boolean(hits.length) && <Divider />}
          <DocSearchFooter darkMode={false} />
        </Scrollbars>
      </Paper>
    </div>
  )
  return (
    anchorEl &&
    (noPopper ? (
      <div style={{ display: open ? 'block' : 'none' }}>{inner}</div>
    ) : (
      <Popper
        open={true}
        anchorEl={anchorEl}
        placement="bottom-end"
        className={classesSelf.root}
        container={container}
      >
        <Grow in={open}>{inner}</Grow>
      </Popper>
    ))
  )
}

export default connectHits(OrderCloudSearchHits)
