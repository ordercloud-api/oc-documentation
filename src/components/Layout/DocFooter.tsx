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
          className={classes.btnNavigation}
          size="small"
          color="primary"
          aria-label="Guide Navigation Button"
        >
          {direction === 'Previous' ? (
            <KeyboardArrowLeft className={classes.extendedIcon} />
          ) : null}
          <Link to={flatContents[newGuideIndex].frontmatter.path}>
            {direction} Guide
          </Link>
          {direction === 'Next' ? <KeyboardArrowRight /> : null}
        </Button>
      ) : null
    }

    return (
      //TODO: Link to Slack, syntax on ordercloud tag
      <Grid
        className={classes.gridContainer}
        container
        spacing={3}
        justify="space-between"
        alignItems="stretch"
      >
        <Grid className={classes.gridItem} item xs={2}>
          {directionalButton('Previous')}
        </Grid>
        <Grid item xs={8}>
          <Paper className={classes.paperMain}>
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
            </div>
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
              href={`${gitHubUrl}${currentGuide}.md`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Contribute to this doc
            </Button>
          </Paper>
        </Grid>
        <Grid className={classes.gridItem} item xs={2}>
          {directionalButton('Next')}
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(DocFooter)
