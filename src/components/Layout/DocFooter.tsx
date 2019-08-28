import {
  Box,
  Button,
  createStyles,
  Divider,
  Grid,
  Theme,
  Typography,
  withStyles,
} from '@material-ui/core'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'
import { Link } from 'gatsby'
import { flatten as _flatten } from 'lodash'
import React from 'react'

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
    typographyMain: {
      marginBlockEnd: '1rem;',
    },
    extendedIcon: {
      color: theme.palette.secondary.main,
      fontSize: theme.typography.h1.fontSize,
    },
    boxMain: {
      padding: theme.spacing(3),
      textAlign: 'center',
    },
    questionsHeader: {
      margin: theme.spacing(2, 0),
    },
    questionsText: {
      marginBottom: theme.spacing(3),
    },
    questionsBtn: {
      margin: theme.spacing(0, 0.5),
    },
  })

class DocFooter extends React.Component<any> {
  public render() {
    const { contents, currentGuide, classes, theme } = this.props
    const flatContents: any = _flatten(contents.map(c => c.guides))
    const guideIndex = flatContents.findIndex(
      (section: any) => section.path === currentGuide
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
        <Divider></Divider>
        <Box className={classes.boxMain}>
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
          <Typography variant="h4" className={classes.questionsHeader}>
            Questions?
          </Typography>
          <Typography variant="body1" className={classes.questionsText}>
            If you have any questions, please ask our Developer Community on
            Slack, or post your question on Stack Overflow using the tag "
            <strong>ordercloud</strong>".
          </Typography>

          <Button variant="outlined" className={classes.questionsBtn}>
            Join Our Community
          </Button>

          <Button
            variant="outlined"
            href="https://stackoverflow.com/questions/tagged/ordercloud"
            target="_blank"
            rel="noreferrer"
            className={classes.questionsBtn}
            color="secondary"
          >
            Ask on Stack Overflow
          </Button>
        </Box>
      </React.Fragment>
    )
  }
}

export default withStyles(styles, { withTheme: true })(DocFooter)
