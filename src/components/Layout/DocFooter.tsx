import React from 'react'
import { ThumbUp, ThumbDown } from '@material-ui/icons'
import {
  groupBy as _groupBy,
  forEach as _forEach,
  flatten as _flatten,
} from 'lodash'
import { Button, createStyles, Theme, withStyles } from '@material-ui/core'
import { Link } from 'gatsby'

const styles = (theme: Theme) =>
  createStyles({
    section: {
      marginBottom: '1rem',
      marginTop: '1.45rem',
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
        <Button>
          <Link to={flatContents[newGuideIndex].frontmatter.path}>
            {direction} Guide
          </Link>
        </Button>
      ) : null
    }

    return (
      //TODO: Link to Slack, syntax on ordercloud tag
      <div className={classes.section}>
        <p>
          If you have any questions, please ask our Developer Community on
          Slack, or post your question on Stack Overflow - just use the tag
          ordercloud.
        </p>
        {directionalButton('Previous')}
        {directionalButton('Next')}
        <ThumbUp />
        <ThumbDown />
        Was this guide helpful?
        <a
          href={`${gitHubUrl}${currentGuide}.md`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Contribute to this doc
        </a>
      </div>
    )
  }
}

export default withStyles(styles)(DocFooter)
