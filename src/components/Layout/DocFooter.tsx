import React from 'react'
import {
  ThumbUp,
  ThumbDown,
  KeyboardArrowRight,
  KeyboardArrowLeft,
} from '@material-ui/icons'
import {
  groupBy as _groupBy,
  forEach as _forEach,
  flatten as _flatten,
} from 'lodash'
import {
  Button,
  createStyles,
  Theme,
  withStyles,
  Paper,
  Typography,
  IconButton,
  Grid,
} from '@material-ui/core'
import { Link } from 'gatsby'
import { mediumgrey } from '../../theme/ocPalette.constants'

const styles = (theme: Theme) =>
  createStyles({
    groupHelpful: {
      display: 'flex',
      alignItems: 'center',
    },
    groupHelpfulBtn: {
      marginInline: '1rem',
    },
    groupDirection: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    gridContainer: {
      marginBlockStart: '3rem',
      marginBlockEnd: '2rem',
    },
    gridItem: {
      display: 'flex',
    },
    btnNavigation: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
    },
    paperMain: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '1rem',
      backgroundColor: mediumgrey[50],
    },
    typographyMain: {
      marginBlockEnd: '1rem;',
    },
    extendedIcon: {
      color: theme.palette.secondary.main,
      fontSize: theme.typography.h1.fontSize,
    },
  })

class DocFooter extends React.Component<any> {
  public render() {
    const { contents, currentGuide, classes } = this.props
    const gitHubUrl =
      'https://github.com/ordercloud-api/oc-documentation/tree/development/content/docs'
    const flatContents = _flatten(contents.map(c => c.guides))
    const guideIndex = flatContents.findIndex(
      section => section.path === currentGuide
    )

    const buildDirectionLink = to =>
      React.forwardRef((props: any, ref: any) => (
        <Link to={to} {...props} innerRef={ref} />
      ))

    const directionalButton = direction => {
      const newGuideIndex =
        direction === 'Previous' ? guideIndex - 1 : guideIndex + 1
      return newGuideIndex > 0 && newGuideIndex < flatContents.length - 1 ? (
        <Button
          className={classes.btnNavigation}
          size="small"
          color="primary"
          component={buildDirectionLink(flatContents[newGuideIndex].path)}
          aria-label="Guide Navigation Button"
        >
          {direction === 'Previous' && (
            <KeyboardArrowLeft className={classes.extendedIcon} />
          )}

          <div>
            <Typography
              variant="caption"
              display="block"
              align={direction === 'Previous' ? 'left' : 'right'}
            >{`${
              direction === 'Previous' ? 'Prev' : direction
            } Guide`}</Typography>
            <Typography
              variant="inherit"
              display="block"
              align={direction === 'Previous' ? 'left' : 'right'}
            >
              {flatContents[newGuideIndex].frontmatter.title}
            </Typography>
          </div>

          {direction === 'Next' && (
            <KeyboardArrowRight className={classes.extendedIcon} />
          )}
        </Button>
      ) : null
    }

    return (
      //TODO: Link to Slack, syntax on ordercloud tag
      <React.Fragment>
        <Paper className={classes.paperMain}>
          {/* 
          TODO: Useful but not required for MVP add back in for phase 2 https://github.com/ordercloud-api/oc-documentation/issues/58
          <div className={classes.groupHelpful}>
            <IconButton
              className={classes.groupHelpfulBtn}
              aria-label="Helpful"
            >
              <ThumbUp fontSize="small" />
            </IconButton>
            <Typography variant="body2">Was this guide helpful?</Typography>
            <IconButton
              className={classes.groupHelpfulBtn}
              aria-label="Not Helpful"
            >
              <ThumbDown fontSize="small" />
            </IconButton>
          </div> */}
          <Typography className={classes.typographyMain} align="center">
            If you have any questions, please ask our Developer Community on
            Slack, or post your question on{' '}
            <a
              href="https:stackoverflow.com/questions/tagged/ordercloud"
              target="_blank"
              rel="noreferrer"
            >
              Stack Overflow
            </a>{' '}
            using the tag: <strong>ordercloud</strong>.
          </Typography>
          <Button
            size="small"
            variant="text"
            href={`${gitHubUrl}${currentGuide}.mdx`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Contribute to this doc
          </Button>
        </Paper>
        <Grid
          className={classes.gridContainer}
          container
          spacing={3}
          justify="space-between"
          alignItems="stretch"
        >
          <Grid className={classes.gridItem} item xs={6}>
            {directionalButton('Previous')}
          </Grid>
          <Grid className={classes.gridItem} item xs={6}>
            {directionalButton('Next')}
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(DocFooter)
