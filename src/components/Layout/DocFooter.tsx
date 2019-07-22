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
  Fab,
  IconButton,
} from '@material-ui/core'
import { Link } from 'gatsby'
import { ordercloudblue } from '../../theme/ocPalette.constants'

const styles = (theme: Theme) =>
  createStyles({
    section: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBlock: '2rem',
      padding: theme.spacing(2),
      backgroundColor: ordercloudblue,
    },
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
  })

class DocFooter extends React.Component<any> {
  public render() {
    const { contents, currentGuide, classes } = this.props
    const gitHubUrl =
      'https://github.com/ordercloud-api/oc-documentation/tree/development/src/pages/docs'
    const flatContents = _flatten(contents.map(c => c.guides))
    const guideIndex = flatContents.findIndex(
      section => section.frontmatter.path === currentGuide
    )

    const directionalButton = direction => {
      const newGuideIndex =
        direction === 'Previous' ? guideIndex - 1 : guideIndex + 1
      return newGuideIndex > 0 && newGuideIndex < flatContents.length - 1 ? (
        <Button
          size="small"
          color="primary"
          aria-label="Delete"
          className={classes.fab}
        >
          <KeyboardArrowLeft className={classes.extendedIcon} />{' '}
          <Link to={flatContents[newGuideIndex].frontmatter.path}>
            {direction} Guide
          </Link>
          <KeyboardArrowRight className={classes.extendedIcon} />{' '}
        </Button>
      ) : null
    }

    return (
      //TODO: Link to Slack, syntax on ordercloud tag
      <Paper className={classes.section}>
        <div className={classes.groupHelpful}>
          <IconButton className={classes.groupHelpfulBtn} aria-label="Helpful">
            <ThumbUp fontSize="small" />
          </IconButton>
          <Typography variant="body2">Was this guide helpful?</Typography>
          <IconButton
            className={classes.groupHelpfulBtn}
            aria-label="Not Helpful"
          >
            <ThumbDown fontSize="small" />
          </IconButton>
        </div>
        <Typography>
          If you have any questions, please ask our Developer Community on
          Slack, or post your question on{' '}
          <a
            href="https://stackoverflow.com/questions/tagged/ordercloud"
            target="_blank"
            rel="noreferrer"
          >
            Stack Overflow
          </a>{' '}
          using the tag: <strong>ordercloud</strong>.
        </Typography>
        <div className={classes.groupDirection}>
          {directionalButton('Previous')}
          {directionalButton('Next')}
        </div>
        <Typography variant="body2">
          <a
            href={`${gitHubUrl}${currentGuide}.md`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Contribute to this doc
          </a>
        </Typography>
      </Paper>
    )
  }
}

export default withStyles(styles)(DocFooter)
